import {
	FC,
	useMemo,
	memo,
} from "react"

import styles from "./Header.module.scss"
import SearchField from "@/components/ui/search-field/SearchField"
import Button from "@/components/ui/button/Button"
import Notification from "@/components/ui/notification/Notification"
import { useTypedSelector } from "@/hooks/useTypedSelector"
import NewVideoModal from "@/components/ui/new-video-modal/NewVideoModal"
import { useHeader } from "./useHeader"
import ProfileHeader from "@/components/ui/profile-header/ProfileHeader"
import { useRouter } from "next/router"

const Header: FC = () => {
	const { isAuth } = useTypedSelector(
		state => state.users
	)

	const { push, query, pathname } =
		useRouter()

	const {
		newVideoOpen,
		setNewVideoOpen,
		notifications,
	} = useHeader()

	return (
		<div className={styles.header}>
			<SearchField />
			<div>
				<div>
					<Button
						title="Добавить видео"
						icon="BsPlus"
						onClick={() => {
							if (isAuth) {
								setNewVideoOpen(true)
							} else {
								;(window as any).query =
									query

								const searchParams =
									new URLSearchParams(
										//@ts-ignore
										Object.entries(
											query
										) || []
									)
								searchParams.set(
									"auth",
									"true"
								)

								push(
									`${pathname}?${searchParams.toString()}`
								)
							}
						}}
					/>
					<NewVideoModal
						isOpen={newVideoOpen}
						setIsOpen={setNewVideoOpen}
					/>
				</div>
				{isAuth && notifications && (
					<Notification
						unreadCount={
							notifications?.filter(
								n => !n.read
							).length
						}
						notifications={
							notifications
						}
					/>
				)}

				<ProfileHeader />
			</div>
		</div>
	)
}

export default memo(Header)
