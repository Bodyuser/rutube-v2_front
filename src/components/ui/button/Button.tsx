import { FC, memo } from "react"

import styles from "./Button.module.scss"
import { IButton } from "./button.types"
import Icon from "../icon/Icon"

const Button: FC<IButton> = ({
	title,
	onClick,
	disabled = false,
	icon,
	type = "button",
}) => {
	return (
		<button
			disabled={disabled}
			onClick={
				onClick ? onClick : () => {}
			}
			className={styles.button}
			type={type}>
			<Icon name={icon} />
			<span>{title}</span>
		</button>
	)
}

export default memo(Button)
