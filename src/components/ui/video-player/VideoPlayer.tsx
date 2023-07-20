import {
	FC,
	useRef,
	useState,
	useEffect,
} from "react"

import styles from "./VideoPlayer.module.scss"
import Icon from "../icon/Icon"

interface IVideoPlayer {
	src: string
	func?: () => void
}

const VideoPlayer: FC<IVideoPlayer> = ({
	src,
	func,
}) => {
	const videoRef = useRef<any>(null)
	const videoTimelineRef =
		useRef<any>(null)
	const progressBarRef =
		useRef<any>(null)
	const volumeBtnRef = useRef<any>(null)
	const containerRef = useRef<any>(null)
	const playPauseBtnRef =
		useRef<any>(null)
	const currentVidTimeRef =
		useRef<any>(null)
	const fullScreenBtnRef =
		useRef<any>(null)

	const pipBtnRef = useRef<any>(null)

	const speedOptionsRef =
		useRef<any>(null)

	const speedBtnRef = useRef<any>(null)

	const skipForwardRef =
		useRef<any>(null)

	const skipBackwardRef =
		useRef<any>(null)

	const videoDurationRef =
		useRef<any>(null)

	const volumeSliderRef =
		useRef<any>(null)

	const [duration, setDuration] =
		useState(0)

	const [isPlay, setIsPlay] =
		useState(false)

	const formatTime = (time: number) => {
		let seconds: any = Math.floor(
				time % 60
			),
			minutes: any =
				Math.floor(time / 60) % 60,
			hours: any = Math.floor(
				time / 3600
			)

		seconds =
			seconds < 10
				? `0${seconds}`
				: seconds
		minutes =
			minutes < 10
				? `0${minutes}`
				: minutes
		hours =
			hours < 10 ? `0${hours}` : hours

		if (hours == 0) {
			return `${minutes}:${seconds}`
		}
		return `${hours}:${minutes}:${seconds}`
	}

	const draggableProgressBar = (
		e: any
	) => {
		let timelineWidth =
			videoTimelineRef.current
				.clientWidth
		progressBarRef.current.style.width = `${e.offsetX}px`
		videoRef.current.currentTime =
			(e.offsetX / timelineWidth) *
			videoRef.current.duration
		currentVidTimeRef.current.innerText =
			formatTime(
				videoRef.current.currentTime
			)
	}

	const playPauseVideo = () => {
		if (videoRef.current.paused) {
			videoRef.current.play()
		} else {
			videoRef.current.pause()
		}
	}

	useEffect(() => {


		const timeout = setTimeout(() => {
			if (func && isPlay) {
				func()
			}
		}, duration)

		return () => clearTimeout(timeout)
	}, [duration, isPlay])

	useEffect(() => {
		containerRef.current.addEventListener(
			"mouseover",
			() => {
				containerRef.current.classList.add(
					"show-controls"
				)
			}
		)

		containerRef.current.addEventListener(
			"mouseleave",
			() => {
				containerRef.current.classList.remove(
					"show-controls"
				)
			}
		)

		videoTimelineRef.current.addEventListener(
			"mousemove",
			(e: any) => {
				let timelineWidth =
					videoTimelineRef.current
						.clientWidth
				let offsetX = e.offsetX
				let percent = Math.floor(
					(offsetX / timelineWidth) *
						videoRef.current.duration
				)
				const progressTime =
					videoTimelineRef.current.querySelector(
						"span"
					)
				offsetX =
					offsetX < 20
						? 20
						: offsetX >
						  timelineWidth - 20
						? timelineWidth - 20
						: offsetX
				progressTime.style.left = `${offsetX}px`
				progressTime.innerText =
					formatTime(percent)
			}
		)

		videoTimelineRef.current.addEventListener(
			"click",
			(e: any) => {
				let timelineWidth =
					videoTimelineRef.current
						.clientWidth
				videoRef.current.currentTime =
					(e.offsetX / timelineWidth) *
					videoRef.current.duration
			}
		)

		videoRef.current.addEventListener(
			"timeupdate",
			(e: any) => {
				let { currentTime, duration } =
					e.target

				setDuration(duration)
				let percent =
					(currentTime / duration) * 100
				progressBarRef.current.style.width = `${percent}%`
				currentVidTimeRef.current.innerText =
					formatTime(currentTime)
			}
		)

		videoRef.current.addEventListener(
			"loadeddata",
			() => {
				videoDurationRef.current.innerText =
					formatTime(
						videoRef.current.duration
					)
			}
		)

		volumeBtnRef.current.addEventListener(
			"click",
			() => {
				if (
					!volumeBtnRef.current.classList.contains(
						"fa-volume-high"
					)
				) {
					videoRef.current.volume = 0.5
					volumeBtnRef.current.classList.replace(
						"fa-volume-xmark",
						"fa-volume-high"
					)
				} else {
					videoRef.current.volume = 0.0
					volumeBtnRef.current.classList.replace(
						"fa-volume-high",
						"fa-volume-xmark"
					)
				}
				volumeSliderRef.current.value =
					videoRef.current.volume
			}
		)

		volumeSliderRef.current.addEventListener(
			"input",
			(e: any) => {
				videoRef.current.volume =
					e.target.value
				if (e.target.value == 0) {
					return volumeBtnRef.current.classList.replace(
						"fa-volume-high",
						"fa-volume-xmark"
					)
				}
				volumeBtnRef.current.classList.replace(
					"fa-volume-xmark",
					"fa-volume-high"
				)
			}
		)

		speedOptionsRef.current
			.querySelectorAll("li")
			.forEach((option: any) => {
				option.addEventListener(
					"click",
					() => {
						videoRef.current.playbackRate =
							option.dataset.speed
						speedOptionsRef.current
							.querySelector(".active")
							.classList.remove(
								"active"
							)
						option.classList.add(
							"active"
						)
					}
				)
			})

		fullScreenBtnRef.current.addEventListener(
			"click",
			() => {
				containerRef.current.classList.toggle(
					"fullscreen"
				)
				if (
					document.fullscreenElement
				) {
					fullScreenBtnRef.current.classList.replace(
						"fa-compress",
						"fa-expand"
					)
					return document.exitFullscreen()
				}
				fullScreenBtnRef.current.classList.replace(
					"fa-expand",
					"fa-compress"
				)
				containerRef.current.requestFullscreen()
			}
		)

		pipBtnRef.current.addEventListener(
			"click",
			() =>
				videoRef.current
					.requestPictureInPicture()
					.catch((e: any) =>
						console.log(e)
					)
		)

		skipBackwardRef.current.addEventListener(
			"click",
			() =>
				(videoRef.current.currentTime -= 5)
		)
		skipForwardRef.current.addEventListener(
			"click",
			() =>
				(videoRef.current.currentTime += 5)
		)

		videoRef.current.addEventListener(
			"play",
			() => {
				playPauseBtnRef.current.classList.replace(
					"fa-play",
					"fa-pause"
				)
				setIsPlay(true)
			}
		)
		videoRef.current.addEventListener(
			"pause",
			() => {
				playPauseBtnRef.current.classList.replace(
					"fa-pause",
					"fa-play"
				)
				setIsPlay(false)
			}
		)

		// videoTimelineRef.current.addEventListener(
		// 	"mousedown",
		// 	() =>
		// 		videoTimelineRef.current.addEventListener(
		// 			"mousemove",
		// 			draggableProgressBar
		// 		)
		// )
		// document.addEventListener(
		// 	"mouseup",
		// 	() =>
		// 		videoTimelineRef.current.removeEventListener(
		// 			"mousemove",
		// 			draggableProgressBar
		// 		)
		// )

		speedOptionsRef.current.addEventListener(
			"click",
			() => {
				speedOptionsRef.current.classList.remove(
					"show"
				)
			}
		)
	}, [])

	const openSpedMenu = () => {
		speedOptionsRef.current.classList.toggle(
			"show"
		)
	}

	return (
		<div className={styles.player}>
			<div
				ref={containerRef}
				className="container">
				<div className="wrapper">
					<div
						ref={videoTimelineRef}
						className="video-timeline">
						<div className="progress-area">
							<span>00:00</span>
							<div
								ref={progressBarRef}
								className="progress-bar"></div>
						</div>
					</div>
					<ul className="video-controls">
						<li className="options left">
							<button className="volume">
								<i
									ref={volumeBtnRef}
									className="fa-solid fa-volume-high"></i>
							</button>
							<input
								ref={volumeSliderRef}
								type="range"
								min="0"
								max="1"
								step="any"
							/>
							<div className="video-timer">
								<p
									ref={
										currentVidTimeRef
									}
									className="current-time">
									00:00
								</p>
								<p className="separator">
									{" "}
									/{" "}
								</p>
								<p
									ref={videoDurationRef}
									className="video-duration">
									00:00
								</p>
							</div>
						</li>
						<li className="options center">
							<button className="skip-backward">
								<i
									ref={skipBackwardRef}
									className="fas fa-backward"></i>
							</button>
							<button
								onClick={() =>
									playPauseVideo()
								}
								className="play-pause">
								<i
									className="fas fa-play"
									ref={
										playPauseBtnRef
									}></i>
							</button>
							<button className="skip-forward">
								<i
									ref={skipForwardRef}
									className="fas fa-forward"></i>
							</button>
						</li>
						<li className="options right">
							<div className="playback-content">
								<button className="playback-speed">
									<span
										ref={speedBtnRef}
										onClick={() =>
											openSpedMenu()
										}
										className="material-symbols-rounded">
										<Icon name="BsSpeaker" />
									</span>
								</button>
								<ul
									ref={speedOptionsRef}
									className="speed-options">
									<li data-speed="2">
										2x
									</li>
									<li data-speed="1.5">
										1.5x
									</li>
									<li
										data-speed="1"
										className="active">
										Normal
									</li>
									<li data-speed="0.75">
										0.75x
									</li>
									<li data-speed="0.5">
										0.5x
									</li>
								</ul>
							</div>
							<button className="pic-in-pic">
								<span
									ref={pipBtnRef}
									className="material-icons">
									picture_in_picture_alt
								</span>
							</button>
							<button className="fullscreen">
								<i
									ref={fullScreenBtnRef}
									className="fa-solid fa-expand"></i>
							</button>
						</li>
					</ul>
				</div>
				<video
					autoPlay
					ref={videoRef}
					src={src}></video>
			</div>
		</div>
	)
}

export default VideoPlayer
