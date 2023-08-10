import { IComment as ICom } from "@/shared/types/comment/comment.types"

export interface IComment {
	comment: ICom & {
		countLike: number
		countDisLike: number
		isLike?: boolean
		isDisLike?: boolean
	}
	videoId: string
	isReply?: boolean
}
