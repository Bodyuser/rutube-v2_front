import { IGlobalUser } from "@/shared/types/user/user.types"

export interface IPerson {
	user: IGlobalUser & {
		countFollowers?: number
		isSubscribe?: boolean
	}
}
