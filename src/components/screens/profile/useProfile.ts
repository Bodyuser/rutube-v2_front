import { useTypedSelector } from "@/hooks/useTypedSelector"
import { useUpload } from "@/hooks/useUpload"
import {
	useGetProfileQuery,
	useUpdateAvatarPathMutation,
	useUpdateBannerPathMutation,
} from "@/redux/api/users.api"
import { useState } from "react"

export const useProfile = () => {
	const { isAuth, user } =
		useTypedSelector(
			state => state.users
		)

	const [
		isAvatarOpen,
		setIsAvatarOpen,
	] = useState(false)

	const [
		isBannerOpen,
		setIsBannerOpen,
	] = useState(false)

	const { data: profile } =
		useGetProfileQuery(null, {
			skip: !isAuth,
		})

	const [updateAvatar] =
		useUpdateAvatarPathMutation()

	const [updateBanner] =
		useUpdateBannerPathMutation()

	const { uploadFile: uploadImage } =
		useUpload("image")

	return {
		profile,
		isAvatarOpen,
		setIsAvatarOpen,
		updateAvatar,
		uploadImage,
		user,
		updateBanner,
		isBannerOpen,
		setIsBannerOpen,
	}
}
