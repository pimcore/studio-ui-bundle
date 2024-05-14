import { api } from '@Pimcore/app/api/pimcore'

export interface User {
  username: string
  firstname?: string
  lastname?: string
  email?: string
}

export interface IGenericAuthResponse {
  token: string
  lifetime: number
  username: string
}

export interface LoginRequest {
  username: string
  password: string
}

export interface IRefreshRequest {
  token: string
}

export const authApi = api
  .injectEndpoints({
    endpoints: (builder) => ({
      login: builder.mutation<IGenericAuthResponse, LoginRequest>({
        query: (credentials) => ({
          url: 'studio/api/login',
          method: 'POST',
          body: credentials
        })
      }),
      refresh: builder.mutation<IGenericAuthResponse, IRefreshRequest>({
        query: (token) => ({
          url: 'studio/api/refresh',
          method: 'POST',
          body: token
        })
      })
    }),
    overrideExisting: false
  })

export { authApi as api }
export const { useLoginMutation, useRefreshMutation } = authApi
