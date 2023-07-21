import {
	FC,
	useEffect,
	useState,
} from "react"

import styles from "./Home.module.scss"
import {
	useMutation,
	useQuery,
} from "@tanstack/react-query"
import { VideosService } from "@/services/videos/videos.service"
import CarouselVideos from "@/components/ui/carousel-videos/CarouselVideos"
import Icon from "@/components/ui/icon/Icon"
import { useTypedSelector } from "@/hooks/useTypedSelector"
import { useRouter } from "next/router"
import {
	DateEnum,
	DurationEnum,
	OrderEnum,
} from "@/services/search/search.types"
import CarouselItem from "@/components/ui/carousel-videos/carousel-item/CarouselItem"
import PersonItem from "@/components/ui/person-item/PersonItem"
import { SearchService } from "@/services/search/search.service"

const Home: FC = () => {
	const { data: topVideos } = useQuery(
		["get top videos"],
		() => VideosService.getTopVideos()
	)

	const { data: newestVideos } =
		useQuery(
			["get newest videos"],
			() =>
				VideosService.getNewestVideos()
		)

	const { data: categoryVideos } =
		useQuery(
			["get category and videos"],
			() =>
				VideosService.getCategoryAndVideo()
		)

	const user = useTypedSelector(
		state => state.users.user
	)

	const { data: recommendationVideos } =
		useQuery(
			["get newest videos"],
			() =>
				VideosService.getNewestVideos(),
			{
				enabled: !!user?.id,
			}
		)

	const { query, push } = useRouter()

	const [order, setOrder] = useState(
		query.order === OrderEnum.NEWEST
			? OrderEnum.NEWEST
			: query.order === OrderEnum.OLDEST
			? OrderEnum.OLDEST
			: OrderEnum.VIEWS
	)

	const [date, setDate] = useState(
		query.date === DateEnum.MONTH
			? DateEnum.MONTH
			: query.date === DateEnum.TODAY
			? DateEnum.TODAY
			: query.date === DateEnum.WEEK
			? DateEnum.WEEK
			: query.date === DateEnum.YEAR
			? DateEnum.YEAR
			: DateEnum.ALL
	)

	const [duration, setDuration] =
		useState(
			query.duration ===
				DurationEnum.LONG
				? DurationEnum.LONG
				: query.duration ===
				  DurationEnum.MEDIUM
				? DurationEnum.MEDIUM
				: query.duration ===
				  DurationEnum.MOVIE
				? DurationEnum.MOVIE
				: query.duration ===
				  DurationEnum.SHORT
				? DurationEnum.SHORT
				: DurationEnum.ALL
		)

	const {
		data: searchVideos,
		refetch,
	} = useQuery(
		["get search movies"],
		() =>
			SearchService.getSearchResult({
				query: String(query.query),
				date,
				duration,
				order,
			}),
		{
			enabled: !!query?.query,
		}
	)

	useEffect(() => {
		if (order && query.query) {
			const params =
				new URLSearchParams(
					Object(query)
				)
			params.set("order", order)

			push(`/?${params.toString()}`)
		}
	}, [order])

	useEffect(() => {
		if (date && query.query) {
			const params =
				new URLSearchParams(
					Object(query)
				)
			params.set("date", date)

			push(`/?${params.toString()}`)
		}
	}, [date])

	useEffect(() => {
		if (duration && query.query) {
			const params =
				new URLSearchParams(
					Object(query)
				)
			params.set("duration", duration)

			push(`/?${params.toString()}`)
		}
	}, [duration])

	useEffect(() => {
		if (query.query) {
			refetch()
		}
	}, [query])

	return (
		<div className={styles.home}>
			{query.query ? (
				<div className={styles.search}>
					<span>
						По результату поиска:{" "}
						<span>{query.query}</span>{" "}
						нашлось{" "}
						{
							searchVideos?.videos
								.length
						}{" "}
						видео и{" "}
						{searchVideos?.users.length}{" "}
						пользователей
					</span>
					<div
						className={styles.selects}>
						<div>
							<span>Date:</span>
							<select
								value={date}
								onChange={e => {
									setDate(
										// @ts-ignore
										e.target.value
									)
								}}>
								<option
									value={DateEnum.ALL}>
									{DateEnum.ALL}
								</option>
								<option
									value={
										DateEnum.MONTH
									}>
									{DateEnum.MONTH}
								</option>
								<option
									value={
										DateEnum.TODAY
									}>
									{DateEnum.TODAY}
								</option>
								<option
									value={DateEnum.WEEK}>
									{DateEnum.WEEK}
								</option>
								<option
									value={DateEnum.YEAR}>
									{DateEnum.YEAR}
								</option>
							</select>
						</div>
						<div>
							<span>Duration:</span>
							<select
								value={duration}
								onChange={e => {
									setDuration(
										// @ts-ignore
										e.target.value
									)
								}}>
								<option
									value={
										DurationEnum.ALL
									}>
									{DurationEnum.ALL}
								</option>
								<option
									value={
										DurationEnum.LONG
									}>
									{DurationEnum.LONG}
								</option>
								<option
									value={
										DurationEnum.MEDIUM
									}>
									{DurationEnum.MEDIUM}
								</option>
								<option
									value={
										DurationEnum.MOVIE
									}>
									{DurationEnum.MOVIE}
								</option>
								<option
									value={
										DurationEnum.SHORT
									}>
									{DurationEnum.SHORT}
								</option>
							</select>
						</div>
						<div>
							<span>Order:</span>
							<select
								value={order}
								onChange={e => {
									setOrder(
										// @ts-ignore
										e.target.value
									)
								}}>
								<option
									value={
										OrderEnum.NEWEST
									}>
									{OrderEnum.NEWEST}
								</option>
								<option
									value={
										OrderEnum.OLDEST
									}>
									{OrderEnum.OLDEST}
								</option>
								<option
									value={
										OrderEnum.VIEWS
									}>
									{OrderEnum.VIEWS}
								</option>
							</select>
						</div>
					</div>
					<div>
						<div>
							{searchVideos?.users.map(
								user => (
									<PersonItem
										user={user}
										key={user.id}
									/>
								)
							)}
						</div>
						<div>
							{searchVideos?.videos.map(
								video => (
									<CarouselItem
										key={video.id}
										video={video}
									/>
								)
							)}
						</div>
					</div>
				</div>
			) : (
				<>
					<CarouselVideos
						url="/top"
						videos={topVideos || []}>
						<span
							className={
								styles.heading
							}>
							<span>Топ-5</span>
							{"  "}
							Видео
							<Icon name="BsChevronRight" />
						</span>
					</CarouselVideos>
					{user?.id && (
						<CarouselVideos
							url="/recommendation"
							videos={
								recommendationVideos ||
								[]
							}>
							<span
								className={
									styles.heading
								}>
								Рекомендации
								<Icon name="BsChevronRight" />
							</span>
						</CarouselVideos>
					)}
					<CarouselVideos
						url="/newest"
						videos={newestVideos || []}>
						<span
							className={
								styles.heading
							}>
							Новинки блогеров
							<Icon name="BsChevronRight" />
						</span>
					</CarouselVideos>
					{categoryVideos &&
						categoryVideos?.map(
							item => (
								<CarouselVideos
									key={
										item.category.slug
									}
									url={`/categories/${item.category.slug}`}
									videos={
										item.videos || []
									}>
									<span
										className={
											styles.heading
										}>
										{
											item.category
												.title
										}
										<Icon name="BsChevronRight" />
									</span>
								</CarouselVideos>
							)
						)}
				</>
			)}
		</div>
	)
}

export default Home
