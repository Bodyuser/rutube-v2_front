import {
	FC,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react"

import styles from "./Header.module.scss"
import Icon from "@/components/ui/icon/Icon"
import Link from "next/link"
import Button from "@/components/ui/button/Button"
import cn from "classnames"
import { headerData } from "./header.data"
import { useRouter } from "next/router"
import useOutsideClick from "@/hooks/useOutsideClick"
import facebookLogo from "@/assets/images/facebook.png"
import googleLogo from "@/assets/images/google.png"
import Image from "next/image"
import { useActions } from "@/hooks/useActions"
import { emailPattern } from "@/shared/regexp"
import validator from "validator"
import { useGoogleLogin } from "@react-oauth/google"
import FacebookLogin from "react-facebook-login"
import { toastr } from "react-redux-toastr"
import {
	useMutation,
	useQuery,
} from "@tanstack/react-query"
import { VideosService } from "@/services/videos/videos.service"
import { CategoriesService } from "@/services/categories/categories.service"
import { useTypedSelector } from "@/hooks/useTypedSelector"
import {
	useForm,
	SubmitHandler,
} from "react-hook-form"
import {
	ILogin,
	IRegister,
} from "@/services/auth/auth.types"
import { NotificationsService } from "@/services/notifications/notifications.service"

const baseQuery =
	"&date=all&duration=all&order=views"

const Header: FC = () => {
	const [open, setOpen] =
		useState(false)

	const [type, setType] = useState<
		"login" | "register"
	>("login")

	const {
		Login,
		Register,
		AuthByFacebook,
		AuthByGoogle,
	} = useActions()

	const {
		register,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm<ILogin | IRegister>({
		mode: "onChange",
	})

	const {
		register: registerSearch,
		handleSubmit: handleSubmitSearch,
		setValue,
		watch,
		getValues,
	} = useForm<{ query: string }>({
		mode: "onChange",
	})

	const {
		isOpen: notificationOpen,
		setIsOpen: setNotificationOpen,
		ref: notificationRef,
	} = useOutsideClick(false)

	const {
		isOpen: authOpen,
		setIsOpen: setAuthOpen,
		ref: authRef,
	} = useOutsideClick(false)

	const [searchOpen, setSearchOpen] =
		useState(false)

	useEffect(() => {
		if (searchOpen) {
			setOpen(false)
		}
	}, [searchOpen])

	const {
		push,
		pathname,
		query: searchParams,
	} = useRouter()

	const user = useTypedSelector(
		state => state.users.user
	)

	const onSubmitSearch: SubmitHandler<{
		query: string
	}> = data => {
		push(
			`/?query=${data.query}${baseQuery}`
		)
		setSearchOpen(false)
	}

	useEffect(() => {
		if (
			searchParams &&
			searchParams.auth &&
			searchParams.auth === "true" && !user?.id
		) {
			setAuthOpen(true)
		}
	}, [searchParams])

	const onSubmit: SubmitHandler<
		ILogin | IRegister
	> = data => {
		if (type === "login") {
			Login(data)
		} else {
			Register(data)
		}
		reset()
	}

	const googleLogin = useGoogleLogin({
		onSuccess: async tokenResponse => {
			AuthByGoogle(
				tokenResponse.access_token
			)
		},
	})

	const [searchList, setSearchList] =
		useState<string[]>([])

	const { refetch, data } = useQuery(
		["get search list"],
		() => VideosService.getSearchList(),
		{
			enabled: false,
			onSuccess(data) {
				if (
					searchParams &&
					searchParams.query
				) {
					setSearchList(
						data.filter(item =>
							item.includes(
								String(
									searchParams.query
								).toLowerCase()
							)
						)
					)
				} else {
					setSearchList(data)
				}
			},
		}
	)

	const {
		data: notifications,
		refetch: refetchNotifications,
	} = useQuery(
		["get notifications"],
		() =>
			NotificationsService.getNotificationsByProfile(),
		{
			enabled: !!user?.id,
		}
	)

	useEffect(() => {
		const watcher = watch(
			({ query }) => {
				if (data) {
					setSearchList(
						data?.filter(item =>
							item.includes(
								String(
									query?.toLowerCase()
								)
							)
						)
					)
				}
			}
		)

		return () => watcher.unsubscribe()
	}, [watch, data])

	useEffect(() => {
		if (searchOpen) {
			refetch()
		}
	}, [searchOpen])

	useEffect(() => {
		if (
			searchParams &&
			searchParams.query
		) {
			setValue(
				"query",
				String(searchParams.query)
			)
		}

		if (!searchParams?.query) {
			setValue("query", "")
		}
	}, [searchParams])

	const { data: categories } = useQuery(
		["get categories"],
		() =>
			CategoriesService.getCategories()
	)

	const {
		mutateAsync: readAllNotifications,
	} = useMutation(
		["read all notifications"],
		() =>
			NotificationsService.readAllNotifications()
	)

	return (
		<div className={styles.header}>
			<section className={styles.left}>
				<div
					className={cn(
						styles.burgerMenu,
						{
							[styles.open]: open,
						}
					)}>
					<>
						{headerData.map(item => (
							<Link
								href={item.link}
								className={cn({
									[styles.active]:
										pathname ===
										item.link,
								})}
								key={item.title}>
								<Icon
									name={item.icon}
								/>
								<span>
									{item.title}
								</span>
							</Link>
						))}
						<hr />
						{categories &&
						categories.length
							? categories.map(
									category => (
										<Link
											key={category.id}
											href={`/categories/${category.slug}`}>
											<Image
												src={
													category.imagePath
												}
												alt={
													category.title
												}
												height={20}
												width={20}
											/>
											<span>
												{category.title}
											</span>
										</Link>
									)
							  )
							: null}
						<hr />
						{
							user?.following ? user.following.map(user => <Link href={`/persons/${user.name}`} key={user.id}>
								<Image src={user.avatarPath} className={styles.userImg} alt={user.name} height={24} width={24} />
								<span>{user.name}</span>
							</Link>) : null
						}
					</>
				</div>
				{open && (
					<div
						className={styles.overlay}
						onClick={() =>
							setOpen(false)
						}></div>
				)}
				<div className={styles.burger}>
					<Icon
						name="BsList"
						onClick={() =>
							setOpen(!open)
						}
					/>
				</div>
				<div className={styles.logo}>
					<Link href={"/"}>
						<svg
							viewBox="0 0 125 25"
							fill="#fff"
							xmlns="http://www.w3.org/2000/svg">
							<path d="M13.9025 6H0V21H3.86952V16.1199H11.2841L14.6671 21H19L15.2695 16.0975C16.4281 15.9176 17.2622 15.4903 17.772 14.8156C18.2817 14.141 18.5366 13.0615 18.5366 11.6222V10.4978C18.5366 9.64318 18.444 8.96855 18.2817 8.45125C18.1195 7.93403 17.8415 7.48425 17.4476 7.07946C17.0305 6.69715 16.5671 6.42729 16.011 6.24737C15.4549 6.08995 14.7597 6 13.9025 6ZM13.2769 12.8141H3.86952V9.30582H13.2769C13.8098 9.30582 14.1805 9.3958 14.3659 9.55321C14.5512 9.71062 14.6671 10.003 14.6671 10.4303V11.6897C14.6671 12.1395 14.5512 12.4318 14.3659 12.5892C14.1805 12.7466 13.8098 12.8141 13.2769 12.8141Z"></path>
							<path d="M24.7575 16.5697V6H21V16.4798C21 17.3343 21.0675 18.0315 21.225 18.5487C21.3825 19.0885 21.6525 19.5382 22.0575 19.9206C22.44 20.3254 22.89 20.5952 23.43 20.7526C23.97 20.9326 24.645 21 25.5 21H34.5C35.3325 21 36.0075 20.9326 36.5475 20.7526C37.0875 20.5952 37.5375 20.3254 37.9425 19.9206C38.325 19.5382 38.595 19.0885 38.7525 18.5487C38.9101 18.0315 39 17.3343 39 16.4798V6H35.2425V16.5697C35.2425 17.0195 35.13 17.3119 34.95 17.4693C34.77 17.6267 34.41 17.6941 33.8925 17.6941H26.1075C25.5675 17.6941 25.2075 17.6267 25.0275 17.4693C24.8475 17.3119 24.7575 17.0195 24.7575 16.5697Z"></path>
							<path d="M51.8487 21V9.30582H59V6H41V9.30582H48.1512V21H51.8487Z"></path>
							<path d="M64.7575 16.5697V6H61V16.4798C61 17.3343 61.0676 18.0315 61.225 18.5487C61.3825 19.0885 61.6525 19.5382 62.0575 19.9206C62.44 20.3254 62.89 20.5952 63.43 20.7526C63.97 20.9326 64.645 21 65.5 21H74.5C75.3325 21 76.0075 20.9326 76.5475 20.7526C77.0875 20.5952 77.5375 20.3254 77.9425 19.9206C78.325 19.5382 78.595 19.0885 78.7525 18.5487C78.91 18.0315 79 17.3343 79 16.4798V6H75.2425V16.5697C75.2425 17.0195 75.13 17.3119 74.95 17.4693C74.7699 17.6267 74.41 17.6941 73.8925 17.6941H66.1075C65.5675 17.6941 65.2075 17.6267 65.0275 17.4693C64.8475 17.3119 64.7575 17.0195 64.7575 16.5697Z"></path>
							<path d="M98.2567 10.3628V10.0705C98.2567 8.67618 97.8964 7.64168 97.1749 6.98951C96.4541 6.33733 95.3054 6 93.7737 6H81V21H94.5169C96.0486 21 97.1974 20.6852 97.9189 20.033C98.6397 19.3808 99 18.3463 99 16.9521V16.6372C99 15.2429 98.6397 14.2534 97.9189 13.6687C97.7835 13.5787 97.6481 13.5112 97.5134 13.4438C97.378 13.3763 97.1749 13.2864 96.9274 13.1964C97.4231 12.9265 97.7609 12.5667 97.9633 12.1619C98.1439 11.7571 98.2567 11.1499 98.2567 10.3628ZM84.7624 12.0045V9.30582H93.165C93.7059 9.30582 94.0663 9.3958 94.2469 9.55321C94.4266 9.71062 94.5169 10.003 94.5169 10.4303V10.8801C94.5169 11.3299 94.4266 11.6222 94.2469 11.7796C94.0663 11.9371 93.7059 12.0045 93.165 12.0045H84.7624ZM84.7624 17.6941V14.9955H93.9309C94.4492 14.9955 94.8096 15.0854 94.9901 15.2429C95.1699 15.4003 95.2828 15.6927 95.2828 16.1199V16.5697C95.2828 17.0195 95.1699 17.3119 94.9901 17.4693C94.8096 17.6267 94.4492 17.6941 93.9309 17.6941H84.7624Z"></path>
							<path d="M104.837 9.30582H117.38V6H101V21H118V17.6941H104.837V15.153H117.081L117.38 11.8471H104.837V9.30582Z"></path>
							<path
								d="M121.682 5.25234C123.128 5.25234 124.301 4.07656 124.301 2.62617C124.301 1.17578 123.128 0 121.682 0C120.235 0 119.062 1.17578 119.062 2.62617C119.062 4.07656 120.235 5.25234 121.682 5.25234Z"
								fill="#F41240"></path>
						</svg>
					</Link>
				</div>
			</section>
			<section
				className={styles.search}>
				<div className={styles.form}>
					<form
						className={cn(
							styles.field,
							{
								[styles.focus]:
									searchOpen,
							}
						)}
						onSubmit={handleSubmitSearch(
							onSubmitSearch
						)}>
						{!searchOpen && (
							<Icon name="BsSearch" />
						)}
						<input
							{...registerSearch(
								"query",
								{
									required:
										"This field is required",
								}
							)}
							type="text"
							autoComplete="off"
							placeholder={
								!searchOpen
									? "Поиск"
									: ""
							}
							onClick={() =>
								setSearchOpen(true)
							}
						/>
						{searchList &&
						searchList.length &&
						searchOpen ? (
							<div
								className={
									styles.searchList
								}>
								{searchList.map(
									(item) => (
										<Link
											onClick={() => {
												setSearchOpen(
													false
												)
												setValue(
													"query",
													item
												)
											}}
											href={`/?query=${item}${baseQuery}`}
											key={item}>
											<>
												{getValues(
													"query"
												).length
													? item.split(
															getValues(
																"query"
															).toLocaleLowerCase()
													  )[0]
													: null}
												{getValues(
													"query"
												).length ? (
													<span>
														{getValues(
															"query"
														)}
													</span>
												) : (
													item
												)}
												{getValues(
													"query"
												).length
													? item.split(
															getValues(
																"query"
															).toLocaleLowerCase()
													  )[1]
													: null}
											</>
										</Link>
									)
								)}
							</div>
						) : null}
					</form>
				</div>
				{searchOpen && (
					<div
						className={styles.overlay}
						onClick={() =>
							setSearchOpen(false)
						}></div>
				)}
			</section>
			<section className={styles.right}>
				<div className={styles.menu}>
					<div
						className={styles.upload}>
						<Icon name="BsPlusSquare" />
					</div>
					<div
						className={
							styles.notification
						}
						ref={notificationRef}>
						<div
							onClick={async () => {
								setNotificationOpen(
									!notificationOpen
								)

								if (user?.id) {
									await readAllNotifications()
									await refetchNotifications()
								}
							}}>
							<Icon name="BsBellFill" />
							{notifications?.filter(
								notif => !notif.read
							).length ? (
								<div
									className={
										styles.unread
									}>
									{
										notifications?.filter(
											notif =>
												!notif.read
										).length
									}
								</div>
							) : null}
						</div>
						<div
							className={cn(
								styles.notificationMenu,
								{
									[styles.open]:
										notificationOpen,
								}
							)}>
							<div
								className={
									styles.heading
								}>
								<p>Уведомления</p>
							</div>
							{notifications?.length ? (
								<div
									className={
										styles.notifs
									}>
									{notifications.map(
										notification => (
											<Link
												href={
													notification.url
												}>
												<div>
													<Icon
														name={
															notification.read
																? "BsCircleFill"
																: "BsCircle"
														}
													/>
													<span>
														{
															notification.text
														}
													</span>
												</div>
											</Link>
										)
									)}
								</div>
							) : (
								<div
									className={
										styles.content
									}>
									<img
										src="https://static.rutube.ru/static/img/svg/birds/dark/bird_on_branch.svg"
										alt="Notification not found"
									/>
									<span
										className={
											styles.headingEmpty
										}>
										Уведомлений пока нет
									</span>
									<span>
										Здесь будут
										уведомления о новых
										видео, комментариях,
										действиях на канале
										и новостях, на
										которые вы
										подписаны.
									</span>
								</div>
							)}
						</div>
					</div>
				</div>
				<div className={styles.btn}>
					{user?.id ? (
						<Link href={"/profile"}>
							<Image
								src={String(
									user?.avatarPath
								)}
								alt={String(user.name)}
								height={40}
								width={40}
							/>
						</Link>
					) : (
						<Button
							title="Вход и регистрация"
							onClick={() =>
								setAuthOpen(true)
							}
						/>
					)}
					{authOpen && (
						<div
							className={
								styles.overlay
							}></div>
					)}
					<div
						className={cn(
							styles.authModal,
							{
								[styles.open]: authOpen,
							}
						)}
						ref={authRef}>
						<div
							className={
								styles.heading
							}>
							<h4>
								{type === "login"
									? "Войти"
									: "Регистрация"}
							</h4>
							<Icon
								name="BsX"
								onClick={() =>
									setAuthOpen(false)
								}
							/>
						</div>
						<form
							onSubmit={handleSubmit(
								onSubmit
							)}>
							<div>
								<span>
									Введите почту
								</span>
								<input
									{...register(
										"email",
										{
											required:
												"This field is required",
											pattern: {
												value:
													emailPattern,
												message:
													"This field must be a valid",
											},
										}
									)}
									type="email"
									autoComplete="off"
								/>
								{errors.email
									?.message && (
									<span>
										{
											errors.email
												.message
										}
									</span>
								)}
							</div>
							<div>
								<span>
									Введите пароль
								</span>
								<input
									{...register(
										"password",
										{
											required:
												"This field is required",
											validate:
												value => {
													if (
														!validator.isStrongPassword(
															value,
															{
																minLength: 8,
																minLowercase: 3,
																minNumbers: 2,
																minSymbols: 1,
																minUppercase: 1,
															}
														)
													) {
														return "This field must be a difficult"
													}
												},
										}
									)}
									autoComplete="off"
									type="password"
								/>
								{errors.password
									?.message && (
									<span>
										{
											errors.password
												.message
										}
									</span>
								)}
							</div>
							<Button
								type="submit"
								title={
									type === "login"
										? "Войти"
										: "Зарегистрироваться"
								}
								disabled={
									!!errors.email
										?.message ||
									!!errors.password
										?.message
								}
							/>
						</form>
						<div
							className={styles.other}>
							<p>Войти с помощью</p>
							<div>
								<div
									onClick={() =>
										googleLogin()
									}>
									<Image
										src={googleLogo}
										alt="Google"
										height={40}
										width={40}
									/>
								</div>
								<div>
									<FacebookLogin
										appId={
											process.env
												.APP_ID || ""
										}
										autoLoad={false}
										fields="name,email,picture"
										textButton=""
										callback={(
											response: any
										) => {
											AuthByFacebook({
												email:
													response.email,
												picture:
													response
														.picture
														.data.url,
											})
										}}
										icon={
											<Image
												src={
													facebookLogo
												}
												alt="Facebook"
												height={40}
												width={40}
											/>
										}
										onFailure={async (
											error: any
										) => {
											toastr.error(
												"Login with Facebook",
												"Failure"
											)
										}}
										typeButton="button"
										scope="email, public_profile"
									/>
								</div>
							</div>
						</div>
						<div
							className={
								styles.otherAuth
							}>
							{type === "login"
								? "Нет аккаунта?"
								: "Уже зарегистрированы?"}{" "}
							<span
								onClick={() =>
									setType(
										type === "login"
											? "register"
											: "login"
									)
								}>
								{type === "login"
									? "Зарегистрируйтесь"
									: "Войдите"}
							</span>
						</div>
					</div>
				</div>
			</section>
		</div>
	)
}

export default Header
