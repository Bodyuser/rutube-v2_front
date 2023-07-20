import { FC } from 'react'

import { TagsInput } from "react-tag-input-component"

import styles from './TagInput.module.scss'
import { toastr } from 'react-redux-toastr'

interface ITagInput {
  value: any[]
  onChange: () => void
  error?: string
}

const TagInput: FC<ITagInput> = ({onChange, value, error}) => {
  return (
		<div className={styles.tagInput}>
			<TagsInput
				value={value}
				onChange={onChange}
        classNames={{
          input: styles.input,
          tag: styles.tag
        }}
				placeHolder=""
        onExisting={(tag) => {
          toastr.error("Существующий тэг", "Введите несуществующий тэг")
        }}
        beforeAddValidate={(tag, existingTags) => {
          if (existingTags.length >= 10) {
            toastr.error("Максимальное количество тэгов", "Было введено максимальное количество тэгов")
           return false
         }
         return true
        }}
      />
      {
        error && <span>{error}</span>
      }
		</div>
	)
}

export default TagInput