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


export enum DateEnum {
	ALL = "all",
	TODAY = "today",
	WEEK = "week",
	MONTH = "month",
	YEAR = "year",
}

export enum DurationEnum {
	ALL = "all",
	SHORT = "short",
	MEDIUM = "medium",
	LONG = "long",
	MOVIE = "movie",
}

export enum OrderEnum {
	NEWEST = "newest",
	OLDEST = "oldest",
	VIEWS = "views",
}

export interface IGetAllVideos {
	date: DateEnum

	duration: DurationEnum

	order: OrderEnum

	query: string
}
