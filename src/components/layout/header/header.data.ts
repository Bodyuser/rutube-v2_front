import {IconType} from "@/components/ui/icon/icon.types"

export interface IHeaderItem {
  title: string
  icon: IconType
  link: string
}

export const headerData: IHeaderItem[] = [
  {
    icon: "BsHouseDoor",
    title: "Главная",
    link: "/"
  },
  {
    icon: "BsRocketTakeoff",
    title: "В топе",
    link: "/top"
  },
  {
    icon: "BsGrid",
    title: "Каталог",
    link: "/categories"
  },
  {
    icon: "BsPlayBtn",
    title: "Подписки",
    link: "/following"
  },
]