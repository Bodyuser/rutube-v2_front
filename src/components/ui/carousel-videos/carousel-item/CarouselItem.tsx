import { FC, useState } from 'react'

import styles from './CarouselItem.module.scss'
import { IVideo } from '@/shared/types/video/video.types'
import Link from 'next/link'
import dayjs from "dayjs"
import { formatSecondsToMMSS } from '@/utils/time/formatSecondsToMMSS'
import relativeTime from "dayjs/plugin/relativeTime"

dayjs.extend(relativeTime)

interface ICarouselItem {
  video: IVideo
}

const CarouselItem: FC<ICarouselItem> = ({video}) => {
  const [hover, setHover] =
		useState(false)

  return (
		<Link
			onMouseMove={() => setHover(true)}
			onMouseLeave={() =>
				setHover(false)
			}
      href={`/videos/${video.slug}`}
    className={styles.item}>
			<div className={styles.source}>
				<span
					className={
						styles.minAgeRestrictions
					}>
					{video.minAgeRestrictions}+
				</span>
				{hover ? (
					<video
						height={200}
						width={400}
						autoPlay>
						<source
							src={video.videoPath}
							type="video/mp4"
						/>
					</video>
				) : (
					<img
						src={video.bannerPath}
						alt={video.title}
						height={50}
						width={200}
					/>
				)}
				<div
					className={styles.duration}>
					{formatSecondsToMMSS(video.duration)}
				</div>
			</div>
			<div className={styles.content}>
				<span className={styles.title}>
					{video.title}
				</span>
				<Link
					href={`/persons/${video.author.name}`}>
					<img
						src={
							video.author.avatarPath
						}
						alt={video.author.name}
						height={40}
						width={40}
					/>
					<div
						className={styles.userInfo}>
						<span
							className={
								styles.userName
							}>{video.author.name}</span>
						<span
							className={
								styles.timeAgo
							}>
							{String(
								dayjs(
									new Date(
										video.createdAt
                  ),
                  { locale: "ru-RU"}
								).fromNow()
							)}
						</span>
					</div>
				</Link>
			</div>
		</Link>
	)
}

export default CarouselItem