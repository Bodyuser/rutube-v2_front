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

	gender: 'male' | 'female'

	age: number

	country: string

	online: boolean

	role: UserRoleEnum

	typeAuth: TypeAuthEnum

	avatarPath: string

	bannerPath: string

	about: string

	activateLink: string

	isActivated: boolean

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

export interface IUserProfile extends Omit<IUser, "activateLink" | "code" | "password" | "resetLink"> {}
export interface IGlobalUser extends Omit<IUserProfile, "email" | "isActivated" | "typeAuth"> {}