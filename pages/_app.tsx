import MainProvider from "@/providers/main-provider/MainProvider"
import "@/assets/styles/globals.scss"
import type { AppProps } from "next/app"
import { TypeRoles } from "@/shared/types/props-page/props-page.types"


type AppPropsAuth = AppProps & TypeRoles

export default function App({
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
