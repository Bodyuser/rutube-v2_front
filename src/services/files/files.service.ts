import { axiosInstance } from "@/api/axios-instance"

const getFilesUrl = (url: string) => `/files/${url}`

interface IFileResponse {
  url: string
}

export const FilesService = {
	async uploadImage(
		file: any,
		folder: string
	) {
		const formData = new FormData()
		formData.append("image", file)
    
		return (
			await axiosInstance.post<IFileResponse>(
				getFilesUrl("image"),
				formData,
				{
					params: {
						folder,
					},
					headers: {
						"Content-Type":
							"multipart/form-data",
					},
				}
			)
		).data.url
	},
	async uploadVideo(
		file: any,
		folder: string
	) {
		const formData = new FormData()
		formData.append("video", file)

		return (
			await axiosInstance.post<IFileResponse>(
				getFilesUrl("video"),
				formData,
				{
					params: {
						folder,
					},
					headers: {
						"Content-Type":
							"multipart/form-data",
					},
				}
			)
		).data.url
	},
}