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
}
