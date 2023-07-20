import { FC, PropsWithChildren } from "react"

import styles from "./CarouselVideos.module.scss"
import { IVideo } from "@/shared/types/video/video.types"
import Link from "next/link"

import CarouselItem from "./carousel-item/CarouselItem"

interface ICarouselVideos {
	videos: IVideo[]
	url: string
}

const CarouselVideos: FC<
	PropsWithChildren<ICarouselVideos>
> = ({ url, videos, children }) => {
	return (
		<div className={styles.carousel}>
			<Link href={url}>
				{
					children
				}
			</Link>
			<div>
				{videos.length ? videos.map(video => (
					<CarouselItem
						key={video.id}
						video={video}
					/>
				)) : <div className={styles.empty}>В этом разделе не видео</div>}
			</div>
		</div>
	)
}

export default CarouselVideos
