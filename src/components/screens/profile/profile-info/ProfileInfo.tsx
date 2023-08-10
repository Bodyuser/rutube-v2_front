import { FC } from "react"

import styles from "./ProfileInfo.module.scss"
import { IProfileInfo } from "./profileInfo.types"
import HTMLReactParser from "html-react-parser"
import { useGetStatisticsQuery } from "@/redux/api/users.api"

const ProfileInfo: FC<IProfileInfo> = ({
	user,
}) => {
	const { data: statistics } =
		useGetStatisticsQuery(null, {
			skip: !user?.id,
		})

	return (
		<div className={styles.info}>
			<div>
				<span>Имя:</span>
				<span>{user.name}</span>
			</div>
			<div>
				<span>Почта:</span>
				<span>{user.email}</span>
			</div>
			<div>
				<span>Пол:</span>
				<span>
					{user.gender
						? user.gender === "male"
							? "Мужской"
							: "Женский"
						: "Вы не указали пол"}
				</span>
			</div>
			<div>
				<span>Дата рождения:</span>
				<span>
					{user.dateOfBirth
						? new Date(
								user.dateOfBirth
						  ).toLocaleDateString()
						: "Вы не указали дату рождения"}
				</span>
			</div>
			<div>
				<span>О вас:</span>
				<span>
					{user.about
						? HTMLReactParser(
								user.about
						  )
						: "Вы не указали о вас"}
				</span>
			</div>

			<div>
				<span>Количество видео:</span>
				<span>
					{statistics?.videosCount}
				</span>
			</div>
			<div>
				<span>
					Количество подписок:
				</span>
				<span>
					{statistics?.followingCount}
				</span>
			</div>
			<div>
				<span>
					Количество подписчиков:
				</span>
				<span>
					{statistics?.followersCount}
				</span>
			</div>
		</div>
	)
}

export default ProfileInfo
