import { FC, memo } from "react"

import styles from "./Navbar.module.scss"
import Logo from "./logo/Logo"
import NavbarMenu from "@/components/ui/navbar-menu/NavbarMenu"
import {
	navbarData,
	settingData,
} from "./navbar.data"
import CopyRight from "./copyright/CopyRight"
import { useNavbar } from "./useNavbar"

const Navbar: FC = () => {
	const {
		following,
		isAuth,
		categories,
	} = useNavbar()

	return (
		<div className={styles.navbar}>
			<Logo />
			<NavbarMenu
				items={navbarData}
				title="Меню"
			/>
			{!!categories?.length && (
				<NavbarMenu
					title="Категории"
					items={
						categories?.map(
							category => ({
								link: `/categories/${category.slug}`,
								title: category.title,
								imagePath:
									category.imagePath,
							})
						) || []
					}
				/>
			)}
			{isAuth && (
				<NavbarMenu
					title="Настройки"
					items={settingData}
				/>
			)}
			{isAuth &&
				!!following?.length && (
					<NavbarMenu
						title="Подписки"
						items={following.map(
							user => ({
								link: `/persons/${user.name}`,
								title: user.name,
								imagePath:
									user.avatarPath,
							})
						)}
					/>
				)}
			<CopyRight />
		</div>
	)
}

export default memo(Navbar)
