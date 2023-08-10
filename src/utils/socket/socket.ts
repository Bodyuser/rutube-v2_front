import io from "socket.io-client"
import {
	useEffect,
	useRef,
} from "react"
import Cookies from "js-cookie"

export const useSocket = () => {
	const ref = useRef<any>(null)

	useEffect(() => {
		if (process.env.API_URL) {
			ref.current = io(
				process.env.API_URL,
				{
					extraHeaders: {
						Authorization: `Bearer ${Cookies.get(
							"accessToken"
						)}`,
					},
				}
			)
		}
	}, [])

	return {
		socket: ref.current,
	}
}
