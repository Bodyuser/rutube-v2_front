import { FC } from "react"

import styles from "./Following.module.scss"
import { useGetFollowingQuery } from "@/redux/api/users.api"
import { useTypedSelector } from "@/hooks/useTypedSelector"
import Person from "@/components/ui/person/Person"

const Following: FC = () => {
	const isAuth = useTypedSelector(
		state => state.users.isAuth
	)

	const { data: following } =
		useGetFollowingQuery(null, {
			skip: !isAuth,
		})

	return (
		<div className={styles.top}>
			<h2>Подписки</h2>
			<div>
				{following?.length ? (
					following.map(user => (
						<Person user={user} />
					))
				) : (
					<span>
						Вы ни на кого не подписались
					</span>
				)}
			</div>
		</div>
	)
}

export default Following
