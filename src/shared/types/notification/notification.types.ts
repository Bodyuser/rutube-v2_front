import { IComment } from "../comment/comment.types"
import { IUser } from "../user/user.types"
import { IVideo } from "../video/video.types"

export interface INotification {
	id: string

	createdAt: Date

	updatedAt: Date

	type:
		| "reply-to-comment"
		| "upload-video"
		| "comment-to-video"
		| "strange-entrance"

	text: string

	url: string

	read: boolean

	user: IUser

	video?: IVideo

	comment?: IComment
}
