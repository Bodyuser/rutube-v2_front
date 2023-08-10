import { FC, memo } from "react"

import styles from "./Logo.module.scss"

import logo from "@/assets/images/logo.svg"
import Image from "next/image"
import Link from "next/link"

const Logo: FC = () => {
	return (
		<Link
			href="/"
			className={styles.logo}>
			<Image
				src={logo}
				alt="Viewer"
				height={24}
				width={98}
			/>
		</Link>
	)
}

export default memo(Logo)
