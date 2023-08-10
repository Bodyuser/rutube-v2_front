import { FC, useMemo } from "react"

import styles from "./Video.module.scss"
import VideoPlayer from "@/components/ui/video-player/VideoPlayer"
import { useRouter } from "next/router"
import {
	useGetSimilarVideosQuery,
	useGetVideoBySlugQuery,
	useToggleDisLikeVideoMutation,
	useToggleLikeVideoMutation,
} from "@/redux/api/videos.api"
import HTMLReactParser from "html-react-parser"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import Icon from "@/components/ui/icon/Icon"
import { useTypedSelector } from "@/hooks/useTypedSelector"
import { toastr } from "react-redux-toastr"
import Person from "@/components/ui/person/Person"
import Link from "next/link"
import {
	useCreateCommentMutation,
	useGetCommentsByVideoQuery,
} from "@/redux/api/comments.api"
import Comment from "./comment/Comment"
import {
	SubmitHandler,
	useForm,
} from "react-hook-form"
import { ICreateComment } from "@/shared/types/comment/comment.types"
import Field from "@/components/ui/field/Field"
import Button from "@/components/ui/button/Button"
import VideoComp from "@/components/ui/video/Video"

dayjs.extend(relativeTime)

const Video: FC = () => {
	const { query } = useRouter()

	const slug = useMemo(
		() => query.slug,
		[query.slug]
	)

	const { data: video } =
		useGetVideoBySlugQuery(slug!, {
			skip: !slug,
		})

	const { data: comments } =
		useGetCommentsByVideoQuery(
			video?.id!,
			{
				skip: !video?.id,
			}
		)

	const [likeVideo] =
		useToggleLikeVideoMutation()
	const [disLikeVideo] =
		useToggleDisLikeVideoMutation()

	const isAuth = useTypedSelector(
		state => state.users.isAuth
	)

	const [createComment] =
		useCreateCommentMutation()

	const {
		register,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm<ICreateComment>({
		mode: "onChange",
	})

	const onSubmit: SubmitHandler<
		ICreateComment
	> = async data => {
		await createComment({
			...data,
			videoId: video?.id!,
			type: "comment"
		})

		reset()
	}

	const { data: similarVideos } = useGetSimilarVideosQuery(video?.id!, {
		skip: !video?.id
	})

	if (video) {
		return (
			<div className={styles.video}>
				<div>
					<VideoPlayer
						src={video?.videoPath!}
					/>
					<div className={styles.info}>
						<span>{video.title}</span>
						<div>
							<span>Описание: </span>
							<span>
								{HTMLReactParser(
									video.description
								)}
							</span>
						</div>
						<div>
							<span>Категория: </span>
							<span>
								<Link
									href={`/categories/${video.category.slug}`}>
									{video.category.title}
								</Link>
							</span>
						</div>
						<div>
							<span>
								{video.countViews}{" "}
								просмотров
							</span>
							<span>
								{dayjs(
									new Date(
										video.createdAt
									)
								).fromNow()}
							</span>
							<span>
								{
									video.minAgeRestrictions
								}
								+
							</span>
						</div>
					</div>
					<Person user={video.author} />

					<div
						className={styles.actions}>
						<div
							onClick={async () => {
								if (isAuth) {
									await likeVideo(
										video.id
									)
								} else {
									toastr.error(
										"Нет доступа",
										"Сначала авторизуйтесь"
									)
								}
							}}>
							<Icon
								name={
									Object(
										video
									).hasOwnProperty(
										"isLike"
									)
										? video.isLike
											? "BsHandThumbsUpFill"
											: "BsHandThumbsUp"
										: "BsHandThumbsUp"
								}
							/>
							<span>
								{video.countLike}
							</span>
						</div>
						<div
							onClick={async () => {
								if (isAuth) {
									await disLikeVideo(
										video.id
									)
								} else {
									toastr.error(
										"Нет доступа",
										"Сначала авторизуйтесь"
									)
								}
							}}>
							<Icon
								name={
									Object(
										video
									).hasOwnProperty(
										"isDisLike"
									)
										? video.isDisLike
											? "BsHandThumbsDownFill"
											: "BsHandThumbsDown"
										: "BsHandThumbsDown"
								}
							/>
							<span>
								{video.countDisLike}
							</span>
						</div>
					</div>

					<div
						className={styles.comment}>
						<div>
							<form
								onSubmit={handleSubmit(
									onSubmit
								)}>
								<Field
									{...register("text", {
										required:
											"Это поле обязательно",
									})}
									placeholder="Текст"
									icon="BsTextParagraph"
									error={
										errors.comment
											?.message
									}
									autoComplete="off"
								/>
								<Button
									title="Отправить"
									icon="BsSend"
									type="submit"
								/>
							</form>
						</div>
						<div>
							{!!comments &&
								!!comments.length &&
								comments.map(
									comment => (
										<Comment
											comment={comment}
											videoId={video.id}
										/>
									)
								)}
						</div>
					</div>
				</div>
				<div>
					{!!similarVideos?.length &&
						similarVideos.map(video => (
							<VideoComp video={video} />
						))}
				</div>
			</div>
		)
	}

	return null
}

export default Video
