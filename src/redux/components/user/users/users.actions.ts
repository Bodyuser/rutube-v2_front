import { UserService } from "@/services/users/users.service"
import { IUpdateProfile } from "@/services/users/users.types"
import { IUserProfile } from "@/shared/types/user/user.types"
import { ToastError } from "@/utils/toatsr-error/ToastrError"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { toastr } from "react-redux-toastr"

export const GetProfile =
	createAsyncThunk<
		IUserProfile		
	>(
		"users/get-profile",
		async (_, thunkApi) => {
			try {
				const response =
					await UserService.getProfile(
						
					)
					
				return response
			} catch (error) {
				ToastError(error)
				return thunkApi.rejectWithValue(
					error
				)
			}
		}
	)


  export const UpdateProfile =
		createAsyncThunk<IUserProfile, IUpdateProfile>(
			"users/update-profile",
			async (data, thunkApi) => {
				try {
					const response =
						await UserService.updateProfile(data)

          toastr.success("Update profile", "Completed successfully")

					return response
				} catch (error) {
					ToastError(error)
					return thunkApi.rejectWithValue(
						error
					)
				}
			}
  )
    
   export const DeleteProfile =
			createAsyncThunk<
				string
			>(
				"users/delete-profile",
				async (_, thunkApi) => {
					try {
						const response =
							await UserService.deleteProfile(
							)

						toastr.success(
							"Delete profile",
							"Completed successfully"
						)

						return response
					} catch (error) {
						ToastError(error)
						return thunkApi.rejectWithValue(
							error
						)
					}
				}
  )
      
  export const FollowingUnFollowing =
		createAsyncThunk<string, string>(
			"users/following-unfollowing",
			async (id, thunkApi) => {
				try {
					const response =
						await UserService.followingUnFollowing(id)

					toastr.success(
						`${response} profile`,
						"Completed successfully"
					)

					return response
				} catch (error) {
					ToastError(error)
					return thunkApi.rejectWithValue(
						error
					)
				}
			}
		)
