import { NextPage } from 'next'

export type TypeRoles = {
	isOnlyUser?: boolean
	isOnlyAdmin?: boolean
	isOnlyOwner?: boolean
}

export type Seo = {
	title?: string
	description?: string
}

export type NextPageSeo<P = {}> =
	NextPage<P> & Seo

export type NextPageAuth<P = {}> =
	NextPage<P> & TypeRoles & Seo

export interface TypeComponentAuthField {
	Component: TypeRoles & Seo
}
