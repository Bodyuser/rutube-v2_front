import { api } from "./api"
import {
	IGlobalUser,
	IUpdateAvatarPath,
	IUpdateBannerPath,
	IUpdateProfile,
	IUserProfile,
	// IUpdateAvatarPath,
	// IUpdateProfile,
	// IUserProfile,
} from "@/shared/types/user/user.types"

const getUsersUrl = (url: string) =>
	`/users/${url}`

const userApi = api.injectEndpoints({
	endpoints: builder => ({
		getProfile: builder.query<
			IUserProfile,
			any
		>({
			query: () => ({
				method: "GET",
				type: "auth",
				url: getUsersUrl("profile"),
			}),
			transformResponse(response: any) {
				return response?.user
			},
			providesTags: [
				{
					type: "Users",
					id: "profile",
				},
			],
		}),
		getStatistics: builder.query<
			any,
			any
		>({
			query: () => ({
				method: "GET",
				type: "auth",
				url: getUsersUrl(
					"profile/statistics"
				),
			}),
			transformResponse(response: any) {
				return response
			},
		}),
		updateProfile: builder.mutation<
			IUserProfile,
			IUpdateProfile
		>({
			query: data => ({
				method: "PUT",
				type: "auth",
				url: getUsersUrl("profile"),
				data,
				title:
					"Обновление пользователя",
				message: "Успешно обновлено",
			}),
			transformResponse(response: any) {
				return response?.user
			},
			invalidatesTags: [
				{
					type: "Users",
					id: "profile",
				},
			],
		}),
		updateAvatarPath: builder.mutation<
			string,
			IUpdateAvatarPath
		>({
			query: data => ({
				method: "PATCH",
				type: "auth",
				url: getUsersUrl(
					"profile/avatar"
				),
				data,
				title: "Обновление аватара",
				message: "Успешно обновлено",
			}),
			transformResponse(response: any) {
				return response?.avatarPath
			},
			invalidatesTags: [
				{
					type: "Users",
					id: "profile",
				},
			],
		}),
		updateBannerPath: builder.mutation<
			string,
			IUpdateBannerPath
		>({
			query: data => ({
				method: "PATCH",
				type: "auth",
				url: getUsersUrl(
					"profile/banner"
				),
				data,
				title: "Обновление баннера",
				message: "Успешно обновлено",
			}),
			transformResponse(response: any) {
				return response?.bannerPath
			},
			invalidatesTags: [
				{
					type: "Users",
					id: "profile",
				},
			],
		}),
		deleteProfile: builder.mutation<
			string,
			any
		>({
			query: () => ({
				method: "DELETE",
				type: "auth",
				url: getUsersUrl("profile"),
				title: "Удаление пользователя",
				message: "Успешно удалено",
			}),

			transformResponse(response: any) {
				return response?.user
			},
		}),
		checkActivateLink: builder.query<
			string,
			string
		>({
			query: activateLink => ({
				method: "GET",
				type: "auth",
				url: getUsersUrl(
					`check-activate-link/${activateLink}`
				),
				transformResponse(
					response: any
				) {
					return response?.message
				},
			}),
		}),
		// activateProfile: builder.mutation<
		// 	string,
		// 	string
		// >({
		// 	query: activateLink => ({
		// 		method: "GET",
		// 		type: "auth",
		// 		url: getUsersUrl(
		// 			`activate-profile/${activateLink}`
		// 		),
		// 	}),
		// 	transformResponse(response: any) {
		// 		return response?.message
		// 	},
		// }),
		followingUnFollowing:
			builder.mutation<string, string>({
				query: userId => ({
					method: "PATCH",
					type: "auth",
					url: getUsersUrl(
						`follow-un-follow/${userId}`
					),
				}),
				transformResponse(
					response: any
				) {
					return response?.message
				},
				invalidatesTags: [
					{
						type: "Users",
						id: "profile",
					},
				],
			}),
		getFollowing: builder.query<
			IGlobalUser[],
			any
		>({
			query: () => ({
				method: "GET",
				type: "auth",
				url: getUsersUrl("following"),
			}),
			transformResponse(response: any) {
				return response?.users
			},
			providesTags: [
				{
					type: "Users",
					id: "profile",
				},
			],
		}),
		// getUserByName: builder.query<
		// 	IGlobalUser,
		// 	string
		// >({
		// 	query: name => ({
		// 		method: "GET",
		// 		type: "no-auth",
		// 		url: getUsersUrl(name),
		// 	}),
		// 	transformResponse(response: any) {
		// 		return response?.user
		// 	},
		// }),
	}),
})

export const {
	// useActivateProfileMutation,
	useCheckActivateLinkQuery,
	useDeleteProfileMutation,
	useGetStatisticsQuery,
	useFollowingUnFollowingMutation,
	useGetFollowingQuery,
	useGetProfileQuery,
	// useGetUserByNameQuery,
	useUpdateAvatarPathMutation,
	useUpdateBannerPathMutation,
	useUpdateProfileMutation,
	endpoints: { deleteProfile },
} = userApi
