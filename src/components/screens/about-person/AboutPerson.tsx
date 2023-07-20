import { FC, useMemo } from "react"

import styles from "./AboutPerson.module.scss"
import { useRouter } from "next/router"
import { useMutation, useQuery } from "@tanstack/react-query"
import { UserService } from "@/services/users/users.service"
import Button from "@/components/ui/button/Button"
import Link from "next/link"
import { useActions } from "@/hooks/useActions"
import { useTypedSelector } from "@/hooks/useTypedSelector"

const AboutPerson: FC = () => {
	const {
		query,
    asPath,
    replace
	} = useRouter()

	const name = useMemo(
		() => String(query.name),
		[query]
	)

	const { data: user, refetch } = useQuery(
		["get person", name],
		() => UserService.getUser(name)
	)

  const {user: profile, isLoading} = useTypedSelector(state => state.users)

    const { GetProfile } = useActions()

		const { mutateAsync } = useMutation(
			["follow unfollow on user"],
			(id: string) =>
				UserService.followingUnFollowing(
					id
				),
			{
				async onSuccess() {
					await GetProfile()
					await refetch()
				},
			}
		)

	return (
		<div className={styles.about}>
			<div
				className={styles.header}
				style={{
					background:
						`linear-gradient(to top,#1C232B 0%,transparent 100%),url('${user?.bannerPath}') no-repeat 0 0`,
            backgroundSize: "100% 100%"
				}}>
				<div className={styles.info}>
					<div
						className={styles.avatar}>
						<img
							src={user?.avatarPath}
							alt={user?.name}
						/>
					</div>
					<div className={styles.name}>
						<span>{user?.name}</span>
						<span>
							{user?.followers.length}{" "}
							подписчиков
						</span>
					</div>
				</div>
				<div className={styles.btn}>
					{profile?.id !== user?.id && (
						<Button
							secondary={
								profile?.following?.some(
									u => u.id === user?.id
								)
									? true
									: false
							}
							title={
								profile?.following.some(
									u => u.id === user?.id
								)
									? "Отписаться"
									: "Подписаться"
							}
							onClick={async () => {
								if (!isLoading) {
									if (profile?.id) {
										await mutateAsync(
											String(user?.id)
										)
									} else {
										const params =
											new URLSearchParams(
												Object(query)
											)
										params.set(
											"auth",
											"true"
										)
										replace(
											`/?${params.toString()}`
										)
									}
								}
							}}
						/>
					)}
				</div>
			</div>
			<div className={styles.other}>
				<div className={styles.tabs}>
					<Link
						href={asPath.replace(
							"/about",
							""
						)}>
						Видео
					</Link>
					<div
						className={styles.active}>
						О канале
					</div>
				</div>
				<div
					className={
						styles.aboutPerson
					}>
					<span>{user?.about}</span>
					<div>
						<span>
							Количество подписчиков:
						</span>
						<span>
							{user?.followers.length}
						</span>
					</div>
				</div>
			</div>
		</div>
	)
}

export default AboutPerson
