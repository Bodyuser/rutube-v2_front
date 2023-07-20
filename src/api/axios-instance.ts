import axios from "axios"
import Cookies from "js-cookie"

import { AuthService } from "@/services/auth/auth.service"

import {
	getContentType,
	returnError,
} from "./../helpers/api.helper"
import { API_URL } from "@/constants/api.constants"
import { removeToken } from "@/helpers/cookie.helper"

export const axiosInstance = axios.create({
	baseURL: API_URL,
	withCredentials: true,
	headers: getContentType(),
})

axiosInstance.interceptors.request.use(
	config => {
		const accessToken = Cookies.get(
			"accessToken"
		)

		if (
			config &&
			config.headers &&
			accessToken
		) {
			config.headers.Authorization = `Bearer ${accessToken}`
		}

		return config
	}
)

axiosInstance.interceptors.response.use(
	config => config,
	async error => {
		const originalRequest = error.config

		if (
			(error.response.status === 401 ||
				returnError(error) ===
					"jwt expired" ||
				returnError(error) ===
					"jwt must be provided") &&
			error.config &&
			!error.config._isRetry &&
			error.config.url !==
				"/auth/token" &&
			error.config.method !== "get"
		) {
			originalRequest._isRetry = true
			try {
				await AuthService.getNewToken()

				return axiosInstance.request(
					originalRequest
				)
			} catch (e) {
				if (
					returnError(e) ===
					"jwt expired"
				)
					removeToken()
			}
		}

		throw error
	}
)
