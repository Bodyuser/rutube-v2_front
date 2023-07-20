import { UserRoleEnum } from "@/shared/types/user/enums/user-role.enum"

export const convertRoleToNumber = (role: UserRoleEnum | null | undefined) => {
	if (role === null || role === undefined) return 0
	return role === UserRoleEnum.OWNER
		? 3
		: role === UserRoleEnum.ADMIN
		? 2
		: role === UserRoleEnum.USER
		? 1
		: 0
}
