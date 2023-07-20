import { FC } from 'react'

import styles from './Button.module.scss'
import { IButton } from './button.types'
import cn from "classnames"

const Button: FC<IButton> = ({title, onClick, disabled = false, secondary = false, type = "button"}) => {
  return (
		<button
			disabled={disabled}
			onClick={
				onClick ? onClick : () => {}
			}
      className={cn(styles.button, {
        [styles.secondary]: secondary
      })}
    type={type}>
			{title}
		</button>
	)
}

export default Button