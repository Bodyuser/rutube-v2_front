import { axiosClassic } from "@/api/axios-classic"
import { ISearch } from "./search.types"
import { IGlobalUser } from "@/shared/types/user/user.types"
import { IVideo } from "@/shared/types/video/video.types"

const getSearchUrl = (url: string) =>
	`/search/${url}`

export const SearchService = {
	async getSearchList() {
		return (
			await axiosClassic.get<string[]>(
				getSearchUrl("")
			)
		).data
	},
	async getSearchResult(data: ISearch) {
		return (
			await axiosClassic.get<{
				users: IGlobalUser[]
				videos: IVideo[]
			}>(getSearchUrl("result"), {
				params: data,
			})
		).data
	},
}
