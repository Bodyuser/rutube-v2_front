import { api } from "./api"

const getFilesUrl = (url: string) =>
	`/files/${url}`

interface IUploadData {
	formData: any
	folder: string
}

const fileApi = api.injectEndpoints({
	endpoints: builder => ({
		uploadImage: builder.mutation<
			string,
			IUploadData
		>({
			query: ({
				folder,
				formData,
			}) => ({
				method: "POST",
				type: "auth",
				url: getFilesUrl("image"),
				data: formData,
				title: "Загрузка изображения",
				message: "Успешно загружено",
				params: {
					folder,
				},
				headers: {
					"Content-Type":
						"multipart/form-data",
				},
			}),
			transformResponse(response: any) {
				return response?.url
			},
		}),
		uploadVideo: builder.mutation<
			string,
			IUploadData
		>({
			query: ({
				folder,
				formData,
			}) => ({
				method: "POST",
				type: "auth",
				url: getFilesUrl("video"),
				data: formData,
				title: "Загрузка видео",
				message: "Успешно загружено",
				params: {
					folder,
				},
				headers: {
					"Content-Type":
						"multipart/form-data",
				},
			}),
			transformResponse(response: any) {
				return response?.url
			},
		}),
	}),
})

export const {
	useUploadImageMutation,
	useUploadVideoMutation,
} = fileApi
