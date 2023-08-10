import dynamic from "next/dynamic"
import {useRouter} from "next/router"
import {FC, PropsWithChildren, useEffect,} from "react"

import {useActions} from "@/hooks/useActions"
import {useTypedSelector} from "@/hooks/useTypedSelector"

import {TypeComponentAuthField} from "@/shared/types/props-page/props-page.types"
import { useAppDispatch } from "@/hooks/useAppDispatch"
import {
	setIsJoin,
	setSocket,
} from "@/redux/components/user/users/users.slice"
import { useSocket } from "@/utils/socket/socket"

const DynamicCheckRole = dynamic(
	() =>
		import(
			"../checkRole-provider/CheckRoleProvider"
		),
	{ ssr: false }
)

const AuthProvider: FC<
	PropsWithChildren<TypeComponentAuthField>
> = ({
	Component: {
		isOnlyAdmin,
		isOnlyUser,
	},
	children,
}) => {
	const { GetNewToken } = useActions()
	const { pathname } = useRouter()

	const { isAuth, isJoin, user } =
		useTypedSelector(
			state => state.users
		)

	const { socket } = useSocket()

	const dispatch = useAppDispatch()

	useEffect(() => {
		if (
			!isJoin &&
			isAuth &&
			user &&
			socket
		) {
			console.log("socket")

			dispatch(setSocket(socket))
			socket.emit("join", {
				id: user.id,
			})
			dispatch(setIsJoin(true))
		}
	}, [isAuth, user, isJoin])

	useEffect(() => {
		if (isAuth) GetNewToken()
	}, [pathname]) // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<DynamicCheckRole
			Component={{
				isOnlyAdmin,
				isOnlyUser,
			}}>
			{children}
		</DynamicCheckRole>
	)
}

export default AuthProvider
