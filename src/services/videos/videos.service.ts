import { axiosClassic } from "@/api/axios-classic"
import { IVideo } from "@/shared/types/video/video.types"
import {ICreateVideo, IUpdateVideo, IGetAllVideos} from "./videos.types"
import { axiosInstance } from "@/api/axios-instance"
import { IMessageResponse } from "@/shared/types/message-response.types"
import { ICategory } from "@/shared/types/category/category.types"
import { IGlobalUser } from "@/shared/types/user/user.types"

const getVideoUrl = (url: string) => `/videos/${url}`

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
				getVideoUrl(""),
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
				getVideoUrl(id),
				data
			)
		).data.video
	},
	async deleteVideo(id: string) {
		return (
			await axiosInstance.delete<IMessageResponse>(
				getVideoUrl(id)
			)
		).data.message
	},
	async toggleLikeVideo(id: string) {
		return (
			await axiosInstance.patch<IVideoResponse>(
				getVideoUrl(`toggle-like/${id}`)
			)
		).data.video
	},
	async toggleDisLikeVideo(id: string) {
		return (
			await axiosInstance.patch<IVideoResponse>(
				getVideoUrl(
					`toggle-dislike/${id}`
				)
			)
		).data.video
	},
	async viewVideo(id: string) {
		return (
			await axiosClassic.patch<IVideoResponse>(
				getVideoUrl(`view-video/${id}`)
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
				getVideoUrl(
					`existing-slug/${slug}`
				)
			)
		).data
	},
	async getSearchList() {
		return (
			await axiosClassic.get<string[]>(
				getVideoUrl("search-list")
			)
		).data
	},
	async getTopVideos() {
		return (
			await axiosClassic.get<IVideosResponse>(
				getVideoUrl("top")
			)
		).data.videos
	},
	async getNewestVideos() {
		return (
			await axiosClassic.get<IVideosResponse>(
				getVideoUrl("newest")
			)
		).data.videos
	},
	async getVideosByCategory(
		id: string
	) {
		return (
			await axiosClassic.get<IVideosResponse>(
				getVideoUrl(`category/${id}`)
			)
		).data.videos
	},
	async getRecommendationVideos() {
		return (
			await axiosInstance.get<IVideosResponse>(
				getVideoUrl(`recommendation`)
			)
		).data.videos
	},
	async getCategoryAndVideo() {
		return (
			await axiosClassic.get<
				({
					category: ICategory
				} & IVideosResponse)[]
			>(getVideoUrl(`category-videos`))
		).data
	},
	async getAllVideos(
		data: IGetAllVideos
	) {
		return (
			await axiosClassic.get<
				IVideosResponse & {
					users: IGlobalUser[]
				}
			>(getVideoUrl(""), {
				params: data,
			})
		).data
	},
	async getVideoBySlug(slug: string) {
		return (
			await axiosClassic.get<IVideoResponse>(
				getVideoUrl(slug)
			)
		).data.video
	},
	async getVideosByProfile() {
		return (
			await axiosInstance.get<IVideosResponse>(
				getVideoUrl("profile")
			)
		).data.videos
	},
	async getVideosByUser(id: string) {
		return (
			await axiosClassic.get<IVideosResponse>(
				getVideoUrl(`user/${id}`)
			)
		).data.videos
	},
}