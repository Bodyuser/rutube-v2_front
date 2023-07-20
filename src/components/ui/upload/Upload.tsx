import {
	FC,
	useEffect,
	useState,
	useRef,
	Dispatch,
	SetStateAction,
} from "react"

import styles from "./Upload.module.scss"
import Button from "../button/Button"
import { toastr } from "react-redux-toastr"

const Upload: FC<{
	error?: string
	setFile: Dispatch<any>
	fileUrl: string
	setFileUrl: Dispatch<
		SetStateAction<string>
	>
	placeholder?: string
	accept?: string
	videoRef?: any
}> = ({
	setFile,
	error,
	fileUrl,
	setFileUrl,
	placeholder = "Загрузить изображение",
	accept = "image/*",
	videoRef
}) => {
	const ref =
		useRef<HTMLInputElement>(null)

	return (
		<div className={styles.upload}>
			<div>
				<Button
					secondary
					title={placeholder}
					onClick={() =>
						ref.current?.click()
					}
				/>
				<input
					ref={ref}
					onChange={e => {
						if (
							!e.target?.files?.[0].type.startsWith(
								accept.split("/")[0]
							)
						) {
							toastr.error(
								"Неправильный формат файла",
								"Выберите разрешенный формат"
							)
							return
						}
						if (e.target?.files?.[0]) {
							setFileUrl(
								URL.createObjectURL(
									e.target?.files?.[0]
								)
							)
							setFile(
								e?.target?.files?.[0]
							)
						}
					}}
					type="file"
					accept={accept}
					required
				/>
				{error?.length ? (
					<span>{error}</span>
				) : null}
			</div>
			{fileUrl.length ? (
				accept.startsWith("image") ? (
					<img
						src={fileUrl}
						alt="Image"
					/>
				) : (
					<video
						ref={videoRef}
						autoPlay
						src={fileUrl}></video>
				)
			) : null}
		</div>
	)
}

export default Upload
