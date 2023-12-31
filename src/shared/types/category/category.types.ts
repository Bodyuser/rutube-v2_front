import { IVideo } from "../video/video.types"

export interface ICategory {
	id: string

	createdAt: Date

	updatedAt: Date

	title: string

	imagePath: string

	slug: string

	videos: IVideo[]
}

export interface ICreateCategory {
	title: string

	imagePath: string

	slug: string
}

export interface IUpdateCategory {
	title: string

	imagePath: string

	slug: string
}
