import { useTypedSelector } from "@/hooks/useTypedSelector"
import { useUpload } from "@/hooks/useUpload"
import {
	useCreateVideoMutation,
	useLazyCheckExistingSlugQuery,
} from "@/redux/api/videos.api"
import { ICreateVideo } from "@/shared/types/video/video.types"
import {
	SubmitHandler,
	useForm,
} from "react-hook-form"
import { useState, useRef } from "react"
import { useGetCategoriesQuery } from "@/redux/api/categories.api"
import { toastr } from "react-redux-toastr"

export const useNewVideoModal = (
	isOpen: boolean,
	setIsOpen: any
) => {
	const {
		reset,
		register,
		formState: { errors },
		control,
		handleSubmit,
		setValue,
		getValues,
	} = useForm<ICreateVideo>({
		mode: "onChange",
	})

	const user = useTypedSelector(
		state => state.users.user
	)

	const { data: categories } =
		useGetCategoriesQuery(null, {
			skip: !isOpen,
		})

	const [imageFile, setImageFile] =
		useState<any>(null)
	const [videoFile, setVideoFile] =
		useState<any>(null)
	const [imageUrl, setImageUrl] =
		useState<any>(null)
	const [videoUrl, setVideoUrl] =
		useState<any>(null)
	const [progress, setProgress] =
		useState<number>(0)

	const videoRef = useRef<any>(null)

	const [createVideo] =
		useCreateVideoMutation()

	const { uploadFile: uploadImage } =
		useUpload("image")

	const { uploadFile: uploadVideo } =
		useUpload("video")

	const socket = useTypedSelector(
		state => state.users.socket
	)

	const [
		checkExistingSlug,
		{ data: existingData },
	] = useLazyCheckExistingSlugQuery()
	console.log(videoRef.current)

	const onSubmit: SubmitHandler<
		ICreateVideo
	> = async data => {
		socket.on(
			"upload",
			(progress: any) => {
				setProgress(progress.percent)
			}
		)

		await Promise.all([
			uploadImage(
				imageFile,
				`videos/${user?.name}/${data.slug}`
			),
			uploadVideo(
				videoFile,
				`videos/${user?.name}/${data.slug}`
			),
		]).then((responses: any) => {
			if (
				responses[0]?.data &&
				responses[1]?.data
			) {
				createVideo({
					...data,
					minAgeRestrictions: Number(
						data.minAgeRestrictions
					),
					isPrivate:
						data.isPrivate === "false"
							? false
							: true,
					bannerPath: responses[0].data,
					videoPath: responses[1].data,
					duration: Math.round(
						Number(
							videoRef.current?.duration
						)
					),
				})
			}
		})
		reset()
		setIsOpen(false)
		socket.off("upload")
	}

	return {
		onSubmit,
		register,
		errors,
		control,
		handleSubmit,
		checkExistingSlug,
		videoRef,
		categories,
		imageFile,
		setImageFile,
		imageUrl,
		setImageUrl,
		videoFile,
		setVideoFile,
		videoUrl,
		setVideoUrl,
		progress,
		setValue,
		getValues,
	}
}
