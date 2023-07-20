import { axiosInstance } from "@/api/axios-instance"
import { IGlobalUser, IUserProfile } from "@/shared/types/user/user.types"
import {IUpdateProfile} from "./users.types"
import { IMessageResponse } from "@/shared/types/message-response.types"
import { axiosClassic } from "@/api/axios-classic"

interface IUserResponse {
  user: IUserProfile
}

const getUsersUrl = (url: string) => `/users/${url}`

export const UserService = {
	async getProfile() {
		return (
			await axiosInstance.get<IUserResponse>(
				getUsersUrl("profile")
			)
		).data.user
	},
	async updateProfile(
		data: IUpdateProfile
	) {
		return (
			await axiosInstance.put<IUserResponse>(
				getUsersUrl("profile"),
				data
			)
		).data.user
	},
	async deleteProfile() {
		return (
			await axiosInstance.delete<IMessageResponse>(
				getUsersUrl("profile")
			)
		).data.message
	},
	async checkActivateLink(
		activateLink: string
	) {
		return (
			await axiosInstance.get<IMessageResponse>(
				getUsersUrl(
					`check-activate-link/${activateLink}`
				)
			)
		).data.message
	},
	async activateProfile(
		activateLink: string
	) {
		return (
			await axiosInstance.get<IMessageResponse>(
				getUsersUrl(
					`activate-profile/${activateLink}`
				)
			)
		).data.message
	},
	async followingUnFollowing(
		userId: string
	) {
		return (
			await axiosInstance.patch<IMessageResponse>(
				getUsersUrl(
					`follow-un-follow/${userId}`
				)
			)
		).data.message
  },
  
  async getFollowing() {
    return (await axiosInstance.get<{users: IGlobalUser[]}>(getUsersUrl("following"))).data.users
  },

  async getUser(name: string) {
    return (await axiosClassic.get<{user: IGlobalUser}>(getUsersUrl(name))).data.user
  },
}