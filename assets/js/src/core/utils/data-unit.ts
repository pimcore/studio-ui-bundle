/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

export function formatDataUnit (bytes: number, precision: number = 2): string {
  if (bytes === 0) return '0 B'

  const units: string[] = ['B', 'KB', 'MB', 'GB', 'TB']

  let pow: number = Math.floor(Math.log(bytes) / Math.log(1000))
  pow = Math.min(pow, units.length - 1)

  bytes /= Math.pow(1000, pow)

  return `${bytes.toFixed(precision)} ${units[pow]}`
}
