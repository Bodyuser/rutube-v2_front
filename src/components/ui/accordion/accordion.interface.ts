import { Dispatch } from "react"
import { IconType } from "../icon/icon.types"

export interface IAccordion {
	title: string
	isOpen: boolean
	setIsOpen: Dispatch<boolean>
	icon?: IconType
}
