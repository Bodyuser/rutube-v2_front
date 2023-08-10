import { INavbarItem } from "@/components/ui/navbar-menu/navbar-item/navbarItem.types"

export const navbarData: INavbarItem[] =
	[
		{
			link: "/",
			title: "Главная",
			icon: "BsHouseFill",
		},
		{
			link: "/top",
			title: "Топ",
			icon: "BsRocketTakeoffFill",
		},
		{
			link: "/catalog",
			title: "Каталог",
			icon: "BsGridFill",
		},
	]

export const settingData: INavbarItem[] =
	[
		{
			link: "/profile",
			title: "Профиль",
			icon: "BsPersonFill",
		},
		{
			link: "/following",
			title: "Подписки",
			icon: "BsPersonPlusFill",
		},
	]
