import { api } from '@Pimcore/app/api/pimcore'

export interface User {
  username: string
  // token: string
}

export interface UserResponse {
  token: string
  lifetime: number
  user: User
}

export interface LoginRequest {
  username: string
  password: string
}

export const authApi = api
  .injectEndpoints({
    endpoints: (builder) => ({
      login: builder.mutation<UserResponse, LoginRequest>({
        query: (credentials) => ({
          url: 'studio/api/login',
          method: 'POST',
          body: credentials
        })
      }),
      protected: builder.mutation<{ message: string }, undefined>({
        query: () => 'protected'
      })
    }),
    overrideExisting: false
  })

export { authApi as api }
export const { useLoginMutation, useProtectedMutation } = authApi
