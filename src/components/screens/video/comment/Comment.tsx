import { FC, useState } from "react"

import styles from "./Comment.module.scss"
import { IComment } from "./comment.types"
import {
	useCreateCommentMutation,
	useGetReplyCommentsByCommentQuery,
	useToggleDisLikeCommentMutation,
	useToggleLikeCommentMutation,
} from "@/redux/api/comments.api"
import Person from "@/components/ui/person/Person"
import Icon from "@/components/ui/icon/Icon"
import { useTypedSelector } from "@/hooks/useTypedSelector"
import { ICreateComment } from "@/shared/types/comment/comment.types"
import {
	SubmitHandler,
	useForm,
} from "react-hook-form"
import Button from "@/components/ui/button/Button"
import Field from "@/components/ui/field/Field"

const Comment: FC<IComment> = ({
	comment,
	videoId,
	isReply = false,
}) => {
	const [likeComment] =
		useToggleLikeCommentMutation()
	const [disLikeComment] =
		useToggleDisLikeCommentMutation()

	const isAuth = useTypedSelector(
		state => state.users.isAuth
	)

	const [createComment] =
		useCreateCommentMutation()

	const [
		openReplyComments,
		setOpenReplyComments,
	] = useState(false)

	const { data: comments } =
		useGetReplyCommentsByCommentQuery(
			comment?.id!,
			{
				skip:
					!comment?.id ||
					!openReplyComments,
			}
		)

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
			videoId,
			type: "reply-comment",
			comment: comment?.id!,
		})

		reset()
	}

	const [isOpen, setIsOpen] =
		useState(false)

	return (
		<div className={styles.comment}>
			<Person user={comment.author} />
			<span>{comment.text}</span>
			<div>
				<div
					onClick={async () => {
						if (isAuth) {
							await likeComment(
								comment.id
							)
						}
					}}>
					<Icon
						name={
							Object(
								comment
							).hasOwnProperty("isLike")
								? comment.isLike
									? "BsHandThumbsUpFill"
									: "BsHandThumbsUp"
								: "BsHandThumbsUp"
						}
					/>
					<span>
						{comment.countLike}
					</span>
				</div>
				<div
					onClick={async () => {
						if (isAuth) {
							await disLikeComment(
								comment.id
							)
						}
					}}>
					<Icon
						name={
							Object(
								comment
							).hasOwnProperty(
								"isDisLike"
							)
								? comment.isDisLike
									? "BsHandThumbsDownFill"
									: "BsHandThumbsDown"
								: "BsHandThumbsDown"
						}
					/>
					<span>
						{comment.countDisLike}
					</span>
				</div>
			</div>

			{!isReply && (
				<>
					<div
						onClick={() =>
							setOpenReplyComments(
								!openReplyComments
							)
						}>
						{openReplyComments
							? "Закрыть"
							: "Показать ответы"}
					</div>
					{openReplyComments ? (
						!!comments?.length ? (
							comments.map(comment => (
								<Comment
									comment={comment}
									videoId={videoId}
									isReply
								/>
							))
						) : (
							<span>
								Здесь ничего нет
							</span>
						)
					) : null}
					<div
						onClick={() =>
							setIsOpen(!isOpen)
						}>
						{isOpen
							? "Закрыть"
							: "Ответить"}
					</div>

					{isOpen && (
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
					)}
				</>
			)}
		</div>
	)
}

export default Comment
