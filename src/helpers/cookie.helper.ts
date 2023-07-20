import Cookies from 'js-cookie'

export const saveToken = async (token: string) => {
	Cookies.set('accessToken', token)
}

export const removeToken = async () => {
	Cookies.remove('accessToken')
}
