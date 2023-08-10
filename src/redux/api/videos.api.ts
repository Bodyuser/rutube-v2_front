import {
	ICreateVideo,
	IUpdateVideo,
} from "@/shared/types/video/video.types"
import { api } from "./api"
import { IVideo } from "@/shared/types/video/video.types"
import { IMessageResponse } from "@/shared/types/message-response.types"
import { ICategory } from "@/shared/types/category/category.types"
import Cookies from "js-cookie"

const getVideosUrl = (url: string) =>
	`/videos/${url}`

const videoApi = api.injectEndpoints({
	endpoints: builder => ({
		createVideo: builder.mutation<
			IVideo,
			ICreateVideo
		>({
			query: data => ({
				method: "POST",
				type: "auth",
				url: getVideosUrl(""),
				data,
				title: "Создание видео",
				message: "Успешно создано",
			}),
			invalidatesTags: [
				{
					type: "Videos",
					id: "profile",
				},
				{
					type: "Videos",
					id: "newest",
				},
				{
					type: "Videos",
					id: "top",
				},
			],
			transformResponse(response: any) {
				return response?.video
			},
		}),
		// 		updateVideo: builder.mutation<
		// 			IVideo,
		// 			{ id: string } & IUpdateVideo
		// 		>({
		// 			query: ({ id, ...data }) => ({
		// 				method: "PUT",
		// 				type: "auth",
		// 				url: getVideosUrl(id),
		// 				data,
		// 				title: "Обновление видео",
		// 				message: "Успешно обновлено",
		// 			}),
		// 			invalidatesTags: [
		// 				{
		// 					type: "Videos",
		// 					id: "profile",
		// 				},
		// 			],
		// 			transformResponse(response: any) {
		// 				return response?.video
		// 			},
		// 		}),
		// 		deleteVideo: builder.mutation<
		// 			string,
		// 			string
		// 		>({
		// 			query: id => ({
		// 				method: "DELETE",
		// 				type: "auth",
		// 				url: getVideosUrl(id),
		// 				title: "Удаление видео",
		// 				message: "Успешно удалено",
		// 			}),
		// 			invalidatesTags: [
		// 				{
		// 					type: "Videos",
		// 					id: "profile",
		// 				},
		// 			],
		// 			transformResponse(response: any) {
		// 				return response?.video
		// 			},
		// 		}),
		toggleLikeVideo: builder.mutation<
			IVideo,
			string
		>({
			query: id => ({
				method: "PATCH",
				type: "auth",
				url: getVideosUrl(
					`toggle-like/${id}`
				),
				title: "Понравилось видео",
				message:
					"Успешно добавлено в понравившиеся",
			}),
			invalidatesTags: (
				result,
				error,
				arg
			) => [
				{
					type: "Videos",
					id: result?.id,
				},
			],
			transformResponse(response: any) {
				return response?.video
			},
		}),
		toggleDisLikeVideo:
			builder.mutation<IVideo, string>({
				query: id => ({
					method: "PATCH",
					type: "auth",
					url: getVideosUrl(
						`toggle-dislike/${id}`
					),
					title: "Не понравилось видео",
					message:
						"Успешно добавлено в непонравившиеся",
				}),
				invalidatesTags: (
					result,
					error,
					arg
				) => [
					{
						type: "Videos",
						id: result?.id,
					},
				],
				transformResponse(
					response: any
				) {
					return response?.video
				},
			}),
		// 		viewVideo: builder.mutation<
		// 			IVideo,
		// 			string
		// 		>({
		// 			query: id => ({
		// 				method: "PATCH",
		// 				type: "auth",
		// 				url: getVideosUrl(
		// 					`view-video/${id}`
		// 				),
		// 			}),
		// 			transformResponse(response: any) {
		// 				return response?.video
		// 			},
		// 			invalidatesTags: result => [
		// 				{
		// 					type: "Videos",
		// 					id: result?.id,
		// 				},
		// 			],
		// 		}),
		checkExistingSlug: builder.query<
			IMessageResponse & {
				access: boolean
			},
			string
		>({
			query: slug => ({
				method: "GET",
				type: "auth",
				url: getVideosUrl(
					`existing-slug/${slug}`
				),
			}),
		}),
		getTopVideos: builder.query<
			IVideo[],
			any
		>({
			query: () => ({
				method: "GET",
				type: "no-auth",
				url: getVideosUrl("top"),
			}),
			transformResponse(response: any) {
				return response?.videos
			},
			providesTags: [
				{
					type: "Videos",
					id: "top",
				},
			],
		}),
		getFullTopVideos: builder.query<
			IVideo[],
			any
		>({
			query: () => ({
				method: "GET",
				type: "no-auth",
				url: getVideosUrl("full-top"),
			}),
			transformResponse(response: any) {
				return response?.videos
			},
		}),
		getSimilarVideos: builder.query<
			IVideo[],
			string
		>({
			query: id => ({
				method: "GET",
				type: "no-auth",
				url: getVideosUrl(
					`similar/${id}`
				),
			}),
			transformResponse(response: any) {
				return response?.videos
			},
		}),
		getNewestVideos: builder.query<
			IVideo[],
			any
		>({
			query: () => ({
				method: "GET",
				type: "no-auth",
				url: getVideosUrl("newest"),
			}),
			transformResponse(response: any) {
				return response?.videos
			},
			providesTags: [
				{
					type: "Videos",
					id: "newest",
				},
			],
		}),
		getVideosByCategory: builder.query<
			IVideo[],
			string
		>({
			query: id => ({
				method: "GET",
				type: "no-auth",
				url: getVideosUrl(
					`category/${id}`
				),
			}),
			transformResponse(response: any) {
				return response?.videos
			},
		}),
		getRecommendationVideos:
			builder.query<IVideo[], any>({
				query: () => ({
					method: "GET",
					type: "auth",
					url: getVideosUrl(
						"recommendation"
					),
				}),
				transformResponse(
					response: any
				) {
					return response?.videos
				},
			}),

		getCategoryAndVideo: builder.query<
			({
				category: ICategory
			} & {
				videos: IVideo[]
			})[],
			any
		>({
			query: () => ({
				method: "GET",
				type: "auth",
				url: getVideosUrl(
					"category-videos"
				),
			}),
		}),
		getVideoBySlug: builder.query<
			IVideo & {
				isLike?: boolean
				isDisLike?: boolean
				countLike: number
				countDisLike: number
			},
			string
		>({
			query: slug => ({
				method: "GET",
				type: "no-auth",
				url: getVideosUrl(slug),
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
				return response?.video
			},
			providesTags: (
				result,
				error,
				arg
			) => [
				{
					type: "Videos",
					id: arg,
				},
			],
		}),
		// 		getVideosByProfile: builder.query<
		// 			IVideo[],
		// 			any
		// 		>({
		// 			query: () => ({
		// 				method: "GET",
		// 				type: "auth",
		// 				url: getVideosUrl("profile"),
		// 			}),
		// 			transformResponse(response: any) {
		// 				return response?.videos
		// 			},
		// 			providesTags: [
		// 				{
		// 					type: "Videos",
		// 					id: "profile",
		// 				},
		// 			],
		// 		}),
		// 		getVideosByUser: builder.query<
		// 			IVideo[],
		// 			string
		// 		>({
		// 			query: id => ({
		// 				method: "GET",
		// 				type: "no-auth",
		// 				url: getVideosUrl(`user/${id}`),
		// 			}),
		// 			transformResponse(response: any) {
		// 				return response?.videos
		// 			},
		// 			providesTags: (
		// 				result,
		// 				error,
		// 				arg
		// 			) => [
		// 				{
		// 					type: "Videos",
		// 					id: arg,
		// 				},
		// 			],
		// 		}),
	}),
})

export const {
	useCreateVideoMutation,
	useGetTopVideosQuery,
	useGetNewestVideosQuery,
	useGetRecommendationVideosQuery,
	// 	useDeleteVideoMutation,
	useGetVideoBySlugQuery,
	// 	useGetVideosByProfileQuery,
	// 	useGetVideosByUserQuery,
	useLazyCheckExistingSlugQuery,
	useGetCategoryAndVideoQuery,
	useGetSimilarVideosQuery,
	useGetVideosByCategoryQuery,
	useToggleDisLikeVideoMutation,
	useToggleLikeVideoMutation,
	// 	useUpdateVideoMutation,
	// 	useViewVideoMutation,
	useGetFullTopVideosQuery,
	endpoints: {
		getTopVideos,
		getNewestVideos,
	},
	util: { getRunningQueriesThunk },
} = videoApi
