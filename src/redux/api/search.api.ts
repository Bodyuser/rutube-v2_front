import { api } from "./api"
import { IGlobalUser } from "@/shared/types/user/user.types"
import { IVideo } from "@/shared/types/video/video.types"
import Cookies from "js-cookie"

const getSearchUrl = (url: string) =>
	`/search/${url}`

export enum DateEnum {
	ALL = "all",
	TODAY = "today",
	WEEK = "week",
	MONTH = "month",
	YEAR = "year",
}

export enum DurationEnum {
	ALL = "all",
	SHORT = "short",
	MEDIUM = "medium",
	LONG = "long",
	MOVIE = "movie",
}

export enum OrderEnum {
	NEWEST = "newest",
	OLDEST = "oldest",
	VIEWS = "views",
}

export interface ISearch {
	date: DateEnum

	duration: DurationEnum

	order: OrderEnum

	query: string
}

const searchApi = api.injectEndpoints({
	endpoints: builder => ({
		getSearchList: builder.query<
			string[],
			any
		>({
			query: () => ({
				method: "GET",
				type: "no-auth",
				url: getSearchUrl(""),
			}),
		}),
		getSearchResult: builder.query<
			{
				users: (IGlobalUser & {
					countFollowers: number
					isSubscribe?: boolean
				})[]
				videos: IVideo[]
			},
			ISearch
		>({
			query: data => ({
				method: "GET",
				type: "no-auth",
				url: getSearchUrl("result"),
				params: data,
				headers: {
					Authorization: Cookies.get(
						"accessToken"
					)
						? `Bearer ${Cookies.get(
								"accessToken"
						  )}`
						: "",
				},
			}),
		}),
	}),
})

export const {
	useGetSearchListQuery,
	useGetSearchResultQuery,
} = searchApi
