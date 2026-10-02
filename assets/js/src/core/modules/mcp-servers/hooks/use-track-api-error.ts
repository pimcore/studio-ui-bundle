/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useEffect } from 'react'
import { isUndefined } from 'lodash'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'

/**
 * Reports an RTK Query error once, when it appears or changes. Call it once per query
 * and mutation: coalescing several errors into one value reports only the first, so a
 * persistent failure would mask every later one.
 */
export const useTrackApiError = (error: unknown): void => {
  useEffect(() => {
    if (!isUndefined(error)) {
      trackError(new ApiError(error as ConstructorParameters<typeof ApiError>[0]))
    }
  }, [error])
}
