import { api } from "./api"

const getSendMailUrl = (url: string) =>
	`/send-mail/${url}`

const sendMailApi = api.injectEndpoints(
	{
		endpoints: builder => ({
			sendMailForResetPassword:
				builder.mutation<
					string,
					string
				>({
					query: (email: string) => ({
						method: "POST",
						type: "no-auth",
						url: getSendMailUrl(
							"reset"
						),
						data: {
							email,
						},
						title:
							"Отправка письма на почту",
						message:
							"Вам на почту отправлено письмо с инструкцией по сбросу пароля",
					}),
					transformResponse(
						response: any
					) {
						return response?.message
					},
				}),
		}),
	}
)

export const {
	useSendMailForResetPasswordMutation,
} = sendMailApi
