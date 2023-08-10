import {
	Dispatch,
	SetStateAction,
} from "react"

export interface INewVideoModal {
	isOpen: boolean
	setIsOpen: Dispatch<
		SetStateAction<boolean>
	>
}
