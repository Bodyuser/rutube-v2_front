import { reducer as toastrReducer } from "react-redux-toastr"

import { reducer as UsersReducer } from "../components/user/users/users.slice"

export const rootReducer = {
	users: UsersReducer,
	toastr: toastrReducer,
}
