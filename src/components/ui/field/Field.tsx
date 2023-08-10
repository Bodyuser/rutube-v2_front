import { forwardRef } from "react"

import styles from "./Field.module.scss"
import { IField } from "./field.types"
import Icon from "../icon/Icon"

const Field = forwardRef<
	HTMLInputElement,
	IField
>(
	(
		{
			placeholder,
			error,
			icon,
			disabled = false,
			type = "button",
			style,
			typeInput = "text",
			...rest
		},
		ref
	) => {
		return (
			<div
				className={styles.field}
				style={style}>
				<div className={styles.main}>
					<input
						{...rest}
						ref={ref}
						type={typeInput}
						placeholder={placeholder}
					/>
					<button
						type={type}
						disabled={
							!!error || disabled
						}>
						<Icon name={icon} />
					</button>
				</div>
				{error && (
					<div className={styles.error}>
						{error}
					</div>
				)}
			</div>
		)
	}
)

Field.displayName = "Field"

export default Field
