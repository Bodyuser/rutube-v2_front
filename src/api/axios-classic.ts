import axios from "axios"

import { API_URL } from "@/constants/api.constants"
import { getContentType } from "@/helpers/api.helper"

export const axiosClassic =
	axios.create({
		baseURL: API_URL,
		headers: getContentType(),
		withCredentials: true,
	})
