/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { chunk, isEmpty, isNil } from 'lodash'
import { type ManyToManyRelationValue } from '@Pimcore/components/many-to-many-relation'
import { getTypedVisibleFieldsKey } from '@Pimcore/components/many-to-many-relation/utils/visible-fields-key'
import { mapToElementType, mapToLegacyElementType } from '@Pimcore/modules/element/utils/element-type'

export interface RelationVisibleFieldElement {
  type: string
  id: number
}

/**
 * The related elements of a relation in relation order, each once, split into requests: a small first one,
 * so the rows on screen get their values quickly, then larger ones. Unlike the object relation types the
 * rows are not split by class - one request covers every element type and class.
 */
export const buildRelationVisibleFieldChunks = (
  dataValue: ManyToManyRelationValue | null | undefined,
  chunkSize: number,
  firstChunkSize: number = chunkSize
): RelationVisibleFieldElement[][] => {
  const seen = new Set<string>()
  const elements: RelationVisibleFieldElement[] = []

  for (const item of dataValue ?? []) {
    const elementType = mapToElementType(item.type)
    if (isNil(item.id) || elementType === null) {
      continue
    }

    const type = mapToLegacyElementType(elementType)
    const key = getTypedVisibleFieldsKey(type, item.id)
    if (!seen.has(key)) {
      seen.add(key)
      elements.push({ type, id: item.id })
    }
  }

  if (isEmpty(elements)) {
    return []
  }

  return [elements.slice(0, firstChunkSize), ...chunk(elements.slice(firstChunkSize), chunkSize)].filter((items) => !isEmpty(items))
}
