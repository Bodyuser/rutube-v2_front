import useOutsideClick from "@/hooks/useOutsideClick"
import { useGetSearchListQuery } from "@/redux/api/search.api"
import { useRouter } from "next/router"
import {
	SubmitHandler,
	useForm,
} from "react-hook-form"
import {
	useState,
	useEffect,
	useCallback,
} from "react"

interface ISearchField {
	query: string
}

export const baseQuery =
	"?duration=all&date=all&order=popular"

export const useSearchField = () => {
	const {
		handleSubmit,
		formState: { errors },
		register,
		watch,
		setValue,
		clearErrors,
	} = useForm<ISearchField>({
		mode: "onChange",
	})

	const [isOpen, setIsOpen] =
		useState(false)

	const { push, query: searchParams } =
		useRouter()

	const { data: searchList } =
		useGetSearchListQuery(null, {
			skip: isOpen,
		})

	const [
		filteredSearchList,
		setFilteredSearchList,
	] = useState<any[]>([])

	useEffect(() => {
		if (
			searchParams &&
			searchParams.query
		) {
			clearErrors("query")
			setValue(
				"query",
				String(searchParams.query)
			)
		}
	}, [searchParams.query])

	const query = watch("query")

	useEffect(() => {
		setFilteredSearchList(
			searchList
				?.filter(item =>
					item.includes(query)
				)
				.slice(0, 20) || []
		)
	}, [query, isOpen])

	const onSubmit: SubmitHandler<
		ISearchField
	> = data => {
		const searchParams =
			new URLSearchParams(baseQuery)
		searchParams.set(
			"query",
			data.query
		)

		push(`/?${searchParams.toString()}`)

		setIsOpen(false)
	}

	return {
		onSubmit,
		handleSubmit,
		errors,
		register,
		searchList: filteredSearchList,
		isOpen,
		setIsOpen,
		query,
	}
}
