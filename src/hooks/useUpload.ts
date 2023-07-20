import { FilesService } from "@/services/files/files.service"
import { useMutation } from "@tanstack/react-query"
import { useCallback } from "react"

export const useUpload = (
	type: "image" | "video",
	folder: string,
) => {
	const { mutateAsync: uploadImage } =
		useMutation(
			["upload image"],
			(files: any) =>
				FilesService.uploadImage(
					files,
					folder
				)
		)

	const { mutateAsync: uploadVideo } =
		useMutation(
			["upload video"],
			(files: any) =>
				FilesService.uploadVideo(
					files,
					folder
				)
		)

	const uploadFile = useCallback(
		async (file: any) => {
			if (file) {
				if (type === "image") {
					const response =
						await uploadImage(file)
					return response
				} else {
					const response =
						await uploadVideo(file)
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
