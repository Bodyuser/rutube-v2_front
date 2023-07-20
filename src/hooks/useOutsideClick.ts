import {
	useState,
	useEffect,
	useRef,
} from "react"

const useOutsideClick = (
	initialValue: boolean
) => {
	const [isOpen, setIsOpen] = useState(
		initialValue
	)
	const ref = useRef<any>(null)

	const handleClick = (e: any) => {
		if (
			ref.current &&
			!ref.current.contains(e.target)
		) {
			setIsOpen(false)
		}
	}

	useEffect(() => {
		document.addEventListener(
			"click",
			handleClick,
			true
		)
		return () => {
			document.removeEventListener(
				"click",
				handleClick,
				true
			)
		}
	})

	return { ref, isOpen, setIsOpen }
}

export default useOutsideClick
