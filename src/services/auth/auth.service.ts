import {
	IFacebook,
	ILogin,
	IRegister,
	IResetPassword,
} from "./auth.types"
import { IUserProfile } from "@/shared/types/user/user.types"
import {
	removeToken,
	saveToken,
} from "@/helpers/cookie.helper"
import { IMessageResponse } from "@/shared/types/message-response.types"
import { axiosClassic } from "@/api/axios-classic"

const getAuthUrl = (url: string) =>
	`/auth/${url}`

interface IAuthResponse {
	user: IUserProfile
	token: string
}

export const AuthService = {
	async login(data: ILogin) {
		const response = (
			await axiosClassic.post<IAuthResponse>(
				getAuthUrl("login"),
				data
			)
		).data

		if (response.token) {
			saveToken(response.token)
		}

		return response.user
	},
	async register(data: IRegister) {
		const response = (
			await axiosClassic.post<IAuthResponse>(
				getAuthUrl("register"),
				data
			)
		).data

		if (response.token) {
			saveToken(response.token)
		}

		return response.user
	},
	async logout() {
		const response = (
			await axiosClassic.get<IMessageResponse>(
				getAuthUrl("logout")
			)
		).data

		removeToken()

		return response.message
	},
	async getNewToken() {
		const response = (
			await axiosClassic.get<IAuthResponse>(
				getAuthUrl("new-token")
			)
		).data

		if (response.token) {
			saveToken(response.token)
		}

		return response.user
	},
	async resetPassword(
		data: IResetPassword,
		resetLink: string
	) {
		const response = (
			await axiosClassic.post<IMessageResponse>(
				getAuthUrl(
					`reset-password/${resetLink}`
				),
				data
			)
		).data

		return response.message
	},
	async checkResetLink(
		resetLink: string
	) {
		const response = (
			await axiosClassic.get<IMessageResponse>(
				getAuthUrl(
					`reset-password/${resetLink}`
				)
			)
		).data

		return response.message
	},
	async authByGoogle(token: string) {
		const response = (
			await axiosClassic.post<IAuthResponse>(
				getAuthUrl(`google`),
				{
					token,
				}
			)
		).data

		if (response.token) {
			saveToken(response.token)
		}

		return response.user
	},
	async authByFacebook(
		data: IFacebook
	) {
		const response = (
			await axiosClassic.post<IAuthResponse>(
				getAuthUrl(`facebook`),
				data
			)
		).data

		if (response.token) {
			saveToken(response.token)
		}

		return response.user
	},
}
