import {
	FC,
	useEffect,
	useState,
} from "react"

import styles from "./UpdateProfile.module.scss"
import {
	Controller,
	SubmitHandler,
	useForm,
} from "react-hook-form"
import { IUpdateProfile } from "@/shared/types/user/user.types"
import { useUpdateProfileMutation } from "@/redux/api/users.api"
import Field from "@/components/ui/field/Field"
import { emailPattern } from "@/shared/regexp"
import { useTypedSelector } from "@/hooks/useTypedSelector"
import { TypeAuthEnum } from "@/shared/types/user/enums/type-auth.enum"
import validator from "validator"
import SelectForm from "@/components/ui/select/Select"
import { countries } from "@/constants/countries.constant"
import dynamic from "next/dynamic"
import DatePickerComponent from "@/components/ui/date-picker/DatePicker"
import Button from "@/components/ui/button/Button"
import Accordion from "@/components/ui/accordion/Accordion"
import { useRouter } from "next/router"
const TextEditor = dynamic(
	() =>
		import(
			"@/components/ui/text-editor/TextEditor"
		),
	{
		ssr: false,
	}
)

const UpdateProfile: FC = () => {
	const {
		register,
		control,
		formState: { errors },
		reset,
		handleSubmit,
		setValue,
	} = useForm<IUpdateProfile>({
		mode: "onChange",
	})

	const [isCode, setIsCode] =
		useState(false)

	const [
		isEditPassword,
		setIsEditPassword,
	] = useState(false)

	const [updateProfile] =
		useUpdateProfileMutation()

	const { replace } = useRouter()

	const onSubmit: SubmitHandler<
		IUpdateProfile
	> = data => {
		if (!isEditPassword) {
			delete data.password
			delete data.currentPassword
		}
		updateProfile(data)

		reset()

		replace("/profile")
	}

	const user = useTypedSelector(
		state => state.users.user
	)

	useEffect(() => {
		if (user) {
			if (
				user.typeAuth ===
				TypeAuthEnum.DEFAULT
			) {
				setValue("email", user.email)
			}
			setValue("name", user.name)
			if (user.country) {
				setValue(
					"country",
					user.country
				)
			}
			if (user.gender) {
				setValue("gender", user.gender)
			}
		}
	}, [user])

	return (
		<div className={styles.update}>
			<h2>Обновление пользователя</h2>

			<form
				onSubmit={handleSubmit(
					onSubmit
				)}>
				{user?.typeAuth ===
					TypeAuthEnum.DEFAULT && (
					<>
						<Field
							{...register("email", {
								required:
									"Это поле обязательно",
								pattern: {
									value: emailPattern,
									message:
										"Это поле должно быть правильным",
								},
							})}
							icon="BsEnvelopeFill"
							placeholder="Почта"
							error={
								errors.email?.message
							}
							autoComplete="off"
							typeInput="email"
						/>
						{isCode && (
							<Field
								{...register("code", {
									required:
										"Это поле обязательно",
								})}
								icon="BsCode"
								placeholder="Код"
								error={
									errors.code?.message
								}
								autoComplete="off"
								typeInput="number"
							/>
						)}
						<Accordion
							isOpen={isEditPassword}
							setIsOpen={
								setIsEditPassword
							}
							title="Поменять пароль">
							<Field
								{...register(
									"currentPassword",
									{
										required:
											isEditPassword &&
											"Это поле обязательно",
										validate: val => {
											if (
												val &&
												!validator.isStrongPassword(
													val
												) &&
												isEditPassword
											) {
												return "Это поле должно быть правильным"
											}
										},
									}
								)}
								icon="BsKeyFill"
								placeholder="Текущий пароль"
								error={
									errors.currentPassword
										?.message
								}
								autoComplete="off"
								typeInput="password"
							/>
							<Field
								{...register(
									"password",
									{
										required:
											isEditPassword &&
											"Это поле обязательно",
										validate: val => {
											if (
												val &&
												!validator.isStrongPassword(
													val
												) &&
												isEditPassword
											) {
												return "Это поле должно быть правильным"
											}
										},
									}
								)}
								icon="BsKeyFill"
								placeholder="Пароль"
								error={
									errors.password
										?.message
								}
								autoComplete="off"
								typeInput="password"
							/>
						</Accordion>
					</>
				)}
				<Field
					{...register("name", {
						required:
							"Это поле обязательно",
					})}
					icon="BsPersonFill"
					placeholder="Имя"
					error={errors.name?.message}
					autoComplete="off"
					typeInput="string"
				/>
				<Controller
					control={control}
					name="country"
					render={({
						field,
						fieldState: { error },
					}) => (
						<SelectForm
							placeholder="Страна"
							options={Object.values(
								countries
							).map(i => ({
								label: i,
								value: i,
							}))}
							value={field}
							error={error?.message}
						/>
					)}
				/>
				<Controller
					control={control}
					name="gender"
					render={({
						field,
						fieldState: { error },
					}) => (
						<SelectForm
							placeholder="Пол"
							options={[
								{
									label: "Мужской",
									value: "male",
								},
								{
									label: "Женский",
									value: "female",
								},
							]}
							value={field}
							error={error?.message}
						/>
					)}
				/>
				<Controller
					control={control}
					name="about"
					render={({
						field: { value, onChange },
						fieldState: { error },
					}) => (
						<TextEditor
							onChange={onChange}
							placeholder="О вас"
							type="video"
							value={value || ""}
							error={error}
						/>
					)}
				/>
				<Controller
					control={control}
					name="dateOfBirth"
					render={({
						field,
						fieldState: { error },
					}) => (
						<DatePickerComponent
							value={field}
							error={error?.message}
							placeholder="Дата рождения"
						/>
					)}
				/>

				<Button
					icon="BsSend"
					title="Сохранить"
					type="submit"
				/>
			</form>
		</div>
	)
}

export default UpdateProfile
