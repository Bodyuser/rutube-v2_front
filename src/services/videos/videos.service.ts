import { axiosClassic } from "@/api/axios-classic"
import { IVideo } from "@/shared/types/video/video.types"
import {
	ICreateVideo,
	IUpdateVideo,
} from "./videos.types"
import { axiosInstance } from "@/api/axios-instance"
import { IMessageResponse } from "@/shared/types/message-response.types"
import { ICategory } from "@/shared/types/category/category.types"
import { IGlobalUser } from "@/shared/types/user/user.types"

const getVideosUrl = (url: string) =>
	`/videos/${url}`

interface IVideosResponse {
	videos: IVideo[]
}

interface IVideoResponse {
	video: IVideo
}

export const VideosService = {
	async createVideo(
		data: ICreateVideo
	) {
		return (
			await axiosInstance.post<IVideoResponse>(
				getVideosUrl(""),
				data
			)
		).data.video
	},
	async updateVideo(
		data: IUpdateVideo,
		id: string
	) {
		return (
			await axiosInstance.put<IVideoResponse>(
				getVideosUrl(id),
				data
			)
		).data.video
	},
	async deleteVideo(id: string) {
		return (
			await axiosInstance.delete<IMessageResponse>(
				getVideosUrl(id)
			)
		).data.message
	},
	async toggleLikeVideo(id: string) {
		return (
			await axiosInstance.patch<IVideoResponse>(
				getVideosUrl(
					`toggle-like/${id}`
				)
			)
		).data.video
	},
	async toggleDisLikeVideo(id: string) {
		return (
			await axiosInstance.patch<IVideoResponse>(
				getVideosUrl(
					`toggle-dislike/${id}`
				)
			)
		).data.video
	},
	async viewVideo(id: string) {
		return (
			await axiosClassic.patch<IVideoResponse>(
				getVideosUrl(`view-video/${id}`)
			)
		).data.video
	},
	async checkExistingSlug(
		slug: string
	) {
		return (
			await axiosInstance.get<
				IMessageResponse & {
					access: boolean
				}
			>(
				getVideosUrl(
					`existing-slug/${slug}`
				)
			)
		).data
	},
	async getTopVideos() {
		return (
			await axiosClassic.get<IVideosResponse>(
				getVideosUrl("top")
			)
		).data.videos
	},
	async getNewestVideos() {
		return (
			await axiosClassic.get<IVideosResponse>(
				getVideosUrl("newest")
			)
		).data.videos
	},
	async getVideosByCategory(
		id: string
	) {
		return (
			await axiosClassic.get<IVideosResponse>(
				getVideosUrl(`category/${id}`)
			)
		).data.videos
	},
	async getRecommendationVideos() {
		return (
			await axiosInstance.get<IVideosResponse>(
				getVideosUrl(`recommendation`)
			)
		).data.videos
	},
	async getCategoryAndVideo() {
		return (
			await axiosClassic.get<
				({
					category: ICategory
				} & IVideosResponse)[]
			>(getVideosUrl(`category-videos`))
		).data
	},
	async getVideoBySlug(slug: string) {
		return (
			await axiosClassic.get<IVideoResponse>(
				getVideosUrl(slug)
			)
		).data.video
	},
	async getVideosByProfile() {
		return (
			await axiosInstance.get<IVideosResponse>(
				getVideosUrl("profile")
			)
		).data.videos
	},
	async getVideosByUser(id: string) {
		return (
			await axiosClassic.get<IVideosResponse>(
				getVideosUrl(`user/${id}`)
			)
		).data.videos
	},
}