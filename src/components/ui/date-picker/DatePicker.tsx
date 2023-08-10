import {
	FC,
	forwardRef,
	useState,
} from "react"

import { ControllerRenderProps } from "react-hook-form"

import DatePicker from "react-datepicker"
import styles from "./DatePicker.module.scss"

const ExampleCustomInput = forwardRef<
	any,
	any
>(({ value, onClick }, ref) => (
	<button
		className={styles.btn}
		onClick={onClick}
		type="button"
		ref={ref}>
		{value}
	</button>
))

interface IDatePickerComponent {
	value: ControllerRenderProps<any, any>
	placeholder?: string
	error?: string
}

const DatePickerComponent: FC<
	IDatePickerComponent
> = ({ value, error, placeholder }) => {
	const currentYear =
		new Date().getFullYear()
	const [years] = useState(() => {
		const arr: number[] = []
		for (
			let i = 1900;
			i <= currentYear;
			i++
		) {
			arr.push(i)
		}
		return arr
	})

	const months = [
		"Январь",
		"Февраль",
		"Март",
		"Апрель",
		"Май",
		"Июнь",
		"Июль",
		"Август",
		"Сентябрь",
		"Октябрь",
		"Ноябрь",
		"Декабрь",
	]

	return (
		<div className={styles.date}>
			<DatePicker
				selected={value.value}
				onChange={date =>
					value.onChange(() => {
						return date
					})
				}
				dateFormat="dd.MM.yyyy"
				placeholderText={placeholder}
				excludeDateIntervals={[
					{
						start: new Date(
							`${currentYear}.01.01`
						),
						end: new Date(
							`${currentYear + 1}.01.01`
						),
					},
				]}
				customInput={
					<ExampleCustomInput />
				}
				wrapperClassName="date"
				required
				locale={"ru-Ru"}
				renderCustomHeader={({
					date,
					changeYear,
					changeMonth,
					decreaseMonth,
					increaseMonth,
					prevMonthButtonDisabled,
					nextMonthButtonDisabled,
				}) => {
					return (
						<div>
							<button
								onClick={decreaseMonth}
								disabled={
									prevMonthButtonDisabled
								}
								type="button">
								{"<"}
							</button>
							<select
								value={new Date(
									date
								).getFullYear()}
								onChange={({
									target: { value },
								}) =>
									changeYear(
										Number(value)
									)
								}>
								{years.map(option => (
									<option
										key={option}
										value={option}>
										{option}
									</option>
								))}
							</select>

							<select
								value={
									months[
										new Date(
											date
										).getMonth()
									]
								}
								onChange={({
									target: { value },
								}) =>
									changeMonth(
										months.indexOf(
											value
										)
									)
								}>
								{months.map(option => (
									<option
										key={option}
										value={option}>
										{option}
									</option>
								))}
							</select>

							<button
								onClick={increaseMonth}
								disabled={
									nextMonthButtonDisabled
								}
								type="button">
								{">"}
							</button>
						</div>
					)
				}}
			/>
			{error && <span>{error}</span>}
		</div>
	)
}

export default DatePickerComponent
