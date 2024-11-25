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

import { isRejectedWithValue } from '@reduxjs/toolkit'
import type { MiddlewareAPI, Middleware } from '@reduxjs/toolkit'
import { isObject } from 'lodash'

interface IBaseQueryMeta {
  request: { url?: string }
}

export interface IApiErrorPayload {
  meta: {
    baseQueryMeta?: IBaseQueryMeta
  }
  payload: unknown
}

export interface IApiErrorData {
  requestUrl?: string
  data?: {
    detail?: string
    message?: string
  }
  status?: number
}

export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action: IApiErrorPayload) => {
    if (isRejectedWithValue(action)) {
      const requestUrl = action.meta?.baseQueryMeta?.request?.url
      const payload = isObject(action?.payload) && action.payload

      const errorPayload: IApiErrorData = { requestUrl, ...payload }

      api.dispatch({ type: 'apiError/add', payload: errorPayload })
    }

    return next(action)
  }
