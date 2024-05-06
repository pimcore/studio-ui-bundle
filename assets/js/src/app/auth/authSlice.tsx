import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { type User } from '@Pimcore/components/login-form/services/auth'
import { type RootState } from '@Pimcore/components/login-form/store'

interface AuthState {
  user: User | null
  token: string | null
}

const initialState: AuthState = {
  user: null,
  token: null

}

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      {
        payload: { user, token }
      }: PayloadAction<{ user: User, token: string }>
    ) => {
      state.user = user
      state.token = token
    }
  }
})

export const { setCredentials } = slice.actions

export const authReducer = slice.reducer

export const selectCurrentUser = (state: RootState): User | null => state.auth.user
