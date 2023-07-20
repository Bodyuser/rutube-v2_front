import { NextPage } from 'next'

export type TypeRoles = {
	isOnlyUser?: boolean
	isOnlyAdmin?: boolean
	isOnlyOwner?: boolean
}

export type NextPageAuth<P = {}> = NextPage<P> & TypeRoles

export interface TypeComponentAuthField {
	Component: TypeRoles
}
