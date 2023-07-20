import {
	useEffect,
	useState,
} from "react"

export const useRenderToClient = () => {
	const [isRender, setIsRender] =
		useState(false)

	useEffect(() => {
		!isRender && setIsRender(true)
	}, [isRender])

	return {
		isRender,
	}
}
