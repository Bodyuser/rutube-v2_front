import { IconType } from "../icon/icon.types"
import {
	InputHTMLAttributes,
	CSSProperties,
} from "react"

export interface IField
	extends InputHTMLAttributes<HTMLInputElement> {
	placeholder: string
	error?: string
	disabled?: boolean
	typeInput?: string
	type?:
		| "button"
		| "submit"
		| "reset"
		| undefined
	icon: IconType
}
