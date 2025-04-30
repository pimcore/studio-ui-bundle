/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

export interface QueryParameter {
  key: string
  value: string
}

export function buildQueryString (
  keyValues: QueryParameter[],
  invalidValues = ['']
): string {
  const queryParameters: string[] = []
  for (const obj of keyValues) {
    if (!invalidValues.includes(obj.value)) {
      queryParameters.push(`${obj.key}=${obj.value}`)
    }
  }
  return queryParameters.join('&')
}
