import { FC } from "react"

import styles from "./CatalogItem.module.scss"
import { ICatalogItem } from "./catalogItem.types"
import Image from "next/image"
import Link from "next/link"

const CatalogItem: FC<ICatalogItem> = ({
	category,
}) => {
	return (
		<Link
			href={`/categories/${category.slug}`}
			className={styles.item}>
			<Image
				src={category.imagePath}
				alt={category.title}
				height={100}
				width={100}
			/>
			<span>{category.title}</span>
		</Link>
	)
}

export default CatalogItem
