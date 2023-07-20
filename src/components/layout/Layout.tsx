import {
	FC,
	PropsWithChildren,
} from "react"
import Header from "./header/Header"

import styles from "./Layout.module.scss"

const Layout: FC<PropsWithChildren> = ({
	children,
}) => {
	return (
		<>
			<Header />
			<div className={styles.main}>{children}</div>
		</>
	)
}

export default Layout
