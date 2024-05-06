import { api } from '@Pimcore/app/api/pimcore'

export interface User {
  username: string
  firstname?: string
  lastname?: string
  email?: string
}

export interface UserResponse {
  token: string
  lifetime: number
  username: string
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
      })
    }),
    overrideExisting: false
  })

export { authApi as api }
export const { useLoginMutation } = authApi
