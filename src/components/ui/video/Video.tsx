import {
	FC,
	useState,
	useEffect,
} from "react"

import styles from "./Video.module.scss"
import { IVideo } from "./video.types"
import Image from "next/image"
import { formatSecondsToMMSS } from "@/utils/time/formatSecondsToMMSS"
import Icon from "../icon/Icon"
import dayjs from "dayjs"

import relativeTime from "dayjs/plugin/relativeTime"
import Link from "next/link"
dayjs.extend(relativeTime)

const Video: FC<IVideo> = ({
	video,
}) => {
	const [isFocus, setIsFocus] =
		useState(false)

	return (
		<div className={styles.video}>
			<Link
				href={`/videos/${video.slug}`}>
				<div
					className={styles.image}
					onMouseOver={() => {
						setIsFocus(true)
					}}
					onMouseLeave={() => {
						setIsFocus(false)
					}}>
					<Image
						src={
							isFocus
								? [
										...video.bannerPath
											.split("/")
											.splice(
												0,
												video.bannerPath.split(
													"/"
												).length - 1
											),
										"preview.gif",
								  ].join("/")
								: video.bannerPath
						}
						alt={video.title}
						height={256}
						width={368}
					/>
					<span>
						{formatSecondsToMMSS(
							video.duration
						)}
					</span>
				</div>
				<div className={styles.info}>
					<h4>{video.title}</h4>
					<div>
						<span>
							{video.countViews} views
						</span>
						<Icon name="BsDot" />
						<span>
							{dayjs(
								new Date(
									video.createdAt
								)
							).fromNow()}
						</span>
					</div>
				</div>
			</Link>
			<Link
				href={`/persons/${video.author.name}`}
				className={styles.author}>
				<Image
					src={video.author.avatarPath}
					alt={video.author.name}
					height={32}
					width={32}
				/>
				<h4>{video.author.name}</h4>
			</Link>
		</div>
	)
}

export default Video
