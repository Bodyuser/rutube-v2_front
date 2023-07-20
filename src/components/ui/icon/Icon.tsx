import { FC } from 'react'
import { IIcon } from './icon.types'
import * as BootStrapIcons from "react-icons/bs"
import { useRenderToClient } from '@/hooks/useRenderToClient'

const Icon: FC<IIcon> = ({name, onClick}) => {
  const { isRender } =
		useRenderToClient()

	const Icon = BootStrapIcons[name]
	if (isRender) return <Icon onClick={onClick ? onClick : () => {}} />
	return null
}

export default Icon