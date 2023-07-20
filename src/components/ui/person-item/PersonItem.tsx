import { FC } from 'react'

import styles from './PersonItem.module.scss'
import { IGlobalUser } from '@/shared/types/user/user.types'
import Link from 'next/link'
import Icon from '../icon/Icon'
import Button from '../button/Button'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { useMutation, } from '@tanstack/react-query'
import { UserService } from '@/services/users/users.service'
import { useRouter } from 'next/router'
import { useActions } from '@/hooks/useActions'

interface IPersonItem {
	user: IGlobalUser
	func?: () => void
}

const PersonItem: FC<IPersonItem> = ({user, func}) => {
  const {GetProfile} = useActions()

  const {user: profile, isLoading} = useTypedSelector(state => state.users)

  const { mutateAsync } = useMutation(["follow unfollow on user"], (id: string) => UserService.followingUnFollowing(id), {
    async onSuccess() {
      await GetProfile()
			if (func) {
				func()
			}
    }
  })

  const {replace, query} = useRouter()    

  return (
		<div className={styles.item}>
			<Link
				href={`/persons/${user.name}`}>
				<div className={styles.img}>
					<img
						src={user.avatarPath}
						alt={user.name}
						height={80}
						width={80}
					/>
				</div>
				<div className={styles.content}>
					<span className={styles.name}>
						{user.name}
					</span>
					<div
						className={
							styles.infoCount
						}>
						<span
							className={
								styles.countFollowers
							}>
							{user.followers.length}{" "}
							подписчиков
						</span>
						<Icon name="BsDot" />
						<span
							className={
								styles.countVideos
							}>
							{user.videos.length} видео
						</span>
					</div>
					<div className={styles.about}>
						{user.about}
					</div>
				</div>
			</Link>
			<div>
				{profile?.id !== user.id && (
						<Button
							secondary={
								profile?.following?.some(
									u => u.id === user.id
								)
									? true
									: false
							}
							title={
								profile?.following.some(
									u => u.id === user.id
								)
									? "Отписаться"
									: "Подписаться"
							}
							onClick={async () => {
								if (!isLoading) {
									if (profile?.id) {
										await mutateAsync(
											user.id
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
	)
}

export default PersonItem