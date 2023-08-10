import { INotification as INotif } from "@/shared/types/notification/notification.types"

export interface INotification {
	unreadCount?: number
	notifications: INotif[]
}
