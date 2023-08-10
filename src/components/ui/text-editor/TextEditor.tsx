import {
	ContentState,
	EditorState,
	convertToRaw,
} from "draft-js"
import draftToHtml from "draftjs-to-html"
import htmlToDraft from "html-to-draftjs"
import {
	FC,
	useEffect,
	useState,
} from "react"
import { Editor } from "react-draft-wysiwyg"

import styles from "./TextEditor.module.scss"
import { ITextEditor } from "./TextEditor.types"

// export function uploadImageCallBack(file: any) {
// 	return new Promise((resolve, reject) => {
// 		const response = FilesService.uploadImage(file, "videos/description")
// 		response.then((data) => {
// 			resolve({
// 				data: {
// 					link: data,
// 				},
// 			})
// 		})
// 		response.catch((e) => {
// 			reject(e)
// 		})
// 	})
// }
const TextEditor: FC<ITextEditor> = ({
	placeholder,
	onChange,
	error,
	value,
	type,
}) => {
	const [editorState, setEditorState] =
		useState(EditorState.createEmpty())
	const [isUpdated, setIsUpdated] =
		useState(false)

	const toolbar =
		type === "video"
			? {
					options: [
						"inline",
						"blockType",
						"fontSize",
						"list",
						"textAlign",
						"link",
						"emoji",
						"remove",
						"history",
					],
					inline: {
						inDropdown: false,
						className: undefined,
						component: undefined,
						dropdownClassName:
							undefined,
						options: [
							"bold",
							"italic",
							"underline",
							"strikethrough",
							"monospace",
							"superscript",
							"subscript",
						],
					},
					blockType: {
						inDropdown: true,
						options: [
							"Normal",
							"H1",
							"H2",
							"H3",
							"H4",
							"H5",
							"H6",
							"Blockquote",
							"Code",
						],
						className: undefined,
						component: undefined,
						dropdownClassName:
							undefined,
					},
					list: {
						inDropdown: false,
						className: undefined,
						component: undefined,
						dropdownClassName:
							undefined,
						options: [
							"unordered",
							"ordered",
							"indent",
							"outdent",
						],
					},
					textAlign: {
						inDropdown: false,
						className: undefined,
						component: undefined,
						dropdownClassName:
							undefined,
						options: [
							"left",
							"center",
							"right",
							"justify",
						],
					},
					link: {
						inDropdown: false,
						className: undefined,
						component: undefined,
						popupClassName: undefined,
						dropdownClassName:
							undefined,
						showOpenOptionOnHover: true,
						defaultTargetOption:
							"_self",
						options: ["link", "unlink"],
					},

					remove: {
						className: undefined,
						component: undefined,
					},
					history: {
						inDropdown: false,
						className: undefined,
						component: undefined,
						dropdownClassName:
							undefined,
						options: ["undo", "redo"],
					},
			  }
			: {}

	useEffect(() => {
		if (!isUpdated) {
			const defaultValue = value
				? value
				: ""
			const blocksFromHtml =
				htmlToDraft(defaultValue)
			const contentState =
				ContentState.createFromBlockArray(
					blocksFromHtml.contentBlocks,
					blocksFromHtml.entityMap
				)
			const newEditorState =
				EditorState.createWithContent(
					contentState
				)
			setEditorState(newEditorState)
		}
	}, [value, isUpdated])

	const onEditorStateChange = (
		editorState: EditorState
	) => {
		setIsUpdated(true)
		setEditorState(editorState)
		return onChange(
			draftToHtml(
				convertToRaw(
					editorState.getCurrentContent()
				)
			)
		)
	}

	return (
		<div className={styles.wrapper}>
			<Editor
				toolbarClassName={
					styles.toolbar
				}
				editorClassName={styles.editor}
				wrapperClassName={
					styles.editorWrapper
				}
				editorState={editorState}
				onEditorStateChange={
					onEditorStateChange
				}
				toolbar={toolbar}
				placeholder={placeholder}
				spellCheck
				hashtag={{
					separator: " ",
					trigger: "#",
				}}
			/>
			{error && (
				<div className={styles.error}>
					{error.message}
				</div>
			)}
		</div>
	)
}
export default TextEditor
