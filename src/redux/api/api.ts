import { axiosClassic } from "@/api/axios-classic"
import { axiosInstance } from "@/api/axios-instance"
import { ToastError } from "@/utils/toatsr-error/ToastrError"
import {
	BaseQueryFn,
	createApi,
} from "@reduxjs/toolkit/query/react"
import {
	AxiosError,
	AxiosRequestConfig,
} from "axios"
import { toastr } from "react-redux-toastr"

export type TypeAxiosReturn =
	BaseQueryFn<
		{
			url: string
			method: AxiosRequestConfig["method"]
			data?: AxiosRequestConfig["data"]
			params?: AxiosRequestConfig["params"]
			title?: string
			message?: string
			type: "auth" | "no-auth"
			headers?: any
			isError?: boolean
		},
		unknown,
		unknown
	>

const axiosBaseQuery =
	(): TypeAxiosReturn =>
	async ({
		url,
		method,
		data,
		params,
		title,
		type,
		message,
		headers = null,
		isError = true,
	}) => {
		try {
			if (type === "auth") {
				const response =
					await axiosInstance({
						url,
						method,
						data,
						params,
						headers: headers
							? headers
							: {},
					})

				if (
					response.data &&
					title &&
					message
				) {
					toastr.success(title, message)
				}

				return {
					data: response.data,
				}
			} else {
				const response =
					await axiosClassic({
						url,
						method,
						data,
						params,
						headers: headers
							? headers
							: {},
					})

				if (
					response.data &&
					title &&
					message
				) {
					toastr.success(title, message)
				}

				return {
					data: response.data,
				}
			}
		} catch (axiosError) {
			if (isError) {
				let err =
					axiosError as AxiosError
				return ToastError(err, title)
			}
		}
	}

export const api = createApi({
	baseQuery: axiosBaseQuery(),
	tagTypes: [
		"Videos",
		"Users",
		"Categories",
		"Notifications",
		"Comments",
	],
	endpoints: builder => ({}),
})
