import {
	FC,
	useState,
	useRef,
} from "react"

import styles from "./ImageCropModal.module.scss"
import { IImageCropModal } from "./imageCropModal.types"

import ReactCrop, {
	centerCrop,
	makeAspectCrop,
	Crop,
	PixelCrop,
} from "react-image-crop"
import { canvasPreview } from "./utils/canvasPreview"
import { useDebounceEffect } from "@/hooks/useDebounceEffect"

import "react-image-crop/dist/ReactCrop.css"
import Button from "../button/Button"
import Icon from "../icon/Icon"
import cn from "classnames"

function centerAspectCrop(
	mediaWidth: number,
	mediaHeight: number,
	aspect: number
) {
	return centerCrop(
		makeAspectCrop(
			{
				unit: "%",
				width: 90,
			},
			aspect,
			mediaWidth,
			mediaHeight
		),
		mediaWidth,
		mediaHeight
	)
}

const ImageCropModal: FC<
	IImageCropModal
> = ({
	onClick,
	title,
	titleButton,
	aspectRatio,
	setIsOpen,
}) => {
	const [imgSrc, setImgSrc] =
		useState("")

	const previewCanvasRef =
		useRef<HTMLCanvasElement>(null)

	const imgRef =
		useRef<HTMLImageElement>(null)

	const inputRef = useRef<any>(null)

	const [crop, setCrop] =
		useState<Crop>()
	const [
		completedCrop,
		setCompletedCrop,
	] = useState<PixelCrop>()
	const [scale, setScale] = useState(1)
	const [rotate, setRotate] =
		useState(0)

	function onSelectFile(
		e: React.ChangeEvent<HTMLInputElement>
	) {
		if (
			e.target.files &&
			e.target.files.length > 0
		) {
			setCrop(undefined) // Makes crop preview update between images.
			const reader = new FileReader()
			reader.addEventListener(
				"load",
				() =>
					setImgSrc(
						reader.result?.toString() ||
							""
					)
			)
			reader.readAsDataURL(
				e.target.files[0]
			)
		}
	}

	function onImageLoad(
		e: React.SyntheticEvent<HTMLImageElement>
	) {
		if (aspectRatio) {
			const { width, height } =
				e.currentTarget
			setCrop(
				centerAspectCrop(
					width,
					height,
					aspectRatio
				)
			)
		}
	}

	async function sendFIle() {
		if (!previewCanvasRef.current) {
			throw new Error(
				"Crop canvas does not exist"
			)
		}

		previewCanvasRef.current.toBlob(
			blob => {
				if (!blob) {
					throw new Error(
						"Failed to create blob"
					)
				}
				const file = new File(
					[blob],
					`file.${
						blob.type.split("/")[1]
					}`,
					{
						type: `image/${
							blob.type.split("/")[1]
						}`,
					}
				)

				onClick(file)
			}
		)
	}

	useDebounceEffect(
		async () => {
			if (
				completedCrop?.width &&
				completedCrop?.height &&
				imgRef.current &&
				previewCanvasRef.current
			) {
				canvasPreview(
					imgRef.current,
					previewCanvasRef.current,
					completedCrop,
					scale,
					rotate
				)
			}
		},
		100,
		[completedCrop, scale, rotate]
	)

	return (
		<div
			className={cn(styles.modal, {
				[styles.square]:
					aspectRatio === 1,
			})}>
			<div
				onClick={() =>
					setIsOpen(false)
				}>
				<Icon name="BsX" />
			</div>
			<h3>{title}</h3>
			{!!!imgSrc && (
				<div className={styles.input}>
					<Button
						icon="BsUpload"
						title="Выбрать изображение"
						onClick={() =>
							inputRef.current.click()
						}
						type="button"
					/>
					<input
						type="file"
						accept="image/*"
						onChange={onSelectFile}
						ref={inputRef}
					/>
				</div>
			)}
			{!!imgSrc && (
				<ReactCrop
					crop={crop}
					onChange={(_, percentCrop) =>
						setCrop(percentCrop)
					}
					onComplete={c =>
						setCompletedCrop(c)
					}
					aspect={aspectRatio}>
					<img
						ref={imgRef}
						alt="Img"
						src={imgSrc}
						onLoad={onImageLoad}
					/>
				</ReactCrop>
			)}
			{!!completedCrop && (
				<div
					className={styles.complete}>
					<canvas
						ref={previewCanvasRef}
						style={{
							border: "1px solid black",
							objectFit: "contain",
							width:
								completedCrop.width,
							height:
								completedCrop.height,
						}}
					/>
				</div>
			)}

			{!!imgSrc && (
				<Button
					icon="BsUpload"
					title={titleButton}
					type="button"
					onClick={sendFIle}
				/>
			)}
		</div>
	)
}

export default ImageCropModal
