import {
	useUploadImageMutation,
	useUploadVideoMutation,
} from "@/redux/api/files.api"
import { useCallback } from "react"

export const useUpload = (
	type: "image" | "video"
) => {
	const [uploadImage] =
		useUploadImageMutation()

	const [uploadVideo] =
		useUploadVideoMutation()

	const uploadFile = useCallback(
		async (
			file: any,
			folder: string
		) => {
			if (file) {
				if (type === "image") {
					const formData =
						new FormData()
					formData.append("image", file)
					const response =
						await uploadImage({
							folder,
							formData,
						})
					return response
				} else {
					const formData =
						new FormData()
					formData.append("video", file)
					const response =
						await uploadVideo({
							folder,
							formData,
						})
					return response
				}
			}
		},
		[]
	)

	return {
		uploadFile,
	}
}
