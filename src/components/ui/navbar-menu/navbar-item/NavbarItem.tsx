import { FC } from "react"

import styles from "./NavbarItem.module.scss"
import { INavbarItem } from "./navbarItem.types"
import { useRouter } from "next/router"
import Image from "next/image"
import Icon from "../../icon/Icon"
import cn from "classnames"
import Link from "next/link"

const NavbarItem: FC<INavbarItem> = ({
	link,
	title,
	icon,
	imagePath,
}) => {
	const { asPath } = useRouter()

	return (
		<Link
			href={link}
			className={cn(styles.item, {
				[styles.active]:
					asPath === link,
			})}>
			{imagePath ? (
				<Image
					src={imagePath}
					alt={title}
					height={24}
					width={24}
				/>
			) : (
				<Icon name={icon!} />
			)}
			<span>{title}</span>
		</Link>
	)
}

export default NavbarItem
