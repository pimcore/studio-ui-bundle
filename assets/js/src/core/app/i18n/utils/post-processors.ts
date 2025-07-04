/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

/**
 * i18next post-processor that returns the key if the translation value is empty
 * Used consistently across main app and iframe i18n setup
 */
export const returnKeyIfEmptyProcessor = {
  type: 'postProcessor' as const,
  name: 'returnKeyIfEmpty',
  process (value: string, key: string | string[], options: any, translator: any): string {
    let returnValue = value

    if (value === '') {
      returnValue = key as string

      if (Array.isArray(key)) {
        returnValue = key[0]
      }
    }

    if (typeof returnValue !== 'string') {
      try {
        returnValue = JSON.stringify(returnValue)
      } catch (e) {
        console.warn(`Translation key '${key}' with value '${value}' is not translatable`)
        return Array.isArray(key) ? key[0] : key
      }
    }

    return returnValue
  }
}
