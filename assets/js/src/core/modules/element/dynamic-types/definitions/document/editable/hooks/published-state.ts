/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

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
  const key = getPublishedStateKey(reference)
  const isPublished = key === null ? undefined : states[key]

  return isPublished === undefined ? reference : { ...reference, isPublished }
}
