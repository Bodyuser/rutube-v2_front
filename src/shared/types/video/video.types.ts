import { ICategory } from "../category/category.types"
import { IComment } from "../comment/comment.types"
import { IUser } from "../user/user.types"

export interface IVideo {
	id: string

	createdAt: Date

	updatedAt: Date

	title: string

	slug: string

	description: string

	videoPath: string

	bannerPath: string

	minAgeRestrictions: number

	duration: number

	countViews: number

	tags: string[]

	category: ICategory

	comments: IComment[]

	author: IUser

	likeUsers: IUser[]

	disLikeUsers: IUser[]
} 