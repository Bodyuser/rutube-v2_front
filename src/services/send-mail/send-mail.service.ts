import { axiosClassic } from "@/api/axios-classic"
import { IMessageResponse } from "@/shared/types/message-response.types"

const getSendMailUrl = (url: string) => `/send-mail/${url}`

export const SendMailService = {
  async sendMailForResetPassword(password: string) {
    return (await axiosClassic.post<IMessageResponse>(getSendMailUrl("reset"), {password})).data.message
  }
}