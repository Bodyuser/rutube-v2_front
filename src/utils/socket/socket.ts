import io from "socket.io-client"
import {
	useEffect,
	useRef,
} from "react"

export const useSocket = () => {
	const ref = useRef<any>(null)

	useEffect(() => {
		if (process.env.API_URL) {
			ref.current = io(
				process.env.API_URL
			)
		}
	}, [])

	return {
		socket: ref.current,
	}
}
