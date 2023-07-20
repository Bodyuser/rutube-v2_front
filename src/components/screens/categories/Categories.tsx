import { FC } from "react"

import styles from "./Categories.module.scss"
import { useQuery } from "@tanstack/react-query"
import { CategoriesService } from "@/services/categories/categories.service"
import Image from "next/image"
import Link from "next/link"

const Categories: FC = () => {
	const { data: categories } = useQuery(
		["get categories"],
		() =>
			CategoriesService.getCategories()
	)

	return (
		<div className={styles.categories}>
			{categories?.length
				? categories.map(category => (
						<Link
							href={`/categories/${category.slug}`}
							key={category.id}>
							<img
								src={category.imagePath}
								alt={category.title}
							/>
							<span>
								{category.title}
							</span>
						</Link>
				  ))
				: null}
		</div>
	)
}

export default Categories
