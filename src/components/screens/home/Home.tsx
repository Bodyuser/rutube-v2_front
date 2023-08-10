import { FC } from "react"

import styles from "./Home.module.scss"
import { useHome } from "./useHome"
import Videos from "@/components/ui/videos/Videos"
import Video from "@/components/ui/video/Video"
import Person from "@/components/ui/person/Person"

const Home: FC = () => {
	const {
		newestVideos,
		query,
		recommendationVideos,
		topVideos,
		isAuth,
		categoryAndVideos,
		searchResult,
	} = useHome()

	return (
		<div className={styles.home}>
			{query?.query ? (
				<div className={styles.search}>
					<h4>
						По запросу {query.query}{" "}
						было найдено{" "}
						{searchResult?.users.length}{" "}
						каналов и{" "}
						{
							searchResult?.videos
								.length
						}{" "}
						видео
					</h4>
					<div>
						<div>
							{!!searchResult?.users
								.length &&
								searchResult.users.map(
									user => (
										<Person
											user={user}
										/>
									)
								)}
						</div>
						<div
							className={styles.videos}>
							{!!searchResult?.videos
								.length &&
								searchResult.videos.map(
									video => (
										<Video
											video={video}
										/>
									)
								)}
						</div>
					</div>
				</div>
			) : (
				<>
					<Videos
						title="Топ 5 видео"
						videos={topVideos || []}
					/>
					{isAuth && (
						<Videos
							title="Рекомендации"
							videos={
								recommendationVideos ||
								[]
							}
						/>
					)}
					<Videos
						title="Новые видео"
						videos={newestVideos || []}
					/>

					{!!categoryAndVideos?.length &&
						categoryAndVideos.map(
							item => (
								<Videos
									title={
										item.category.title
									}
									videos={
										item.videos || []
									}
								/>
							)
						)}
				</>
			)}
		</div>
	)
}

export default Home
