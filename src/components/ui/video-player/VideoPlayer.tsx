import {
	FC,
	useState,
	useRef,
	createRef,
	useEffect,
} from "react"
import Hls from "hls.js"
import Plyr from "plyr"

import styles from "./VideoPlayer.module.scss"

interface IVideoPlayer {
	src: string
	func?: () => void
}

const VideoPlayer: FC<IVideoPlayer> = ({
	src,
	func,
}) => {
	const ref = createRef<any>()

	const [span, setSpan] =
		useState<any>(null)

	const [options, setOptions] =
		useState<any>(null)

	function updateQuality(
		newQuality: any
	) {
		if (
			newQuality === 0 &&
			(window as any).hls?.currentLevel
		) {
			;(
				window as any
			).hls.currentLevel = -1
		} else {
			;(
				window as any
			).hls?.levels?.forEach(
				(
					level: any,
					levelIndex: any
				) => {
					if (
						level.height === newQuality
					) {
						;(
							window as any
						).hls.currentLevel =
							levelIndex
					}
				}
			)
		}
	}

	useEffect(() => {
		if (!Hls.isSupported()) {
			ref.current.src = src
		} else {
			const hls = new Hls()

			hls.on(
				Hls.Events.MANIFEST_PARSED,
				function (event, data) {
					const availableQualities =
						hls.levels.map(
							l => l.height
						)
					availableQualities.unshift(0)

					setOptions({
						quality: {
							default: 0,
							options:
								availableQualities,
							forced: true,
							onChange: (e: any) =>
								updateQuality(e),
						},
						i18n: {
							qualityLabel: {
								0: "Auto",
							},
						},
					})

					hls.on(
						Hls.Events.LEVEL_SWITCHED,
						function (event, data) {
							if (
								hls.autoLevelEnabled
							) {
								setSpan({
									...span,
									innerHTML: `AUTO (${
										hls.levels[
											data.level
										].height
									}p)`,
								})
							} else {
								setSpan({
									...span,
									innerHTML: `AUTO`,
								})
							}
						}
					)
				}
			)

			hls?.loadSource(src)
			;(window as any).hls = hls
			hls.attachMedia(ref.current)
		}
	}, [src])

	useEffect(() => {
		if (options) {
			const player = new Plyr(
				ref.current,
				options
			)
		}
	}, [options])

	return (
		<div>
			<video
				crossOrigin=""
				playsInline
				ref={ref}></video>
		</div>
	)
}

export default VideoPlayer
