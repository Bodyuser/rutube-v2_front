import { useTypedSelector } from "@/hooks/useTypedSelector"
import {
	useGetNotificationsByProfileQuery,
	useReadAllNotificationsMutation,
} from "@/redux/api/notifications.api"
import { useState } from "react"

export const useHeader = () => {
	const [
		newVideoOpen,
		setNewVideoOpen,
	] = useState(false)

	const isAuth = useTypedSelector(
		state => state.users.isAuth
	)

	const { data: notifications } =
		useGetNotificationsByProfileQuery(
			null,
			{
				skip: !isAuth,
			}
		)

	return {
		newVideoOpen,
		setNewVideoOpen,
		notifications,
	}
}
