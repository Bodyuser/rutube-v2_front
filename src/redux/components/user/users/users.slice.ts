import { createSlice } from "@reduxjs/toolkit"

import { IUserProfile } from "@/shared/types/user/user.types"

import { userState } from "../state"
import { DeleteProfile, FollowingUnFollowing, GetProfile, UpdateProfile } from "./users.actions"
import { AuthByFacebook, AuthByGoogle, GetNewToken, LogOut, Login, Register, ResetPassword } from "./auth.actions"

export const UsersSlice = createSlice({
	name: "users",
	initialState: userState,
	reducers: {
		setUser: (
			state,
			{
				payload,
			}: { payload: IUserProfile }
		) => {
			state.user = payload
		},
		setSocket: (state, { payload }) => {
			state.socket = payload
		},
		setIsJoin: (state, { payload }) => {
			state.isJoin = payload
		},
	},
	extraReducers: builder => {
		builder
			.addCase(
				GetProfile.pending,
				state => {
					state.isLoading = true
				}
			)
			.addCase(
				GetProfile.fulfilled,
				(state, { payload }) => {
					state.error = null
					state.isLoading = false
					state.user = payload
					state.isAuth = true
				}
			)
			.addCase(
				GetProfile.rejected,
				(state, { payload }) => {
					state.user = null
					state.isLoading = false
					state.error = payload
					state.isAuth = false
				}
			)
			.addCase(
				UpdateProfile.pending,
				state => {
					state.isLoading = true
				}
			)
			.addCase(
				UpdateProfile.fulfilled,
				(state, { payload }) => {
					state.error = null
					state.user = payload
					state.isLoading = false
					state.isAuth = true
				}
			)
			.addCase(
				UpdateProfile.rejected,
				(state, { payload }) => {
					state.user = null
					state.isLoading = false
					state.error = payload
					state.isAuth = false
				}
			)
			.addCase(
				DeleteProfile.pending,
				state => {
					state.isLoading = true
				}
			)
			.addCase(
				DeleteProfile.fulfilled,
				state => {
					state.error = null
					state.user = null
					state.isLoading = false
					state.isAuth = true
				}
			)
			.addCase(
				DeleteProfile.rejected,
				(state, { payload }) => {
					state.user = null
					state.error = payload
					state.isLoading = false
					state.isAuth = false
				}
			)
			.addCase(
				FollowingUnFollowing.pending,
				state => {
					state.isLoading = true
				}
			)
			.addCase(
				FollowingUnFollowing.fulfilled,
				state => {
					state.error = null
					state.isAuth = true
					state.isLoading = false
				}
			)
			.addCase(
				FollowingUnFollowing.rejected,
				(state, { payload }) => {
					state.user = null
					state.error = payload
					state.isAuth = false
					state.isLoading = false
				}
			)
			.addCase(
				Register.pending,
				state => {
					state.isLoading = true
				}
			)
			.addCase(
				Register.fulfilled,
				(state, { payload }) => {
					state.error = null
					state.isLoading = false
					state.user = payload
					state.isAuth = true
				}
			)
			.addCase(
				Register.rejected,
				(state, { payload }) => {
					state.user = null
					state.isLoading = false
					state.error = payload
					state.isAuth = false
				}
			)
			.addCase(Login.pending, state => {
				state.isLoading = true
			})
			.addCase(
				Login.fulfilled,
				(state, { payload }) => {
					state.error = null
					state.isLoading = false
					state.user = payload
					state.isAuth = true
				}
			)
			.addCase(
				Login.rejected,
				(state, { error }) => {
					state.user = null
					state.isLoading = false
					state.error = error
					state.isAuth = false
				}
			)
			.addCase(
				GetNewToken.pending,
				state => {
					state.isLoading = true
				}
			)
			.addCase(
				GetNewToken.fulfilled,
				(state, { payload }) => {
					state.error = null
					state.user = payload
					state.isLoading = false
					state.isAuth = true
				}
			)
			.addCase(
				GetNewToken.rejected,
				(state, { payload }) => {
					state.user = null
					state.error = payload
					state.isLoading = false
					state.isAuth = false
				}
			)
			.addCase(
				LogOut.pending,
				state => {
					state.isLoading = true
				}
			)
			.addCase(
				LogOut.fulfilled,
				state => {
					state.error = null
					state.isLoading = false
					state.user = null
					state.isAuth = false
				}
			)
			.addCase(
				LogOut.rejected,
				(state, { payload }) => {
					state.user = null
					state.error = payload
					state.isLoading = false
					state.isAuth = true
				}
			)
			.addCase(
				ResetPassword.pending,
				state => {
					state.isLoading = true
				}
			)
			.addCase(
				ResetPassword.fulfilled,
				state => {
					state.error = null
					state.isLoading = false
				}
			)
			.addCase(
				ResetPassword.rejected,
				(state, { payload }) => {
					state.error = payload
					state.isLoading = false
				}
			)
			.addCase(
				AuthByGoogle.pending,
				state => {
					state.isLoading = true
				}
			)
			.addCase(
				AuthByGoogle.fulfilled,
				(state, { payload }) => {
					state.error = null
					state.user = payload
					state.isLoading = false
					state.isAuth = true
				}
			)
			.addCase(
				AuthByGoogle.rejected,
				(state, { payload }) => {
					state.user = null
					state.error = payload
					state.isAuth = false
					state.isLoading = false
				}
			)
			.addCase(
				AuthByFacebook.pending,
				state => {
					state.isLoading = true
				}
			)
			.addCase(
				AuthByFacebook.fulfilled,
				(state, { payload }) => {
					state.error = null
					state.isLoading = false
					state.user = payload
					state.isAuth = true
				}
			)
			.addCase(
				AuthByFacebook.rejected,
				(state, { payload }) => {
					state.user = null
					state.isLoading = false
					state.error = payload
					state.isAuth = false
				}
			)
	},
})

export const { reducer } = UsersSlice
export const { setUser, setSocket, setIsJoin } =
	UsersSlice.actions
