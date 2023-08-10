import { FC } from "react"

import styles from "./Catalog.module.scss"
import { useGetCategoriesQuery } from "@/redux/api/categories.api"
import CatalogItem from "./catalog-item/CatalogItem"

const Catalog: FC = () => {
	const { data: categories } =
		useGetCategoriesQuery(null)

	return (
		<div className={styles.catalog}>
			<h2>Каталог</h2>
			<div>
				{categories?.length ? (
					categories.map(category => (
						<CatalogItem
							category={category}
							key={category.id}
						/>
					))
				) : (
					<span>
						Здесь нет категорий
					</span>
				)}
			</div>
		</div>
	)
}

export default Catalog
