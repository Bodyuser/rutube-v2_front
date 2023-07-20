import {
	FC,
	useState,
	useRef,
} from "react"

import styles from "./Studio.module.scss"
import {
	useMutation,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query"
import { VideosService } from "@/services/videos/videos.service"
import { useTypedSelector } from "@/hooks/useTypedSelector"
import CarouselItem from "@/components/ui/carousel-videos/carousel-item/CarouselItem"
import {
	Controller,
	SubmitHandler,
	useForm,
} from "react-hook-form"
import { ICreateVideo } from "@/services/videos/videos.types"
import Button from "@/components/ui/button/Button"
import { generateSlug } from "@/utils/slug/generateSlug"
import Upload from "@/components/ui/upload/Upload"
import { ToastError } from "@/utils/toatsr-error/ToastrError"
import { useUpload } from "@/hooks/useUpload"
import { toastr } from "react-redux-toastr"
import dynamic from "next/dynamic"
import Select from "@/components/ui/select/Select"
import { CategoriesService } from "@/services/categories/categories.service"
import TagInput from "@/components/ui/tag-input/TagInput"
import { stripHtml } from "string-strip-html"

const TextEditor = dynamic(
	() =>
		import(
			"@/components/ui/text-editor/TextEditor"
		),
	{ ssr: false }
)

const Studio: FC = () => {
	const {
		register,
		formState: { errors },
		handleSubmit,
		setValue,
		getValues,
		control,
		reset,
	} = useForm<ICreateVideo>({
		mode: "onChange",
	})

	const handleDelete = (i: number) => {
		setValue(
			"tags",
			getValues("tags")?.filter(
				(tag: any, index: number) =>
					index !== i
			)
		)
	}

	const handleAddition = (tag: any) => {
		setValue("tags", [
			...getValues("tags")!,
			tag.text,
		])
	}

	const user = useTypedSelector(
		state => state.users.user
	)

	const { data: videos } = useQuery(
		["get videos by profile"],
		() =>
			VideosService.getVideosByProfile(),
		{
			enabled: !!user?.id,
		}
	)

	const { data: categories } = useQuery(
		["get categories"],
		() =>
			CategoriesService.getCategories(),
		{
			enabled: !!user?.id,
		}
	)

	const { mutateAsync } = useMutation(
		["create video"],
		(data: ICreateVideo) =>
			VideosService.createVideo(data),
		{
			onSuccess() {
				toastr.success(
					"Создание видео",
					"Вы успешно создали видео"
				)
			},
			onError(error) {
				ToastError(
					error,
					"Создание видео"
				)
			},
		}
	)

	const [banner, setBanner] =
		useState<any>(null)
	const [video, setVideo] =
		useState<any>(null)

	const [bannerUrl, setBannerUrl] =
		useState("")
	const [videoUrl, setVideoUrl] =
		useState("")

	const { uploadFile: uploadImage } =
		useUpload("image", "videos/banners")

	const { uploadFile: uploadVideo } =
		useUpload("video", "videos/videos")

	const queryClient = useQueryClient()

	const videoRef =
		useRef<HTMLVideoElement>(null)

	const onSubmit: SubmitHandler<
		ICreateVideo
	> = async data => {
		Promise.all([
			await uploadImage(banner),
			await uploadVideo(video),
		]).then(async response => {
			if (response[0] && response[1]) {
				await mutateAsync({
					...data,
					bannerPath: response[0],
					videoPath: response[1],
					duration: Math.round(
						Number(
							videoRef.current?.duration
						)
					),
				})
				await queryClient.invalidateQueries(
					{
						queryKey: [
							"get videos by profile",
						],
					}
				)
				reset()
				setVideoUrl("")
				setBannerUrl("")
			}
		})
	}

	const {
		mutateAsync: checkExistingSlug,
	} = useMutation(
		["check existing slug video"],
		(slug: string) =>
			VideosService.checkExistingSlug(
				slug
			)
	)

	return (
		<div className={styles.studio}>
			<h2>Студия</h2>
			<div className={styles.create}>
				<h2>Создать видео</h2>
				<form
					onSubmit={handleSubmit(
						onSubmit
					)}>
					<div>
						<div>
							<span>
								Введите название
							</span>
							<input
								{...register("title", {
									required:
										"This field is required",
								})}
								type="text"
								autoComplete="off"
							/>
							{errors.title
								?.message && (
								<span>
									{errors.title.message}
								</span>
							)}
						</div>
					</div>
					<div>
						<div>
							<span>Введите слаг</span>
							<input
								{...register("slug", {
									required:
										"This field is required",
									validate:
										async value => {
											if (
												value.length
											) {
												const response =
													await checkExistingSlug(
														value
													)

												if (
													!response.access
												) {
													return response.message
												}
											}
										},
								})}
								autoComplete="off"
								type="text"
							/>
							{errors.slug?.message && (
								<span>
									{errors.slug.message}
								</span>
							)}
						</div>

						<Button
							title="Сгенирировать слаг"
							onClick={() =>
								setValue(
									"slug",
									generateSlug(
										getValues("title")
									)
								)
							}
						/>
					</div>
					<div>
						<div>
							<span>
								Введите описание
							</span>
							<Controller
								control={control}
								defaultValue=""
								name="description"
								render={({
									field: {
										onChange,
										value,
									},
									fieldState: { error },
								}) => (
									<TextEditor
										error={error}
										placeholder=""
										value={value}
										full
										onChange={onChange}
									/>
								)}
								rules={{
									validate: {
										required: v =>
											(v &&
												stripHtml(v)
													.result
													.length >
													0) ||
											"Description is required!",
									},
								}}
							/>
						</div>
					</div>
					<div>
						<div>
							<span>
								Выберите ограничения по
								возрасту
							</span>
							<Controller
								control={control}
								name="minAgeRestrictions"
								defaultValue={0}
								rules={{
									required:
										"This field is required",
								}}
								render={({
									field,
									fieldState: { error },
								}) => (
									<Select
										value={field}
										error={
											error?.message
										}
										options={[
											{
												label: "0+",
												value: 0,
											},
											{
												label: "6+",
												value: 6,
											},
											{
												label: "12+",
												value: 12,
											},
											{
												label: "16+",
												value: 16,
											},
											{
												label: "18+",
												value: 18,
											},
										]}
									/>
								)}
							/>
						</div>
					</div>
					<div>
						<div>
							<span>
								Выберите категорию
							</span>
							<Controller
								control={control}
								name="category"
								rules={{
									required:
										"This field is required",
								}}
								render={({
									field,
									fieldState: { error },
								}) => (
									<Select
										value={field}
										error={
											error?.message
										}
										options={
											categories?.map(
												category => ({
													label:
														category.title,
													value:
														category.slug,
												})
											) || []
										}
									/>
								)}
							/>
						</div>
					</div>
					<div>
						<div>
							<span>Введите тэги</span>
							<Controller
								control={control}
								name="tags"
								rules={{
									required:
										"This field is required",
								}}
								render={({
									field: {
										value,
										onChange,
									},
									fieldState: { error },
								}) => (
									<TagInput
										onChange={onChange}
										value={value || []}
										error={
											error?.message
										}
									/>
								)}
							/>
						</div>
					</div>
					<div>
						<Controller
							control={control}
							name="bannerPath"
							render={({
								field,
								fieldState: { error },
							}) => (
								<Upload
									error={error?.message}
									setFile={setBanner}
									fileUrl={bannerUrl}
									placeholder="Загрузить баннер"
									setFileUrl={
										setBannerUrl
									}
								/>
							)}
						/>
					</div>
					<div>
						<Controller
							control={control}
							name="videoPath"
							render={({
								field,
								fieldState: { error },
							}) => (
								<Upload
									error={error?.message}
									setFile={setVideo}
									fileUrl={videoUrl}
									videoRef={videoRef}
									accept="video/*"
									placeholder="Загрузить видео"
									setFileUrl={
										setVideoUrl
									}
								/>
							)}
						/>
					</div>
					<Button
						type="submit"
						title={"Создать"}
						disabled={
							!!errors.title?.message ||
							!!errors.slug?.message
						}
					/>
				</form>
			</div>
			<div className={styles.videos}>
				<h2>Ваши видео</h2>
				<div>
					{videos?.length
						? videos.map(video => (
								<CarouselItem
									key={video.id}
									video={video}
								/>
						  ))
						: null}
				</div>
			</div>
		</div>
	)
}

export default Studio
