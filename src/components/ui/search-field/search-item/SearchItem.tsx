import { FC } from "react"

import styles from "./SearchItem.module.scss"
import { ISearchItem } from "./searchItem.types"
import { baseQuery } from "../useSearchField"
import { useRouter } from "next/router"
import Icon from "../../icon/Icon"

const SearchItem: FC<ISearchItem> = ({
	title,
	setIsOpen,
}) => {
	const { push } = useRouter()
	return (
		<button
			onClick={() => {
				const searchParams =
					new URLSearchParams(baseQuery)

				searchParams.set("query", title)

				setIsOpen(false)
				push(
					`/?${searchParams.toString()}`
				)
			}}
			className={styles.item}>
			<Icon name="BsArrowUpRight" />
			<span>{title}</span>
		</button>
	)
}

export default SearchItem
