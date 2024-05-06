import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from '@Pimcore/app/auth/authSlice';
import {api} from "@Pimcore/components/login-form/services/auth";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
