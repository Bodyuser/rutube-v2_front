import {
	FC,
	PropsWithChildren,
} from "react"
import Header from "./header/Header"

import styles from "./Layout.module.scss"
import Navbar from "./navbar/Navbar"

const Layout: FC<PropsWithChildren> = ({
	children,
}) => {
	return (
		<div className={styles.layout}>
			<Navbar />
			<div className={styles.main}>
				<Header />
				<div className={styles.content}>
					{children}
				</div>
			</div>
		</div>
	)
}

export default Layout
