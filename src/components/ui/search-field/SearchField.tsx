import { FC, memo } from "react"

import styles from "./SearchField.module.scss"
import { useSearchField } from "./useSearchField"
import SearchItem from "./search-item/SearchItem"
import Field from "../field/Field"

const SearchField: FC = () => {
	const {
		errors,
		handleSubmit,
		onSubmit,
		register,
		searchList,
		isOpen,
		setIsOpen,
	} = useSearchField()

	return (
		<div className={styles.field}>
			<form
				onSubmit={handleSubmit(
					onSubmit
				)}>
				<Field
					{...register("query", {
						required:
							"Это поле обязательно",
					})}
					placeholder="Search"
					onFocus={() => {
						setIsOpen(true)
					}}
					onBlur={() => {
						setTimeout(() => {
							setIsOpen(false)
						}, 500)
					}}
					type="submit"
					autoComplete="off"
					error={errors.query?.message}
					icon="BsSearch"
				/>
			</form>

			{!!searchList?.length &&
				isOpen && (
					<div className={styles.list}>
						{searchList.map(item => (
							<SearchItem
								setIsOpen={setIsOpen}
								title={item}
								key={item}
							/>
						))}
					</div>
				)}
			{isOpen && (
				<div className="overlay"></div>
			)}
		</div>
	)
}

export default memo(SearchField)
