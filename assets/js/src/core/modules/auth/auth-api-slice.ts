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

export interface IUser {
  username: string
  roles: string[]
}

export interface ILoginRequest {
  username: string
  password: string
}

export const authApi = api
  .injectEndpoints({
    endpoints: (builder) => ({
      login: builder.mutation<IUser, ILoginRequest>({
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
