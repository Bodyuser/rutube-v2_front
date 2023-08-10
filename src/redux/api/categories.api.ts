import { api } from "./api"
import { IMessageResponse } from "@/shared/types/message-response.types"
import {
	ICategory,
	ICreateCategory,
	IUpdateCategory,
} from "@/shared/types/category/category.types"

const getCategoriesUrl = (
	url: string
) => `/categories/${url}`

const categoryApi = api.injectEndpoints(
	{
		endpoints: builder => ({
			// createCategory: builder.mutation<
			// 	ICategory,
			// 	ICreateCategory
			// >({
			// 	query: data => ({
			// 		method: "POST",
			// 		type: "auth",
			// 		url: getCategoriesUrl(""),
			// 		data,
			// 		title: "Создание категории",
			// 		message: "Успешно создано",
			// 	}),
			// 	transformResponse(
			// 		response: any
			// 	) {
			// 		return response?.category
			// 	},
			// }),
			// updateCategory: builder.mutation<
			// 	ICategory,
			// 	{ id: string } & IUpdateCategory
			// >({
			// 	query: ({ id, ...data }) => ({
			// 		method: "PUT",
			// 		type: "auth",
			// 		url: getCategoriesUrl(id),
			// 		data,
			// 		title: "Обновление категории",
			// 		message: "Успешно обновлено",
			// 	}),
			// 	transformResponse(
			// 		response: any
			// 	) {
			// 		return response?.category
			// 	},
			// }),
			// deleteCategory: builder.mutation<
			// 	string,
			// 	string
			// >({
			// 	query: id => ({
			// 		method: "DELETE",
			// 		type: "auth",
			// 		url: getCategoriesUrl(id),
			// 		title: "Удаление категории",
			// 		message: "Успешно удалено",
			// 	}),

			// 	transformResponse(
			// 		response: any
			// 	) {
			// 		return response?.category
			// 	},
			// }),
			// checkExistingSlug: builder.query<
			// 	IMessageResponse & {
			// 		access: boolean
			// 	},
			// 	string
			// >({
			// 	query: slug => ({
			// 		method: "GET",
			// 		type: "auth",
			// 		url: getCategoriesUrl(
			// 			`existing-slug/${slug}`
			// 		),
			// 	}),
			// }),
			getCategories: builder.query<
				ICategory[],
				any
			>({
				query: () => ({
					method: "GET",
					type: "no-auth",
					url: getCategoriesUrl(""),
				}),
				transformResponse(
					response: any
				) {
					return response?.categories
				},
			}),
			getCategory: builder.query<
				ICategory,
				string
			>({
				query: slug => ({
					method: "GET",
					type: "no-auth",
					url: getCategoriesUrl(slug),
				}),
				transformResponse(
					response: any
				) {
					return response?.category
				},
			}),
		}),
	}
)

export const {
	// useCreateCategoryMutation,
	// useDeleteCategoryMutation,
	useGetCategoriesQuery,
	useGetCategoryQuery,
	// useUpdateCategoryMutation,
} = categoryApi
