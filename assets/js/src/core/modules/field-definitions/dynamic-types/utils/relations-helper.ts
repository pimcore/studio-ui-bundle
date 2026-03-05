/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isArray, isString } from 'lodash'

// Utilities to reuse with Form.Item getValueFromEvent / getValueProps for multi-selects
// that are stored as arrays of objects with a single key.

export type PrimitiveValue = string | number | boolean
export type SingleKeyObject<K extends string = string, V extends PrimitiveValue = string> = Record<K, V>

/**
 * Factory that returns a transformer suitable for Form.Item `getValueFromEvent`.
 * It converts an array of primitive values (e.g. from Select[multiple]) into
 * an array of objects with a single configured key.
 *
 * Example: relationArrayToObjects('documentTypes')(['snippet', 'newsletter']) →
 *   [{ documentTypes: 'snippet' }, { documentTypes: 'newsletter' }]
 */
export const relationArrayToObjects = <K extends string>(key: K) => (values: string[] | undefined | null): Array<SingleKeyObject<K, string>> => {
  if (!isArray(values)) {
    return []
  }
  return values.map((v) => ({ [key]: v } as unknown as SingleKeyObject<K, string>))
}

/**
 * Factory that returns a transformer suitable for Form.Item `getValueProps`.
 * It converts an array of single-key objects back to the value shape consumed
 * by Select[multiple], i.e. `{ value: string[] }`.
 *
 * Example: relationObjectsToValueProps('documentTypes')([{ documentTypes: 'snippet' }]) →
 *   { value: ['snippet'] }
 */
export const relationObjectsToValueProps = <K extends string>(key: K) => (
  value: Array<SingleKeyObject<K, string>> | undefined | null
): { value: string[] } => {
  const result: string[] = isArray(value)
    ? value.map((item) => item?.[key]).filter((v): v is string => isString(v))
    : []
  return { value: result }
}

/**
 * Returns properties for Form.Item that handle the transformation
 * between a multi-select array and an array of objects.
 */
export const relationSelectFormItemTransformation = (key: string): {
  getValueFromEvent: (values: string[]) => Array<SingleKeyObject<string, string>>
  getValueProps: (value: Array<SingleKeyObject<string, string>>) => { value: string[] }
} => {
  return {
    getValueFromEvent: relationArrayToObjects(key),
    getValueProps: relationObjectsToValueProps(key)
  }
}
