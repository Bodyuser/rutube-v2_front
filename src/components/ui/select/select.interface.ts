import { ControllerRenderProps } from 'react-hook-form'
import { Options } from 'react-select'

export interface IOption {
	label: string
	value: any
}

export interface ISelectForm {
	value: ControllerRenderProps<any, any>
	isMulti?: boolean
	options: Options<IOption>
	className?: string
	error?: string
	placeholder: string
}
