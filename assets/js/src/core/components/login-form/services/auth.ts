/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

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
