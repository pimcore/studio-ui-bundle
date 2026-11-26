/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isBoolean, omit } from 'lodash'
import { mapToElementType } from '@Pimcore/modules/element/utils/element-type'

export interface PublishedStateReference {
  id: number
  type: string
  isPublished?: boolean | null
}

/** Published state per element, keyed by `getPublishedStateKey()`; null when it could not be determined. */
export type PublishedStates = Record<string, boolean | null>

export const getPublishedStateKey = (reference: Pick<PublishedStateReference, 'id' | 'type'>): string | null => {
  const elementType = mapToElementType(reference.type)

  return elementType === null ? null : `${elementType}:${reference.id}`
}

/** Returns the reference with the looked up published state, or the reference itself while there is none. */
export const withPublishedState = <T extends PublishedStateReference>(reference: T, states: PublishedStates): T => {
  if (isBoolean(reference.isPublished)) {
    return reference
  }

  const key = getPublishedStateKey(reference)
  const isPublished = key === null ? undefined : states[key]

  return isPublished === undefined ? reference : { ...reference, isPublished }
}

/**
 * Takes the looked up published state off a reference again, so that it is not written
 * back into the editable's value: the reference gets the state it had as stored.
 */
export const withoutLookedUpPublishedState = <T extends PublishedStateReference>(
  reference: T,
  stored: PublishedStateReference[],
  states: PublishedStates
): T => {
  const key = getPublishedStateKey(reference)

  if (key === null || states[key] === undefined) {
    return reference
  }

  const storedReference = stored.find((item) => getPublishedStateKey(item) === key)

  if (storedReference === undefined || isBoolean(storedReference.isPublished)) {
    return reference
  }

  return 'isPublished' in storedReference
    ? { ...reference, isPublished: storedReference.isPublished }
    : omit(reference, 'isPublished') as T
}
