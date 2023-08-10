import {
	Dispatch,
	SetStateAction,
} from "react"

export interface ISearchItem {
	title: string
	setIsOpen: Dispatch<
		SetStateAction<boolean>
	>
}
