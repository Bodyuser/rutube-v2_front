import { axiosClassic } from "@/api/axios-classic"

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
}
