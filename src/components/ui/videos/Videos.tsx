import { FC } from "react"

import styles from "./Videos.module.scss"
import { IVideos } from "./videos.types"
import Video from "../video/Video"

const Videos: FC<IVideos> = ({
	videos,
	title,
}) => {
	return (
		<div className={styles.videos}>
			{title && <h3>{title}</h3>}
			<div>
				{videos?.length
					? videos.map(video => (
							<Video
								key={video.id}
								video={video}
							/>
					  ))
					: "Здесь нет видео"}
			</div>
		</div>
	)
}

export default Videos
