import { FC } from "react"

import styles from "./CopyRight.module.scss"

const CopyRight: FC = () => {
	return (
		<div className={styles.copyright}>
			Ахметшин Фаиль &copy; 2023
		</div>
	)
}

export default CopyRight
