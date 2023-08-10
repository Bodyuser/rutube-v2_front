import { createAsyncThunk } from "@reduxjs/toolkit"
import { toastr } from "react-redux-toastr"

import { IUserProfile } from "@/shared/types/user/user.types"
import { AuthService } from "@/services/auth/auth.service"

import { ToastError } from "@/utils/toatsr-error/ToastrError"

import { returnError } from "@/helpers/api.helper"
import {
	IFacebook,
	ILogin,
	IRegister,
} from "@/services/auth/auth.types"

export const Login = createAsyncThunk<
	IUserProfile,
	ILogin
>(
	"auth/login",
	async (data, thunkApi) => {
		try {
			const response =
				await AuthService.login(data)

			toastr.success(
				"Вход",
				"Прошел успешно"
			)

			return response
		} catch (error) {
			ToastError(error, "Вход")
			return thunkApi.rejectWithValue(
				error
			)
		}
	}
)

export const Register =
	createAsyncThunk<
		IUserProfile,
		IRegister
	>(
		"auth/register",
		async (data, thunkApi) => {
			try {
				const response =
					await AuthService.register(
						data
					)

				toastr.success(
					"Регистрация",
					"Прошла успешно"
				)
				return response
			} catch (error) {
				ToastError(error, "Регистрация")
				return thunkApi.rejectWithValue(
					error
				)
			}
		}
	)

export const LogOut = createAsyncThunk(
	"auth/logout",
	async (_, thunkApi) => {
		try {
			await AuthService.logout()

			toastr.success(
				"Выход из системы",
				"Прошел успешно"
			)
			return
		} catch (error) {
			ToastError(
				error,
				"Выход из системы"
			)
			return thunkApi.rejectWithValue(
				error
			)
		}
	}
)

export const GetNewToken =
	createAsyncThunk<IUserProfile>(
		"auth/get-new-token",
		async (_, thunkApi) => {
			try {
				return await AuthService.getNewToken()
			} catch (error) {
				if (
					returnError(error) ===
					"jwt expired"
				) {
					thunkApi.dispatch(LogOut())
				}
				return thunkApi.rejectWithValue(
					error
				)
			}
		}
	)

export const ResetPassword =
	createAsyncThunk<
		string,
		{
			password: string
			resetPasswordLink: string
		}
	>(
		"auth/reset-password",
		async (
			{ password, resetPasswordLink },
			thunkApi
		) => {
			try {
				const response =
					await AuthService.resetPassword(
						{ password },
						resetPasswordLink
					)

				toastr.success(
					"Сброс пароля",
					"Прошел успешно"
				)
				return response
			} catch (error) {
				ToastError(
					error,
					"Сброс пароля"
				)
				return thunkApi.rejectWithValue(
					error
				)
			}
		}
	)

export const AuthByGoogle =
	createAsyncThunk<
		IUserProfile,
		string
	>(
		"auth/google",
		async (token, thunkApi) => {
			try {
				const response =
					await AuthService.authByGoogle(
						token
					)

				toastr.success(
					"Авторизация через Гугл",
					"Прошел успешно"
				)

				return response
			} catch (error) {
				ToastError(
					error,
					"Авторизация через Гугл"
				)
				return thunkApi.rejectWithValue(
					error
				)
			}
		}
	)

export const AuthByFacebook =
	createAsyncThunk<
		IUserProfile,
		IFacebook
	>(
		"auth/facebook",
		async (data, thunkApi) => {
			try {
				const response =
					await AuthService.authByFacebook(
						data
					)

				toastr.success(
					"Авторизация через Фейсбук",
					"Прошел успешно"
				)

				return response
			} catch (error) {
				ToastError(
					error,
					"Авторизация через Фейсбук"
				)
				return thunkApi.rejectWithValue(
					error
				)
			}
		}
	)
