import {
	IGlobalUser,
	IUserProfile,
} from "@/shared/types/user/user.types"

export interface IUserState {
	user: IUserProfile | null
	error: any
	isAuth: boolean
	isJoin: boolean
	isLoading: boolean
	socket: any
	following: IGlobalUser[] | null
	followers: IGlobalUser[] | null
}

export const userState: IUserState = {
	error: null,
	isAuth: true,
	isJoin: false,
	user: null,
	isLoading: false,
	socket: null,
	followers: null,
	following: null,
}
