import {
	FC,
	useState,
	useEffect,
} from "react"

import styles from "./Person.module.scss"
import { IPerson } from "./person.types"
import Image from "next/image"
import parserHtml from "html-react-parser"
import Button from "../button/Button"
import Link from "next/link"
import { useTypedSelector } from "@/hooks/useTypedSelector"
import { useFollowingUnFollowingMutation } from "@/redux/api/users.api"

const Person: FC<IPerson> = ({
	user,
}) => {
	const { isAuth, user: profile } =
		useTypedSelector(
			state => state.users
		)

	const [count, setCount] = useState(
		Number(user.countFollowers) || 0
	)
	const [isSubscribe, setIsSubscribe] =
		useState(user?.isSubscribe)

	useEffect(() => {
		if (
			!Number.isNaN(user.countFollowers)
		) {
			setCount(
				Number(user.countFollowers)
			)
		}
	}, [user?.countFollowers])

	const [
		followUnfollow,
		{ isSuccess },
	] = useFollowingUnFollowingMutation()

	useEffect(() => {
		if (
			isSuccess &&
			!Number.isNaN(count)
		) {
			setIsSubscribe(!isSubscribe)

			if (!isSubscribe) {
				setCount(count + 1)
			} else {
				setCount(count - 1)
			}
		}
	}, [isSuccess])

	return (
		<div className={styles.person}>
			<Link
				href={`/persons/${user.name}`}
				className={styles.info}>
				<div>
					<Image
						src={user.avatarPath}
						alt={user.name}
						height={70}
						width={70}
					/>
				</div>
				<div>
					<span>{user.name}</span>
					{user.about && (
						<span>
							{parserHtml(user?.about)}
						</span>
					)}
				</div>
			</Link>
			<div>
				{!Number.isNaN(count) && (
					<span>
						{count} подписчиков
					</span>
				)}
				{Object(user).hasOwnProperty(
					"isSubscribe"
				) &&
					user?.id !== profile?.id &&
					isAuth && (
						<Button
							title={
								isSubscribe
									? "Отписаться"
									: "Подписаться"
							}
							icon="BsPersonAdd"
							onClick={async () => {
								await followUnfollow(
									user.id
								)
							}}
						/>
					)}
			</div>
		</div>
	)
}

export default Person
