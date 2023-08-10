import { IComment } from "../comment/comment.types"
import { INotification } from "../notification/notification.types"
import { IVideo } from "../video/video.types"
import { TypeAuthEnum } from "./enums/type-auth.enum"
import { UserRoleEnum } from "./enums/user-role.enum"

export interface IUser {
	id: string

	createdAt: Date

	updatedAt: Date

	email: string

	password: string

	name: string

	dateOfBirth: string

	gender: "male" | "female"

	age: number

	country: string

	role: UserRoleEnum

	typeAuth: TypeAuthEnum

	avatarPath: string

	bannerPath: string

	about: string

	activateLink: string

	isActivated: boolean

	isVerified: boolean

	resetLink: string

	code: number

	videos: IVideo[]

	likeVideos: IVideo[]

	disLikeVideos: IVideo[]

	comments: IComment[]

	likeComments: IComment[]

	disLikeComments: IComment[]

	notifications: INotification[]

	following: IUser[]

	followers: IUser[]
}

export interface IUserProfile
	extends Omit<
		IUser,
		| "activateLink"
		| "code"
		| "password"
		| "resetLink"
	> {}
export interface IGlobalUser
	extends Omit<
		IUserProfile,
		"email" | "isActivated" | "typeAuth"
	> {}

export interface IUpdateProfile {
	email?: string

	name: string

	country?: string

	dateOfBirth?: string

	password?: string

	currentPassword?: string

	about?: string

	gender?: string

	code?: number
}

export interface IUpdateAvatarPath {
	avatarPath: string
}

export interface IUpdateBannerPath {
	bannerPath: string
}