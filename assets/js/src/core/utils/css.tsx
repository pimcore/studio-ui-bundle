/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

export const toCssDimension = (value?: number | string | null, fallback?: number | string): string | undefined => {
  if (value === null || value === undefined || value === '' || value === 0) {
    if (fallback === undefined) {
      return undefined
    }
    value = fallback
  }

  return typeof value === 'number' ? `${value}px` : value
}
