export interface IButton {
	title: string
	onClick?: () => void
	disabled?: boolean
	secondary?: boolean
	type?:
		| "button"
		| "submit"
		| "reset"
		| undefined
}