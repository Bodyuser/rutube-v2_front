import Cookies from "js-cookie"
import { api } from "./api"
import {
	IComment,
	ICreateComment,
	IUpdateComment,
} from "@/shared/types/comment/comment.types"

const getCommentsUrl = (url: string) =>
	`/comments/${url}`

const commentApi = api.injectEndpoints({
	endpoints: builder => ({
		createComment: builder.mutation<
			IComment,
			ICreateComment & {
				videoId: string
			}
		>({
			query: ({
				videoId,
				...data
			}) => ({
				method: "POST",
				type: "auth",
				url: getCommentsUrl(videoId),
				data,
				title: "Создание комментария",
				message: "Успешно создано",
			}),
			transformResponse(response: any) {
				return response?.comment
			},
			invalidatesTags: (
				result,
				error,
				arg
			) => [
				{
					type: "Comments",
					id: arg.videoId,
				},
			],
		}),
		updateComment: builder.mutation<
			IComment,
			{ id: string } & IUpdateComment
		>({
			query: ({ id, ...data }) => ({
				method: "PUT",
				type: "auth",
				url: getCommentsUrl(id),
				data,
				title: "Обновление комментария",
				message: "Успешно обновлено",
			}),
			transformResponse(response: any) {
				return response?.comment
			},
		}),
		deleteComment: builder.mutation<
			string,
			string
		>({
			query: id => ({
				method: "DELETE",
				type: "auth",
				url: getCommentsUrl(id),
				title: "Удаление комментария",
				message: "Успешно удалено",
			}),

			transformResponse(response: any) {
				return response?.comment
			},
		}),
		getCommentsByVideo: builder.query<
			(IComment & {
				countLike: number
				countDisLike: number
				isLike?: boolean
				isDisLike?: boolean
			})[],
			string
		>({
			query: videoId => ({
				method: "GET",
				type: "no-auth",
				url: getCommentsUrl(videoId),
				headers: Cookies.get(
					"accessToken"
				)
					? {
							Authorization: `Bearer ${Cookies.get(
								"accessToken"
							)}`,
					  }
					: {},
			}),
			transformResponse(response: any) {
				return response?.comments
			},
			providesTags: (
				result,
				error,
				arg
			) => [
				{ type: "Comments", id: arg },
			],
		}),
		getReplyCommentsByComment:
			builder.query<
				(IComment & {
					countLike: number
					countDisLike: number
					isLike?: boolean
					isDisLike?: boolean
				})[],
				string
			>({
				query: commentId => ({
					method: "GET",
					type: "no-auth",
					url: getCommentsUrl(
						`reply-comments/${commentId}`
					),
					headers: Cookies.get(
						"accessToken"
					)
						? {
								Authorization: `Bearer ${Cookies.get(
									"accessToken"
								)}`,
						  }
						: {},
				}),
				transformResponse(
					response: any
				) {
					return response?.comments
				},
				providesTags: (
					result,
					error,
					arg
				) => [
					{ type: "Comments", id: arg },
				],
				keepUnusedDataFor: 0,
			}),
		toggleLikeComment: builder.mutation<
			IComment,
			string
		>({
			query: id => ({
				method: "PATCH",
				type: "auth",
				url: getCommentsUrl(
					`toggle-like/${id}`
				),
				title: "Поставили лайк",
				message: "Успешно",
			}),
			transformResponse(response: any) {
				return response?.comment
			},
			invalidatesTags: res => [
				{
					type: "Comments",
					id: res?.video.id,
				},
			],
		}),
		toggleDisLikeComment:
			builder.mutation<
				IComment,
				string
			>({
				query: id => ({
					method: "PATCH",
					type: "auth",
					url: getCommentsUrl(
						`toggle-dislike/${id}`
					),
					title: "Поставили дизлайк",
					message: "Успешно",
				}),
				transformResponse(
					response: any
				) {
					return response?.comment
				},
				invalidatesTags: res => [
					{
						type: "Comments",
						id: res?.video.id,
					},
				],
			}),
	}),
})

export const {
	useCreateCommentMutation,
	useDeleteCommentMutation,
	useGetCommentsByVideoQuery,
	useToggleDisLikeCommentMutation,
	useToggleLikeCommentMutation,
	useUpdateCommentMutation,
	useGetReplyCommentsByCommentQuery,
} = commentApi
