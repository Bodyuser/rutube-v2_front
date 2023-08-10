import { configureStore } from "@reduxjs/toolkit"

import { rootReducer } from "../reducers/root-reducer"
import { api } from "../api/api"

export const store = configureStore({
	reducer: rootReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: false,
		}).concat(api.middleware),
	devTools: true,
})


export type RootState = ReturnType<
	typeof store.getState
>
export type AppDispatch =
	typeof store.dispatch
