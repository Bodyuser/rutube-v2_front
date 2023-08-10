import {
	FC,
	PropsWithChildren,
} from "react"
import {
	AccordionBody,
	Accordion as AccordionComponent,
	AccordionHeader,
	AccordionItem,
} from "react-headless-accordion"

import { IAccordion } from "./accordion.interface"
import Icon from "../icon/Icon"
import cn from "classnames"
import styles from "./Accordion.module.scss"

const Accordion: FC<
	PropsWithChildren<IAccordion>
> = ({
	isOpen,
	title,
	children,
	setIsOpen,
	icon,
}) => {
	return (
		<AccordionComponent
			className={styles.accordion}>
			<AccordionItem isActive={isOpen}>
				<AccordionHeader
					className={cn(styles.header, {
						[styles.open]: isOpen,
					})}
					onClick={() =>
						setIsOpen(!isOpen)
					}
					as="div">
					<>
						<span>{title}</span>
						{icon && (
							<Icon name={icon} />
						)}
					</>
				</AccordionHeader>

				<AccordionBody
					className={cn(styles.body, {
						[styles.open]: isOpen,
					})}>
					<>{children}</>
				</AccordionBody>
			</AccordionItem>
		</AccordionComponent>
	)
}

export default Accordion
