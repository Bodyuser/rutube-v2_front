import {
	FC,
	PropsWithChildren,
} from "react"
import { Provider } from "react-redux"
import ReduxToastr from "react-redux-toastr"
import { GoogleOAuthProvider } from "@react-oauth/google"

import AuthProvider from "../auth-provider/AuthProvider"
import { TypeComponentAuthField } from "@/shared/types/props-page/props-page.types"
import Head from "next/head"
import { title } from "@/constants/seo.constants"
import { ApiProvider } from "@reduxjs/toolkit/query/react"
import { api } from "@/redux/api/api"
import { store } from "@/redux/store/store"
import Layout from "@/components/layout/Layout"

const MainProvider: FC<
	PropsWithChildren<TypeComponentAuthField>
> = ({ children, Component }) => {
	return (
		<>
			<Head>
				{Component.title && (
					<title>
						{title(Component.title)}
					</title>
				)}
				{Component.description && (
					<meta
						name="description"
						content={
							Component.description
						}
					/>
				)}
				{!Component.title &&
					!Component.description && (
						<meta
							name="robots"
							content="noindex"
						/>
					)}
				<link
					rel="icon"
					href="https://static.rutube.ru/static/favicon.ico"
					type="image/x-icon"
				/>
			</Head>
			<ApiProvider api={api}>
				<GoogleOAuthProvider
					clientId={
						process.env.CLIENT_ID || ""
					}>
					<Provider store={store}>
						<ReduxToastr
							newestOnTop={false}
							preventDuplicates
							progressBar
							closeOnToastrClick
							timeOut={5000}
							transitionIn="fadeIn"
							className="modal"
							transitionOut="fadeOut"
						/>
						<AuthProvider
							Component={Component}>
							<Layout>
								{children}
							</Layout>
						</AuthProvider>
					</Provider>
				</GoogleOAuthProvider>
			</ApiProvider>
		</>
	)
}

export default MainProvider
