import { FC, useState } from "react"

import styles from "./CreateCategory.module.scss"
import {
	Controller,
	SubmitHandler,
	useForm,
} from "react-hook-form"
import { ICreateCategory } from "@/services/categories/categories.types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { CategoriesService } from "@/services/categories/categories.service"
import Button from "@/components/ui/button/Button"
import Upload from "@/components/ui/upload/Upload"
import { useUpload } from "@/hooks/useUpload"
import { generateSlug } from "@/utils/slug/generateSlug"
import { toastr } from "react-redux-toastr"
import { ToastError } from "@/utils/toatsr-error/ToastrError"

const CreateCategory: FC = () => {
	const {
		register,
		formState: { errors },
		reset,
		handleSubmit,
		control,
    setValue,
    getValues
	} = useForm<ICreateCategory>({
		mode: "onChange",
	})

  const queryClient = useQueryClient()

	const { mutateAsync } = useMutation(
		["create category"],
		(data: ICreateCategory) =>
			CategoriesService.createCategory(
				data
      ),
    {
      onSuccess() {
        toastr.success("Создание категории", "Вы успешно создали категорию")
      },
      onError(error) {
        ToastError(error, "Создание категории")
      }
    }
	)

	const {
		mutateAsync: checkExistingSlug,
	} = useMutation(
		["check existing slug category"],
		(slug: string) =>
			CategoriesService.checkExistingSLug(
				slug
			)
	)

	const { uploadFile } = useUpload(
		"image",
		"categories",
	)

	const [file, setFile] =
		useState<any>(null)

	const [fileUrl, setFileUrl] =
		useState("")

	const onSubmit: SubmitHandler<
		ICreateCategory
	> = async data => {
		await uploadFile(file).then(
			async imagePath => {
				if (imagePath) {
					await mutateAsync({
						...data,
						imagePath,
					})
          await queryClient.invalidateQueries(
						{
							queryKey: [
								"get categories",
							],
						}
					)
					reset()
					setFileUrl("")
				}
			}
		)
	}

	return (
		<div className={styles.create}>
			<h2>Создание категории</h2>
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
						{errors.title?.message && (
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
										if (value.length) {
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
					<Controller
						control={control}
						name="imagePath"
						render={({
							field,
							fieldState: { error },
						}) => (
							<Upload
								error={error?.message}
								setFile={setFile}
								fileUrl={fileUrl}
								setFileUrl={setFileUrl}
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
	)
}

export default CreateCategory
