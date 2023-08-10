import { IUser } from "../user/user.types"
import { IVideo } from "../video/video.types"

export interface IComment {
	id: string

	createdAt: Date

  updatedAt: Date
  
	text: string

	video: IVideo

	type: 'comment' | 'reply-comment'

	author: IUser

	likeUsers: IUser[]

	disLikeUsers: IUser[]

	replyComments: IComment[]

	mainComment: IComment
}

export interface ICreateComment {
	text: string

	type: "comment" | "reply-comment"

	comment?: string
}

export interface IUpdateComment {
	text: string
}