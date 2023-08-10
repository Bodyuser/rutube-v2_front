import { reducer as toastrReducer } from "react-redux-toastr"

import { reducer as UsersReducer } from "../components/user/users/users.slice"
import { api } from "../api/api"

export const rootReducer = {
	users: UsersReducer,
	[api.reducerPath]: api.reducer,
	toastr: toastrReducer,
}
