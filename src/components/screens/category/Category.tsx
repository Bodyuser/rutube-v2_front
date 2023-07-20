import { FC, useMemo } from 'react'

import styles from './Category.module.scss'
import { useQuery } from '@tanstack/react-query'
import { CategoriesService } from '@/services/categories/categories.service'
import { VideosService } from '@/services/videos/videos.service'
import { useRouter } from 'next/router'
import CarouselItem from '@/components/ui/carousel-videos/carousel-item/CarouselItem'

const Category: FC = () => {
  const { query } = useRouter()

  const slug = useMemo(() => query.slug, [query])

  const {data: category} = useQuery(
		["get category", slug],
		() =>
			CategoriesService.getCategory(
				String(slug)
			),
		{ enabled: !!slug?.length }
  )
  
 const { data: videos } = useQuery(
		["get video by category", slug],
		() =>
			VideosService.getVideosByCategory(
				String(category?.id)
			),
		{ enabled: !!category?.id }
 )


  return (
		<div className={styles.category}>
			<h2>{category?.title}</h2>
			<div>
				{videos?.length ? (
					videos.map(video => (
						<CarouselItem
							key={video.id}
							video={video}
						/>
					))
				) : (
					<div className={styles.empty}>Видео не найдено</div>
				)}
			</div>
		</div>
	)
}

export default Category