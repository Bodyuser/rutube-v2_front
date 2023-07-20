import {
	FC,
	useMemo,
	useState,
} from "react"

import styles from "./Video.module.scss"
import { useRouter } from "next/router"
import {
	useMutation,
	useQuery,
} from "@tanstack/react-query"
import { VideosService } from "@/services/videos/videos.service"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import Icon from "@/components/ui/icon/Icon"
import { UserService } from "@/services/users/users.service"
import { useTypedSelector } from "@/hooks/useTypedSelector"
import Button from "@/components/ui/button/Button"
import { useActions } from "@/hooks/useActions"
import parse from "html-react-parser"
import { Player } from "video-react"
import VideoPlayer from "@/components/ui/video-player/VideoPlayer"
import Link from "next/link"
import { CommentsService } from "@/services/comments/comments.service"
import {
	Controller,
	SubmitHandler,
	useForm,
} from "react-hook-form"
import { ICreateComment } from "@/services/comments/comments.types"
import { stripHtml } from "string-strip-html"
import dynamic from "next/dynamic"

dayjs.extend(relativeTime)

const TextEditor = dynamic(
	() =>
		import(
			"@/components/ui/text-editor/TextEditor"
		),
	{ ssr: false }
)

const Video: FC = () => {
	const { query, replace } = useRouter()

	const { GetProfile } = useActions()

	const slug = useMemo(
		() => String(query.slug),
		[query]
	)

	const {
		data: video,
		refetch: refetchVideo,
	} = useQuery(
		["get video", slug],
		() =>
			VideosService.getVideoBySlug(
				slug
			),
		{
			enabled: !!slug.length,
		}
	)

	const { data: user, refetch } =
		useQuery(
			[
				"get person",
				video?.author.name,
			],
			() =>
				UserService.getUser(
					String(video?.author.name)
				),
			{
				enabled: !!video?.author.name,
			}
		)

	const { user: profile, isLoading } =
		useTypedSelector(
			state => state.users
		)

	const { mutateAsync } = useMutation(
		["follow unfollow on user"],
		(id: string) =>
			UserService.followingUnFollowing(
				id
			),
		{
			async onSuccess() {
				await GetProfile()
				await refetch()
			},
		}
	)

	const { mutateAsync: likeVideo } =
		useMutation(
			["like video", video?.id],
			() =>
				VideosService.toggleLikeVideo(
					String(video?.id)
				),
			{
				async onSuccess() {
					await GetProfile()
					await refetchVideo()
				},
			}
		)

	const { mutateAsync: disLikeVideo } =
		useMutation(
			["dis like video", video?.id],
			() =>
				VideosService.toggleDisLikeVideo(
					String(video?.id)
				),
			{
				async onSuccess() {
					await GetProfile()
					await refetchVideo()
				},
			}
		)

	const {
		data: comments,
		refetch: refetchComments,
	} = useQuery(
		["get comments", video?.slug],
		() =>
			CommentsService.getCommentsByVideo(
				String(video?.id)
			),
		{
			enabled: !!video?.id,
		}
	)

	const { mutateAsync: createComment } =
		useMutation(
			["create comment"],
			(data: ICreateComment) =>
				CommentsService.createComment(
					data,
					String(video?.id)
				)
		)

	const {
		handleSubmit,
		control,
		reset,
	} = useForm<ICreateComment>({
		mode: "onChange",
	})

	const {
		handleSubmit: handleSubmitReply,
		control: controlReply,
		reset: resetReply,
	} = useForm<ICreateComment>({
		mode: "onChange",
	})

	const onSubmit: SubmitHandler<
		ICreateComment
	> = async data => {
		await createComment({
			type: "comment",
			text: data.text,
		})
		reset()
		await refetchComments()
	}

	const [commentId, setCommentId] =
		useState<any>(null)

	const onSubmitReply: SubmitHandler<
		ICreateComment
	> = async data => {
		await createComment({
			type: "reply-comment",
			text: data.text,
			comment: commentId,
		})
		resetReply()
		await refetchComments()
	}

	const [openReply, setOpenReply] =
		useState(false)

	const {
		mutateAsync: updateViewVideo,
	} = useMutation(
		["update count view"],
		() =>
			VideosService.viewVideo(
				String(video?.id)
			)
	)

	return (
		<div
			className={styles.videoWrapper}>
			<div
				className={
					styles.videoContainer
				}>
				<div className={styles.video}>
					<div>
						<VideoPlayer
							src={
								video?.videoPath || ""
							}
              func={updateViewVideo}
						/>
					</div>
					<div>
						<span
							className={styles.title}>
							{video?.title}
						</span>
						<div
							className={
								styles.otherOptions
							}>
							<span>
								{
									video?.minAgeRestrictions
								}
								+
							</span>
							<span>
								{dayjs(
									new Date(
										video?.createdAt!
									)
								).fromNow()}
							</span>
							<span>
								{video?.countViews}{" "}
								просмотров
							</span>
						</div>
						<div
							className={
								styles.actions
							}>
							<div>
								<div>
									<Icon
										onClick={async () => {
											await likeVideo()
										}}
										name={
											profile?.likeVideos.some(
												video =>
													video.slug ===
													slug
											)
												? "BsHandThumbsUpFill"
												: "BsHandThumbsUp"
										}
									/>
									<span>
										{" "}
										{
											video?.likeUsers
												.length
										}
									</span>
								</div>
								<div>
									<Icon
										onClick={async () => {
											await disLikeVideo()
										}}
										name={
											profile?.disLikeVideos.some(
												video =>
													video.slug ===
													slug
											)
												? "BsHandThumbsDownFill"
												: "BsHandThumbsDown"
										}
									/>
									<span>
										{" "}
										{
											video
												?.disLikeUsers
												.length
										}
									</span>
								</div>
							</div>
						</div>
						<hr />
						<div
							className={styles.info}>
							<Link
								href={`/persons/${user?.name}`}>
								<div
									className={
										styles.avatar
									}>
									<img
										src={
											user?.avatarPath
										}
										alt={user?.name}
									/>
								</div>
								<div
									className={
										styles.name
									}>
									<span>
										{user?.name}
									</span>
									<span>
										{
											user?.followers
												.length
										}{" "}
										подписчиков
									</span>
								</div>
							</Link>
							<div
								className={styles.btn}>
								{profile?.id !==
									user?.id && (
									<Button
										secondary={
											profile?.following?.some(
												u =>
													u.id ===
													user?.id
											)
												? true
												: false
										}
										title={
											profile?.following.some(
												u =>
													u.id ===
													user?.id
											)
												? "Отписаться"
												: "Подписаться"
										}
										onClick={async () => {
											if (!isLoading) {
												if (
													profile?.id
												) {
													await mutateAsync(
														String(
															user?.id
														)
													)
												} else {
													const params =
														new URLSearchParams(
															Object(
																query
															)
														)
													params.set(
														"auth",
														"true"
													)
													replace(
														`/?${params.toString()}`
													)
												}
											}
										}}
									/>
								)}
							</div>
						</div>
						<div
							className={styles.desc}>
							{parse(
								String(
									video?.description
								)
							)}
						</div>
						<div
							className={
								styles.category
							}>
							Категория:
							<Link
								href={`/categories/${video?.category.slug}`}>
								{video?.category.title}
							</Link>
						</div>
					</div>
				</div>
				<div
					className={styles.comments}>
					<h4>
						{comments?.length}{" "}
						Комментариев
					</h4>
					<div
						className={styles.create}>
						<form
							onSubmit={handleSubmit(
								onSubmit
							)}>
							<div>
								<span>
									Добавить комментарий
								</span>
								<Controller
									control={control}
									name="text"
									render={({
										field: {
											onChange,
											value,
										},
										fieldState: {
											error,
										},
									}) => (
										<TextEditor
											placeholder=""
											full={false}
											onChange={
												onChange
											}
											value={value}
											error={error}
										/>
									)}
									rules={{
										validate: {
											required: v =>
												(v &&
													stripHtml(v)
														.result
														.length >
														0) ||
												"Text is required!",
										},
									}}
								/>
							</div>
							<Button
								title="Отправить"
								type="submit"
							/>
						</form>
					</div>
					<div
						className={
							styles.commentsContainer
						}>
						{comments?.length
							? comments.map(
									comment => (
										<div
											key={comment.id}>
											<div>
												<Link
													href={`/persons/${comment.author.name}`}>
													<img
														src={
															comment
																.author
																.avatarPath
														}
														alt={
															comment
																.author
																.name
														}
													/>
												</Link>
												<div>
													<Link
														href={`/persons/${comment.author.name}`}>
														<span>
															{
																comment
																	.author
																	.name
															}
														</span>
														<span>
															{dayjs(
																new Date(
																	comment?.createdAt
																)
															).fromNow()}
														</span>
													</Link>
													<div>
														{parse(
															comment.text
														)}
													</div>
													<div>
														<Icon name="BsHandThumbsUp" />
														<Icon name="BsHandThumbsDown" />
														<span
															onClick={() => {
																setOpenReply(
																	!openReply
																)
																setCommentId(
																	comment.id
																)
															}}>
															Ответить
														</span>
													</div>
												</div>
											</div>
											{openReply &&
												commentId ===
													comment.id && (
													<div
														className={
															styles.replyForm
														}>
														<form
															onSubmit={handleSubmitReply(
																onSubmitReply
															)}>
															<div>
																<span>
																	Добавить
																	reply
																	комментарий
																</span>
																<Controller
																	control={
																		controlReply
																	}
																	name="text"
																	render={({
																		field:
																			{
																				onChange,
																				value,
																			},
																		fieldState:
																			{
																				error,
																			},
																	}) => (
																		<TextEditor
																			placeholder=""
																			full={
																				false
																			}
																			onChange={
																				onChange
																			}
																			value={
																				value
																			}
																			error={
																				error
																			}
																		/>
																	)}
																	rules={{
																		validate:
																			{
																				required:
																					v =>
																						(v &&
																							stripHtml(
																								v
																							)
																								.result
																								.length >
																								0) ||
																						"Text is required!",
																			},
																	}}
																/>
															</div>
															<Button
																title="Отправить"
																type="submit"
															/>
														</form>
													</div>
												)}
											<div>
												{comment
													.replyComments
													.length
													? comment.replyComments.map(
															rep => (
																<div>
																	<Link
																		href={`/persons/${rep.author.name}`}>
																		<img
																			src={
																				rep
																					.author
																					.avatarPath
																			}
																			alt={
																				rep
																					.author
																					.name
																			}
																		/>
																	</Link>
																	<div>
																		<Link
																			href={`/persons/${rep.author.name}`}>
																			<span>
																				{
																					rep
																						.author
																						.name
																				}
																			</span>
																			<span>
																				{dayjs(
																					new Date(
																						rep?.createdAt
																					)
																				).fromNow()}
																			</span>
																		</Link>
																		<div>
																			{parse(
																				rep.text
																			)}
																		</div>
																		<div>
																			<Icon name="BsHandThumbsUp" />
																			<Icon name="BsHandThumbsDown" />
																		</div>
																	</div>{" "}
																</div>
															)
													  )
													: null}
											</div>
										</div>
									)
							  )
							: null}
					</div>
				</div>
			</div>
			<div
				className={
					styles.otherVideos
				}></div>
		</div>
	)
}

export default Video
