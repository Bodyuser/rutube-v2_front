
export interface IUpdateProfile {
	email?: string

	name: string

	country?: string

	dateOfBirth?: string

	password?: string
    
	currentPassword?: string

	avatarPath: string

	bannerPath: string

	about?: string

	gender?: string

	code?: number
}
