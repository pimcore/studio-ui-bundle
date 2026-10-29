/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isEmpty, isString, last } from 'lodash'

/**
 * Names the element a grid export was started from, so its job notification can be told apart from other exports.
 * That is the last segment of the element's path (its key); the tree root ('/') is named by the path itself.
 */
export const getExportContextName = (fullPath: unknown): string | undefined => {
  if (!isString(fullPath) || isEmpty(fullPath)) {
    return undefined
  }

  const key = last(fullPath.split('/').filter((segment) => !isEmpty(segment)))

  return key ?? fullPath
}
