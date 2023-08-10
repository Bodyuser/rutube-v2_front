import { IconType } from "../icon/icon.types"

export interface IButton {
	title: string
	onClick?: () => void
	disabled?: boolean
	icon: IconType
	type?:
		| "button"
		| "submit"
		| "reset"
		| undefined
}
