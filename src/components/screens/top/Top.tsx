import { FC } from "react"

import styles from "./Top.module.scss"
import { useGetFullTopVideosQuery } from "@/redux/api/videos.api"
import Video from "@/components/ui/video/Video"

const Top: FC = () => {
	const { data: topVideos } =
		useGetFullTopVideosQuery(null)

	return (
		<div className={styles.top}>
			<h2>Топ видео</h2>
			<div>
				{topVideos?.length ? (
					topVideos.map(video => (
						<Video video={video} />
					))
				) : (
					<span>Здесь нет видео</span>
				)}
			</div>
		</div>
	)
}

export default Top
