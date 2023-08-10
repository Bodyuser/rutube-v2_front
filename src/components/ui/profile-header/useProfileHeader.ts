import { useActions } from "@/hooks/useActions"
import { ILogin } from "@/services/auth/auth.types"
import {
	SubmitHandler,
	useForm,
} from "react-hook-form"
import { useState } from "react"
import { useSendMailForResetPasswordMutation } from "@/redux/api/send-mail.api"

export const useProfileHeader = () => {
	const {
		handleSubmit,
		formState: { errors },
		register,
		reset,
	} = useForm<ILogin>({
		mode: "onChange",
	})

	const [type, setType] = useState<
		"login" | "register" | "reset"
	>("login")

	const { Login, Register } =
		useActions()

	const [sendMail] =
		useSendMailForResetPasswordMutation()

	const onSubmit: SubmitHandler<
		ILogin
	> = async data => {
		if (type === "login") {
			Login(data)
		} else if (type === "register") {
			Register(data)
		} else {
			await sendMail(data.email)
		}

		reset()
	}

	return {
		handleSubmit,
		onSubmit,
		register,
		errors,
		type,
		setType,
	}
}
