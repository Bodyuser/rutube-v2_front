import { FC } from "react"

import styles from "./Category.module.scss"
import Video from "@/components/ui/video/Video"
import { useRouter } from "next/router"
import { useGetCategoryQuery } from "@/redux/api/categories.api"
import { useGetVideosByCategoryQuery } from "@/redux/api/videos.api"

const Category: FC = () => {
	const { query } = useRouter()

	const { data: category } =
		useGetCategoryQuery(
			String(query.slug!),
			{
				skip: !query.slug,
			}
		)

	const { data: videos } =
		useGetVideosByCategoryQuery(
			category?.slug!,
			{
				skip: !category?.title,
			}
		)

	return (
		<div className={styles.top}>
			<h2>{category?.title}</h2>
			<div>
				{videos?.length ? (
					videos.map(video => (
						<Video video={video} />
					))
				) : (
					<span>Здесь нет видео</span>
				)}
			</div>
		</div>
	)
}

export default Category
