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

export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
      const message =
      'data' in action.error
        ? (action.error.data as { message: string }).message
        : action.error.message

      const payload: Record<string, any> =
      action.payload !== null && typeof action.payload === 'object'
        ? action.payload
        : {}

      const errorPayload = { message, ...payload }

      api.dispatch({ type: 'apiError/add', payload: errorPayload })
    }

    return next(action)
  }
