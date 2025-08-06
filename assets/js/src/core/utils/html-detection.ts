/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isNil, isString } from 'lodash'

export const isHtmlContent = (value?: string | null): boolean => {
  if (isNil(value) || !isString(value) || value.trim() === '') {
    return false
  }

  return /<\/?[a-z][\s\S]*>/i.test(value)
}

export const hasLineBreaks = (value?: string | null): boolean => {
  if (isNil(value) || !isString(value)) {
    return false
  }

  return /\n/gm.test(value)
}
