/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isEmpty, isPlainObject } from 'lodash'

/** The groups of a store, which the backend sends as a list or as a map keyed by id. */
export const normalizeGroups = (value: unknown): any[] => {
  if (Array.isArray(value)) {
    return value
  }

  if (value != null && typeof value === 'object') {
    return Object.values(value)
  }

  return []
}

/**
 * Turns every level of a store path into a plain object: rc-field-form creates an array for
 * a numeric path segment and keeps an empty group an array, and an array that carries a key
 * id is lost on JSON.stringify.
 */
export const coerceObjectPath = (target: Record<string, any>, path: string[]): void => {
  let node = target

  path.forEach(segment => {
    if (!isPlainObject(node[segment])) {
      node[segment] = {}
    }

    node = node[segment]
  })
}

/**
 * A group without own values is encoded as an empty list, which must not win over keys. Every
 * other list is a value of its own and replaces the one it is merged over, because merging the
 * entries of a multiValue key by position keeps an entry the edit removed.
 */
export const preferKeys = (currentValue: unknown, incomingValue: unknown): unknown => {
  if (isPlainObject(currentValue) && Array.isArray(incomingValue) && isEmpty(incomingValue)) {
    return currentValue
  }

  if (Array.isArray(currentValue) || Array.isArray(incomingValue)) {
    return incomingValue
  }

  return undefined
}

/** The store's own levels in a descriptor path: the field, the group and the language bucket. */
const STORE_BUCKET_DEPTH = 3

export interface IStoreBucketPath {
  /** Levels of the fields the store sits in, e.g. the item index of a block; never reshaped. */
  wrapperPath: Array<string | number>
  /** The store's own levels, as the buckets the language comparison writes into. */
  storePath: string[]
}

/**
 * Splits the path of a comparison column into the fields the store sits in and the store's own
 * buckets, with the dynamic locale resolved.
 */
export const resolveBucketPath = (
  formPath: Array<string | number>,
  locale: string,
  localePlaceholder: string
): IStoreBucketPath => {
  const bucketPath = formPath.slice(0, -1)
  const wrapperLength = Math.max(bucketPath.length - STORE_BUCKET_DEPTH, 0)

  return {
    wrapperPath: bucketPath.slice(0, wrapperLength),
    // the group and key ids stay strings: a numeric path segment makes rc-field-form write
    // the value into an array instead of into the bucket
    storePath: bucketPath
      .slice(wrapperLength)
      .map(part => String(part === localePlaceholder ? locale : part))
  }
}
