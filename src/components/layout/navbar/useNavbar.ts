import { useTypedSelector } from "@/hooks/useTypedSelector"
import { useGetCategoriesQuery } from "@/redux/api/categories.api"
import { useGetFollowingQuery } from "@/redux/api/users.api"

export const useNavbar = () => {
	const isAuth = useTypedSelector(
		state => state.users.isAuth
	)

	const { data: following } =
		useGetFollowingQuery(null, {
			skip: !isAuth,
		})

	const { data: categories } =
		useGetCategoriesQuery(null)

	return {
		isAuth,
		following,
		categories,
	}
}
