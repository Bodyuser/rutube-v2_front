import {
	FC,
	memo,
	useEffect,
} from "react"

import styles from "./Notification.module.scss"
import { INotification } from "./notification.types"
import Icon from "../icon/Icon"
import useOutsideClick from "@/hooks/useOutsideClick"
import { useReadAllNotificationsMutation } from "@/redux/api/notifications.api"
import Image from "next/image"
import Link from "next/link"

const Notification: FC<
	INotification
> = ({
	unreadCount,
	notifications,
}) => {
	const { isOpen, ref, setIsOpen } =
		useOutsideClick(false)

	const [readAllNotifications] =
		useReadAllNotificationsMutation()

	useEffect(() => {
		if (isOpen) {
			readAllNotifications(null)
		}
	}, [isOpen])

	console.log(notifications)

	return (
		<div
			className={styles.notification}>
			<div
				className={styles.notif}
				onClick={() =>
					setIsOpen(!isOpen)
				}>
				{unreadCount !== 0 && (
					<span>{unreadCount}</span>
				)}
				<Icon name="BsBellFill" />
			</div>

			{isOpen ? (
				notifications.length ? (
					<div
						className={styles.menu}
						ref={ref}>
						{notifications.map(
							notif => (
								<Link href={notif.url}>
									{notif.type ===
										"upload-video" && (
										<div
											className={
												styles.video
											}>
											<Image
												src={
													notif.video
														?.bannerPath!
												}
												alt={
													notif.video
														?.title!
												}
												height={50}
												width={100}
											/>
											<span>
												{
													notif.video
														?.title
												}
											</span>
										</div>
									)}
									<div
										className={
											styles.text
										}>
										{notif.text}
									</div>
								</Link>
							)
						)}
					</div>
				) : (
					<div ref={ref}>
						Здесь ничего нет
					</div>
				)
			) : null}
		</div>
	)
}

export default memo(Notification)
