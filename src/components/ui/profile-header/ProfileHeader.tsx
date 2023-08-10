import {
	FC,
	memo,
	useEffect,
	useState,
} from "react"

import styles from "./ProfileHeader.module.scss"
import Button from "../button/Button"
import Image from "next/image"
import Icon from "../icon/Icon"
import { useTypedSelector } from "@/hooks/useTypedSelector"
import { useRouter } from "next/router"
import Field from "../field/Field"
import { useProfileHeader } from "./useProfileHeader"
import { emailPattern } from "@/shared/regexp"
import validator from "validator"
import Link from "next/link"

const ProfileHeader: FC = () => {
	const { isAuth, user } =
		useTypedSelector(
			state => state.users
		)

	const [isAuthOpen, setIsAuthOpen] =
		useState(false)

	const { query, replace, pathname } =
		useRouter()

	const {
		errors,
		handleSubmit,
		onSubmit,
		register,
		setType,
		type,
	} = useProfileHeader()

	useEffect(() => {
		if (
			query.auth &&
			query.auth === "true"
		) {
			setIsAuthOpen(true)
		}
	}, [query.auth])

	return (
		<div className={styles.profile}>
			{isAuth ? (
				<Link
					href={"/profile"}
					className={styles.user}>
					<Image
						src={user?.avatarPath!}
						alt={user?.name!}
						width={40}
						height={40}
					/>
					<div>
						<span>{user?.name}</span>
					</div>
				</Link>
			) : (
				<div className={styles.auth}>
					<Button
						title="Войти и зарегистрироваться"
						icon="BsDoorOpenFill"
						type="button"
						onClick={() =>
							setIsAuthOpen(true)
						}
					/>
					{isAuthOpen && (
						<div
							className={styles.modal}>
							<div
								onClick={() => {
									const searchParams =
										new URLSearchParams(
											// @ts-ignore
											Object.entries(
												query
											)
										)
									searchParams.delete(
										"auth"
									)
									replace(
										`${pathname}?${searchParams.toString()}`
									)
									setIsAuthOpen(false)
								}}>
								<Icon name="BsX" />
							</div>
							<h3>
								{type === "login"
									? "Вход"
									: type === "register"
									? "Регистрация"
									: "Сброс пароля"}
							</h3>
							<form
								onSubmit={handleSubmit(
									onSubmit
								)}>
								<Field
									{...register(
										"email",
										{
											required:
												"Это поле обязательно",
											pattern: {
												value:
													emailPattern,
												message:
													"Это поле должно быть правильным",
											},
										}
									)}
									placeholder="Почта"
									icon="BsEnvelope"
									autoComplete="off"
									typeInput="email"
									error={
										errors.email
											?.message
									}
								/>
								{type !== "reset" && (
									<Field
										{...register(
											"password",
											{
												required:
													"Это поле обязательно",
												validate:
													value => {
														if (
															!validator.isStrongPassword(
																value
															)
														) {
															return "Это поле должно быть правильным"
														}
													},
											}
										)}
										placeholder="Пароль"
										icon="BsKeyFill"
										autoComplete="off"
										typeInput="password"
										error={
											errors.password
												?.message
										}
									/>
								)}
								<Button
									title={
										type === "login"
											? "Вход"
											: type ===
											  "register"
											? "Регистрация"
											: "Сброс пароля"
									}
									type="submit"
									icon={
										type === "reset"
											? "BsTrashFill"
											: "BsDoorOpenFill"
									}
								/>
								<div>
									{type === "login" && (
										<>
											<button
												onClick={() =>
													setType(
														"register"
													)
												}
												type="button">
												Регистрация
											</button>
											<button
												type="button"
												onClick={() =>
													setType(
														"reset"
													)
												}>
												Сброс пароля
											</button>
										</>
									)}
									{type ===
										"register" && (
										<>
											<button
												type="button"
												onClick={() =>
													setType(
														"login"
													)
												}>
												Вход
											</button>
											<button
												type="button"
												onClick={() =>
													setType(
														"reset"
													)
												}>
												Сброс пароля
											</button>
										</>
									)}
									{type === "reset" && (
										<>
											<button
												type="button"
												onClick={() =>
													setType(
														"login"
													)
												}>
												Вход
											</button>
											<button
												type="button"
												onClick={() =>
													setType(
														"register"
													)
												}>
												Регистрация
											</button>
										</>
									)}
								</div>
							</form>
						</div>
					)}
					{isAuthOpen && (
						<div
							className="overlay"
							style={{
								zIndex: 4,
							}}></div>
					)}
				</div>
			)}
		</div>
	)
}

export default memo(ProfileHeader)
