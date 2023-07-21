import { axiosInstance } from "@/api/axios-instance"
import { ICategory } from "@/shared/types/category/category.types"
import {
	ICreateCategory,
	IUpdateCategory,
} from "./categories.types"
import { IMessageResponse } from "@/shared/types/message-response.types"
import { axiosClassic } from "@/api/axios-classic"

interface ICategoryResponse {
	category: ICategory
}

const getCategoriesUrl = (
	url: string
) => `/categories/${url}`

export const CategoriesService = {
	async createCategory(
		data: ICreateCategory
	) {
		return (
			await axiosInstance.post<ICategoryResponse>(
				getCategoriesUrl(""),
				data
			)
		).data.category
	},
	async updateCategory(
		data: IUpdateCategory,
		id: string
	) {
		return (
			await axiosInstance.put<ICategoryResponse>(
				getCategoriesUrl(id),
				data
			)
		).data.category
	},
	async deleteCategory(id: string) {
		return (
			await axiosInstance.delete<IMessageResponse>(
				getCategoriesUrl(id)
			)
		).data.message
  },
  async checkExistingSLug(slug: string) {
    return (
			await axiosInstance.get<
				IMessageResponse & {
					access: boolean
				}
			>(
				getCategoriesUrl(
					`existing-slug/${slug}`
				)
			)
		).data
  },
  async getCategories() {
    return (await axiosClassic.get<{categories: ICategory[]}>(getCategoriesUrl(""))).data.categories
  },
  async getCategory(slug: string) {
    return (
			await axiosClassic.get<ICategoryResponse>(
				getCategoriesUrl(slug)
			)
		).data.category
  },
}
