/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isString, isEmpty, trim, isNil, isObject } from 'lodash'

// Difference from Lodash: primitive values like booleans and numbers are NOT considered empty
export const isEmptyValue = (value: unknown): boolean => {
  if (value === null || value === undefined) {
    return true
  }

  if (typeof value === 'object' && !Array.isArray(value)) {
    return Object.keys(value).length === 0
  }

  if (typeof value === 'object' && Array.isArray(value)) {
    return value.length === 0
  }

  if (typeof value === 'string') {
    return value.trim().length === 0
  }

  return false
}

/**
 * Checks if a value is a non-empty string (after trimming whitespace)
 */
export const isNonEmptyString = (value: unknown): value is string => {
  return isString(value) && !isEmpty(trim(value))
}

/**
 * Converts any value to a string representation.
 * Objects/arrays are JSON-stringified, nil values return empty string.
 */
export const toDisplayString = (value: unknown): string => {
  if (isNil(value)) {
    return ''
  }

  if (isString(value)) {
    return value
  }

  if (isObject(value)) {
    return JSON.stringify(value)
  }

  return String(value)
}
