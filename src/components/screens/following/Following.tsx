import { FC } from "react"

import styles from "./Following.module.scss"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { UserService } from "@/services/users/users.service"
import { useTypedSelector } from "@/hooks/useTypedSelector"
import PersonItem from "@/components/ui/person-item/PersonItem"
import { useActions } from "@/hooks/useActions"

const Following: FC = () => {
	const user = useTypedSelector(
		state => state.users.user
  )
  
	const {data: following, refetch} = useQuery(
		["get following"],
		() => UserService.getFollowing(),
		{ enabled: !!user?.id }
	)

	return (
		<div className={styles.following}>
			<h2>Ваш подписки</h2>
			<div>
				{" "}
				{following?.length ? (
					following.map(user => (
						<PersonItem
							user={user}
              func={async () => {
                await refetch()
              }}
							key={user.id}
						/>
					))
				) : (
					<div className={styles.empty}>
						Вы ни на кого не подписались
					</div>
				)}
			</div>
		</div>
	)
}

export default Following
