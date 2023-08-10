import MainProvider from "@/providers/main-provider/MainProvider"
import "@/assets/styles/globals.scss"
import type { AppProps } from "next/app"
import {
	Seo,
	TypeRoles,
} from "@/shared/types/props-page/props-page.types"
import "react-datepicker/dist/react-datepicker.css"
import "plyr-react/plyr.css"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"

type AppPropsAuth = AppProps &
	TypeRoles &
	Seo

export function App({
	Component,
	pageProps,
}: AppPropsAuth) {
	return (
		// @ts-ignore
		<MainProvider Component={Component}>
			<Component {...pageProps} />
		</MainProvider>
	)
}

export default App
