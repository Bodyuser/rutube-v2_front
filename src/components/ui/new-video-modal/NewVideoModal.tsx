import { FC, memo } from "react"

import styles from "./NewVideoModal.module.scss"
import { INewVideoModal } from "./newVideoModal.types"
import cn from "classnames"
import { useNewVideoModal } from "./useNewVideoModal"
import Field from "../field/Field"
import { Controller } from "react-hook-form"
import dynamic from "next/dynamic"
import SelectForm from "../select/Select"
import TagInput from "../tag-input/TagInput"
import Upload from "../upload/Upload"
import Button from "../button/Button"
import Icon from "../icon/Icon"
import { generateSlug } from "@/utils/slug/generateSlug"
const TextEditor = dynamic(
	() =>
		import("../text-editor/TextEditor"),
	{
		ssr: false,
	}
)

const NewVideoModal: FC<
	INewVideoModal
> = ({ isOpen, setIsOpen }) => {
	const {
		control,
		errors,
		handleSubmit,
		onSubmit,
		register,
		checkExistingSlug,
		categories,
		imageFile,
		imageUrl,
		setImageFile,
		setImageUrl,
		videoFile,
		videoUrl,
		setVideoFile,
		setVideoUrl,
		videoRef,
		progress,
		setValue,
		getValues,
	} = useNewVideoModal(
		isOpen,
		setIsOpen
	)
	return (
		<div
			className={cn(styles.modal, {
				[styles.open]: isOpen,
			})}>
			{progress !== 0 && (
				<div className={styles.main}>
					<div
						className={styles.progress}>
						<div
							style={{
								width: `${progress}%`,
							}}></div>
						<span>
							Загрузка {progress}...
						</span>
					</div>
				</div>
			)}
			<div className={styles.main}>
				<div
					onClick={() => {
						setIsOpen(false)
					}}>
					<Icon name="BsX" />
				</div>
				<h3>Новое видео</h3>
				<form
					onSubmit={handleSubmit(
						onSubmit
					)}>
					<Field
						{...register("title", {
							required:
								"Это поле обязательно",
						})}
						placeholder="Название"
						icon="BsPersonVideo2"
						autoComplete="off"
						error={
							errors.title?.message
						}
						style={{
							margin: "20px 0",
						}}
					/>
					<div
						style={{
							margin: "40px 0",
						}}
						className={styles.slug}>
						<Field
							{...register("slug", {
								required:
									"Это поле обязательно",
								validate:
									async slug => {
										const response =
											await checkExistingSlug(
												slug
											)
										if (
											response.data &&
											!response.data
												?.access
										) {
											return "Слаг занят"
										}
									},
							})}
							placeholder="Слаг"
							icon="BsLink45Deg"
							autoComplete="off"
							error={
								errors.slug?.message
							}
						/>
						<Button
							title="Сгенерировать"
							icon="BsInbox"
							type="button"
							onClick={() => {
								setValue(
									"slug",
									generateSlug(
										getValues("title")
									)
								)
							}}
						/>
					</div>
					<Controller
						name="description"
						control={control}
						render={({
							field: {
								value,
								onChange,
							},
						}) => (
							<TextEditor
								value={value}
								onChange={onChange}
								placeholder="Описание"
								type="video"
							/>
						)}
						rules={{
							required:
								"Это поле обязательно",
						}}
					/>
					<Controller
						name="minAgeRestrictions"
						control={control}
						defaultValue={0}
						render={({
							field,
							fieldState: { error },
						}) => (
							<SelectForm
								options={[
									{
										label: "0+",
										value: "0",
									},
									{
										label: "6+",
										value: 6,
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
								value={field}
								error={error?.message}
								placeholder="Возврастные ограничения"
							/>
						)}
						rules={{
							required:
								"Это поле обязательно",
						}}
					/>
					<Controller
						name="category"
						control={control}
						render={({
							field,
							fieldState: { error },
						}) => (
							<SelectForm
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
								value={field}
								error={error?.message}
								placeholder="Категория"
							/>
						)}
						rules={{
							required:
								"Это поле обязательно",
						}}
					/>
					<Controller
						name="isPrivate"
						control={control}
						defaultValue={false}
						render={({
							field,
							fieldState: { error },
						}) => (
							<SelectForm
								options={[
									{
										label: "Приватный",
										value: "true",
									},
									{
										label:
											"Не приватный",
										value: "false",
									},
								]}
								value={field}
								error={error?.message}
								placeholder="Приватность"
							/>
						)}
						rules={{
							required:
								"Это поле обязательно",
						}}
					/>

					<Controller
						name="tags"
						control={control}
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
								error={error?.message}
								placeholder="Теги"
							/>
						)}
						rules={{
							required:
								"Это поле обязательно",
						}}
					/>

					<Controller
						name="bannerPath"
						control={control}
						render={({
							field: {
								value,
								onChange,
							},
							fieldState: { error },
						}) => (
							<Upload
								fileUrl={imageUrl}
								setFile={setImageFile}
								setFileUrl={setImageUrl}
								accept="image/*"
								error={error?.message}
								placeholder="Баннер"
							/>
						)}
					/>
					<Controller
						name="videoPath"
						control={control}
						render={({
							field: {
								value,
								onChange,
							},
							fieldState: { error },
						}) => (
							<Upload
								fileUrl={videoUrl}
								setFile={setVideoFile}
								setFileUrl={setVideoUrl}
								accept="video/*"
								error={error?.message}
								placeholder="Видео"
								videoRef={videoRef}
							/>
						)}
					/>
					<Button
						icon="BsCameraVideo"
						title="Добавить видео"
						type="submit"
					/>
				</form>
			</div>

			<div
				className="overlay"
				style={{
					zIndex: "3",
				}}></div>
		</div>
	)
}

export default memo(NewVideoModal)
