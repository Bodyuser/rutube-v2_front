import { useTypedSelector } from "@/hooks/useTypedSelector"
import {
	DateEnum,
	DurationEnum,
	OrderEnum,
	useGetSearchResultQuery,
} from "@/redux/api/search.api"
import {
	useGetCategoryAndVideoQuery,
	useGetNewestVideosQuery,
	useGetRecommendationVideosQuery,
	useGetTopVideosQuery,
} from "@/redux/api/videos.api"
import { useRouter } from "next/router"
import { useMemo } from "react"

export const useHome = () => {
	const { query } = useRouter()

	const isAuth = useTypedSelector(
		state => state.users.isAuth
	)

	const search = useMemo(
		() =>
			query?.query
				? String(query.query)
				: undefined,
		[query.query]
	)
	const duration = useMemo(
		() =>
			query?.duration
				? String(query.duration)
				: undefined,
		[query.duration]
	)
	const date = useMemo(
		() =>
			query?.date
				? String(query.date)
				: undefined,
		[query.date]
	)
	const order = useMemo(
		() =>
			query?.order
				? String(query.order)
				: undefined,
		[query.order]
	)

	const { data: topVideos } =
		useGetTopVideosQuery(null)
	const { data: newestVideos } =
		useGetNewestVideosQuery(null)
	const { data: categoryAndVideos } =
		useGetCategoryAndVideoQuery(null)
	const { data: recommendationVideos } =
		useGetRecommendationVideosQuery(
			null,
			{
				skip: !isAuth,
			}
		)

	const { data: searchResult } =
		useGetSearchResultQuery(
			{
				query: search!,
				date: (date as DateEnum)!,
				duration:
					(duration as DurationEnum)!,
				order: (order as OrderEnum)!,
			},
			{
				skip:
					!search ||
					!date ||
					!duration ||
					!order,
			}
		)

	return {
		topVideos,
		newestVideos,
		recommendationVideos,
		query,
		isAuth,
		categoryAndVideos,
		searchResult,
	}
}
