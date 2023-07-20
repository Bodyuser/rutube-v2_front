import * as bootStrapIcons from "react-icons/bs"

export type IconType = keyof typeof bootStrapIcons

export interface IIcon {
  name: IconType
  onClick?: () => void
}