import { INotification } from "@/shared/types/notification/notification.types"
import { api } from "./api"

const getNotificationsUrl = (
	url: string
) => `/notifications/${url}`

const notificationApi =
	api.injectEndpoints({
		endpoints: builder => ({
			readAllNotifications:
				builder.mutation<
					INotification[],
					any
				>({
					query: () => ({
						method: "PATCH",
						type: "auth",
						url: getNotificationsUrl(
							"read"
						),
					}),
					transformResponse(
						response: any
					) {
						return response?.notifications
					},
					invalidatesTags: (
						result: any
					) => [
						{
							type: "Notifications",
							id: result?.user?.id,
						},
					],
				}),
			getNotificationsByProfile:
				builder.query<
					INotification[],
					any
				>({
					query: () => ({
						method: "GET",
						type: "auth",
						url: getNotificationsUrl(
							""
						),
						isError: false,
					}),
					transformResponse(
						response: any
					) {
						return response?.notifications
					},
					providesTags: (
						result: any
					) => [
						{
							type: "Notifications",
							id: result?.user?.id,
						},
					],
				}),
		}),
	})

export const {
	useGetNotificationsByProfileQuery,
	useReadAllNotificationsMutation,
} = notificationApi
