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

/**
 * Log a warning and show a toast!
 */

export const rtkQueryErrorLogger: Middleware =
    (api: MiddlewareAPI) => (next) => (action) => {
      // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
      if (isRejectedWithValue(action)) {
        console.log('We got a rejected action! ', action)
        // modal.error({
        //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //   // @ts-expect-error
        //   content:
        //     'data' in action.error
        //       ? (action.error.data as { message: string }).message
        //       : action.error.message
        // })
      }

      return next(action)
    }
