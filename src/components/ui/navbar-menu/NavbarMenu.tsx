import { FC, memo } from "react"

import styles from "./NavbarMenu.module.scss"
import { INavbarMenu } from "./navbarMenu.types"
import NavbarItem from "./navbar-item/NavbarItem"

const NavbarMenu: FC<INavbarMenu> = ({
	items,
	title,
}) => {
	if (!items.length) {
		return null
	}

	return (
		<div className={styles.menu}>
			<span>{title}</span>
			{items.map(i => (
				<NavbarItem
					key={i.title}
					{...i}
				/>
			))}
			<hr />
		</div>
	)
}

export default memo(NavbarMenu)
