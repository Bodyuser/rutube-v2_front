import { useRouter } from 'next/router'
import { FC, PropsWithChildren } from 'react'

import { useTypedSelector } from '@/hooks/useTypedSelector'
import { TypeComponentAuthField } from '@/shared/types/props-page/props-page.types'
import { convertRoleToNumber } from '@/utils/role/convertRoleToNumber'

const CheckRoleProvider: FC<PropsWithChildren<TypeComponentAuthField>> = ({
	children,
	Component: { isOnlyAdmin, isOnlyUser },
}) => {
	// const Children = () => <>{children}</>

	const {pathname, replace} = useRouter()

	const user = useTypedSelector((state) => state.users.user)
	const isLoading = useTypedSelector((state) => state.users.isLoading)

	const role = convertRoleToNumber(user?.role)

	if (!isLoading) {
		if (
			pathname.startsWith("/profile") &&
			role === 0
		) {
			pathname !== "/" &&
				replace(
					"/?auth=true",
					undefined,
					{ shallow: true }
				)
		}

		if (
			isOnlyAdmin &&
			(!user || role <= 1)
		) {
			pathname !== "/404" &&
				replace("/404", undefined, {
					shallow: true,
				})
			return null
		}

		if (!isOnlyAdmin && !isOnlyUser) {			
			return <>{children}</>
		}
		if (role >= 2) return <>{children}</>
		if (role >= 1 && isOnlyUser)
			return <>{children}</>
	}
	return null
}

export default CheckRoleProvider
