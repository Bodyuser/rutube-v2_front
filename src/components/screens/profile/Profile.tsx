import { FC } from "react"

import styles from "./Profile.module.scss"
import ImageCropModal from "@/components/ui/image-crop-modal/ImageCropModal"
import { useProfile } from "./useProfile"
import Image from "next/image"
import Icon from "@/components/ui/icon/Icon"
import ProfileInfo from "./profile-info/ProfileInfo"
import { useActions } from "@/hooks/useActions"
import Button from "@/components/ui/button/Button"
import { useDeleteProfileMutation } from "@/redux/api/users.api"
import Link from "next/link"

const Profile: FC = () => {
	const {
		profile,
		isAvatarOpen,
		setIsAvatarOpen,
		updateAvatar,
		uploadImage,
		user,
		updateBanner,
		isBannerOpen,
		setIsBannerOpen,
	} = useProfile()

	const { LogOut } = useActions()

	const [deleteProfile] =
		useDeleteProfileMutation()

	if (profile) {
		return (
			<div className={styles.profile}>
				<h2>Профиль</h2>
				<div>
					<div
						className={styles.banner}
						style={{
							backgroundImage: `url(${profile?.bannerPath})`,
						}}>
						<button
							className={styles.update}
							onClick={() =>
								setIsBannerOpen(true)
							}>
							<Icon name="BsCamera" />
						</button>
						<div>
							<Image
								src={
									profile?.avatarPath
								}
								alt={profile?.name}
								height={100}
								width={100}
							/>
							<div
								onClick={() =>
									setIsAvatarOpen(true)
								}>
								<Icon name="BsCamera" />
							</div>
						</div>
					</div>
				</div>
				{isAvatarOpen && (
					<div className={styles.modal}>
						<ImageCropModal
							aspectRatio={4 / 4}
							onClick={async (
								file: any
							) => {
								await uploadImage(
									file,
									`users/${user?.name}`
								).then(
									async (data: any) => {
										if (data?.data) {
											await updateAvatar(
												{
													avatarPath:
														data?.data,
												}
											)
											setIsAvatarOpen(
												false
											)
										}
									}
								)
							}}
							title="Изменить аватарку"
							titleButton="Сохранить"
							setIsOpen={
								setIsAvatarOpen
							}
						/>
					</div>
				)}
				{isBannerOpen && (
					<div className={styles.modal}>
						<ImageCropModal
							aspectRatio={16 / 9}
							onClick={async (
								file: any
							) => {
								await uploadImage(
									file,
									`users/${user?.name}`
								).then(
									async (data: any) => {
										if (data?.data) {
											await updateBanner(
												{
													bannerPath:
														data?.data,
												}
											)
											setIsBannerOpen(
												false
											)
										}
									}
								)
							}}
							title="Изменить баннер"
							titleButton="Сохранить"
							setIsOpen={
								setIsBannerOpen
							}
						/>
					</div>
				)}
				{(isAvatarOpen ||
					isBannerOpen) && (
					<div
						className="overlay"
						style={{
							zIndex: "6",
						}}></div>
				)}

				<ProfileInfo user={user!} />

				<div
					style={{
						display: "flex",
						justifyContent: "center",
						gap: "20px",
						margin: "30px 0",
					}}>
					<Button
						title="Выйти"
						icon="BsDoorOpenFill"
						onClick={() => LogOut()}
						type="button"
					/>
					<Button
						title="Удалить аккаунт"
						icon="BsTrashFill"
						onClick={() =>
							deleteProfile(null)
						}
						type="button"
					/>
				</div>

				<Link href={"/profile/update"}>
					Обновить профиль
				</Link>
			</div>
		)
	}
	return null
}

export default Profile
