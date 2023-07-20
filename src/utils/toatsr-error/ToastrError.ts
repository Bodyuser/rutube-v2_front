import { toastr } from "react-redux-toastr"

import { returnError } from "@/helpers/api.helper"

export const ToastError = (
	error: any,
	title?: string
) => {
	const message = returnError(error)

	toastr.error(
		title || "Error request",
		message
	)
	throw message
}
