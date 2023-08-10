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

	isPrivate: boolean

	tags: string[]

	category: ICategory

	comments: IComment[]

	author: IUser

	likeUsers: IUser[]

	disLikeUsers: IUser[]
}

export interface ICreateVideo {
	title: string

	slug: string

	description: string

	videoPath: string

	bannerPath: string

	category: string

	minAgeRestrictions: number

	duration: number

	tags?: string[]

	isPrivate: boolean
}

export interface IUpdateVideo {
	title: string

	slug: string

	description: string

	videoPath: string

	bannerPath: string

	category: string

	minAgeRestrictions: number

	duration: number

	tags?: string[]

	isPrivate: boolean
}
