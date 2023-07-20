import { axiosInstance } from "@/api/axios-instance"
import {ICreateComment, IUpdateComment} from "./comments.types"
import { IComment } from "@/shared/types/comment/comment.types"
import { IMessageResponse } from "@/shared/types/message-response.types"
import { axiosClassic } from "@/api/axios-classic"

const getCommentsUrl = (url: string) => `/comments/${url}`

interface ICommentResponse {
  comment: IComment
}

export const CommentsService = {
	async createComment(
		data: ICreateComment,
		videoId: string
	) {
		return (
			await axiosInstance.post<ICommentResponse>(
				getCommentsUrl(videoId),
				data
			)
		).data.comment
	},
	async updateComment(
		data: IUpdateComment,
		id: string
	) {
		return (
			await axiosInstance.put<ICommentResponse>(
				getCommentsUrl(id),
				data
			)
		).data.comment
	},
	async deleteComment(
		id: string
	) {
		return (
			await axiosInstance.delete<IMessageResponse>(
				getCommentsUrl(id)
			)
		).data.message
	},
	async getCommentsByVideo(videoId: string) {
		return (
			await axiosClassic.get<{comments: IComment[]}>(getCommentsUrl(videoId))
		).data.comments
	}
}