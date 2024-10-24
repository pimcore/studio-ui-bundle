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

export const isObject = (value: any): boolean => {
  const type = typeof value

  return value != null && (type === 'object' || type === 'function')
}

export const isString = (value: any): boolean => {
  if (value === undefined || value === null) return false

  return typeof value.valueOf() === 'string'
}

export const isNumber = (value: unknown): boolean => {
  return (
    typeof value === 'number' ||
    (typeof value === 'object' && value !== null && Object.prototype.toString.call(value) === '[object Number]')
  )
}

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
