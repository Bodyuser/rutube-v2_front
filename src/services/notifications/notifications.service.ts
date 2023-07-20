import { axiosInstance } from "@/api/axios-instance"
import { INotification } from "@/shared/types/notification/notification.types"

const getNotificationsUrl = (url: string) => `/notifications/${url}`

interface INotificationResponse {
  notifications: INotification[]
}

export const NotificationsService = {
	async readAllNotifications() {
		return (
			await axiosInstance.patch<INotificationResponse>(
				getNotificationsUrl("read")
			)
		).data.notifications
	},
	async getNotificationsByProfile() {
		return (
			await axiosInstance.get<INotificationResponse>(
				getNotificationsUrl("")
			)
		).data.notifications
	},
}