/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isPlainObject, isString } from 'lodash'

export const getErrorKey = (error: unknown): string | undefined => {
  if (!isPlainObject(error)) {
    return undefined
  }

  const errorObj = error as Record<string, unknown>

  if (!isPlainObject(errorObj.data)) {
    return undefined
  }

  const data = errorObj.data as Record<string, unknown>

  if (isString(data.errorKey)) {
    return data.errorKey
  }

  return undefined
}
