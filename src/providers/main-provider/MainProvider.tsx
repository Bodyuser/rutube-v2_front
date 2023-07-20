import Layout from "@/components/layout/Layout"
import { store } from "@/redux/store/store"
import {
	FC,
	PropsWithChildren,
} from "react"
import { Provider } from "react-redux"
import ReduxToastr from "react-redux-toastr"
import { GoogleOAuthProvider } from "@react-oauth/google"
import {
	QueryClient,
	QueryClientProvider,
} from "@tanstack/react-query"
import AuthProvider from "../auth-provider/AuthProvider"
import { TypeComponentAuthField } from "@/shared/types/props-page/props-page.types"

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 0,
		},
	},
})

const MainProvider: FC<
	PropsWithChildren<TypeComponentAuthField>
> = ({ children, Component }) => {
	return (
		<QueryClientProvider
			client={queryClient}>
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
						<Layout>{children}</Layout>
					</AuthProvider>
				</Provider>
			</GoogleOAuthProvider>
		</QueryClientProvider>
	)
}

export default MainProvider
