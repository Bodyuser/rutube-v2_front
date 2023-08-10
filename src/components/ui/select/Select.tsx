import { FC } from 'react'
import ReactSelect, { OnChangeValue } from 'react-select'
import makeAnimated from 'react-select/animated'

import { IOption, ISelectForm } from './select.interface'

import styles from "./Select.module.scss"

const animatedComponents = makeAnimated()

const SelectForm: FC<ISelectForm> = ({
	options,
	value,
	isMulti,
	className,
	error,
	placeholder,
}) => {
	const onChange = (
		newValue: OnChangeValue<
			IOption,
			boolean
		>
	) => {
		value.onChange(
			isMulti
				? (newValue as IOption[]).map(
						(item: IOption) =>
							item.value
				  )
				: (newValue as IOption).value
		)
	}

	const getValue = () => {
		if (value.value) {
			return isMulti
				? options.filter(
						(option: any) =>
							value.value.indexOf(
								option.value
							) >= 0
				  )
				: options.find(
						(option: any) =>
							option.value ===
							value.value
				  )
		} else {
			return isMulti ? [] : ("" as any)
		}
	}

	return (
		<div className={styles.select}>
			<ReactSelect
				value={getValue()}
				onChange={onChange}
				options={options}
				classNamePrefix="custom-select"
				isMulti={isMulti}
				placeholder={placeholder}
				components={animatedComponents}
				className={`${
					className ? className : ""
				}`}
			/>
			{error && <span>{error}</span>}
		</div>
	)
}

export default SelectForm
