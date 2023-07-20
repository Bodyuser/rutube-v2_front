import * as AuthActions from '../components/user/users/auth.actions'
import * as UsersActions from '../components/user/users/users.actions'

export const RootActions = {
	...AuthActions,
	...UsersActions
}
