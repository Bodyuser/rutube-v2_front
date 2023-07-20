import { ContentState, EditorProps, EditorState, convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import { FC, useEffect, useState } from 'react'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

import { FilesService } from '@/services/files/files.service'

import styles from './TextEditor.module.scss'
import { FieldError } from 'react-hook-form'

export interface IFieldProps {
	placeholder: string
	error?: FieldError | undefined
}
type TypeEditorPropsField =
	EditorProps & IFieldProps
export interface ITextEditor
	extends Omit<
		TypeEditorPropsField,
		"editorState"
	> {
	onChange: (...event: any[]) => void
	value: string
	full: boolean
}

export function uploadImageCallBack(file: any) {
	return new Promise((resolve, reject) => {
		const response = FilesService.uploadImage(file, "videos/description")
		response.then((data) => {
			resolve({
				data: {
					link: data,
				},
			})
		})
		response.catch((e) => {
			reject(e)
		})
	})
}
const TextEditor: FC<ITextEditor> = ({
	placeholder,
	onChange,
	error,
	value,
	full,
}) => {
	const [editorState, setEditorState] = useState(EditorState.createEmpty())
	const [isUpdated, setIsUpdated] = useState(false)
	useEffect(() => {
		if (!isUpdated) {
			const defaultValue = value ? value : ''
			const blocksFromHtml = htmlToDraft(defaultValue)
			const contentState = ContentState.createFromBlockArray(
				blocksFromHtml.contentBlocks,
				blocksFromHtml.entityMap
			)
			const newEditorState = EditorState.createWithContent(contentState)
			setEditorState(newEditorState)
		}
	}, [value, isUpdated])

	const onEditorStateChange = (editorState: EditorState) => {
		setIsUpdated(true)
		setEditorState(editorState)
		return onChange(draftToHtml(convertToRaw(editorState.getCurrentContent())))
	}

	const toolbar = full
		? {
			
		  }
		: {
				options: ['inline', 'blockType', 'list'],
				inline: {
					inDropdown: false,
					className: undefined,
					component: undefined,
					dropdownClassName: undefined,
					options: ['bold', 'italic', 'underline', 'strikethrough'],
				},
				blockType: {
					inDropdown: false,
					options: [],
				},
				list: {
					inDrodown: false,
					options: ['unordered', 'ordered'],
				},
		  }

	return (
		<div className={styles.wrapper}>
			<Editor
				toolbarClassName={styles.toolbar}
				editorClassName={styles.editor}
				wrapperClassName={styles.editorWrapper}
				editorState={editorState}
				onEditorStateChange={onEditorStateChange}
				toolbar={toolbar}
				placeholder={placeholder}
				spellCheck
				toolbarStyle={{
					backgroundColor: 'black',
				}}
				hashtag={{
					separator: ' ',
					trigger: '#',
				}}
			/>
			{error && <div className={styles.error}>{error.message}</div>}
		</div>
	)
}
export default TextEditor
