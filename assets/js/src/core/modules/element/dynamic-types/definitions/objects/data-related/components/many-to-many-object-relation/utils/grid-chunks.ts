/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { chunk, flatMap, map, sortBy } from 'lodash'
import { type ManyToManyRelationValue } from '@Pimcore/components/many-to-many-relation'

// Related objects per grid request: small enough that the rows on screen get their values quickly.
export const VISIBLE_FIELDS_CHUNK_SIZE = 100

// Grid requests per relation field running at the same time.
export const VISIBLE_FIELDS_MAX_PARALLEL = 2

export interface GridChunk {
  classId: string
  ids: number[]
}

export const buildGridChunks = (
  dataValue: ManyToManyRelationValue | null | undefined,
  classIds: string[],
  chunkSize: number
): GridChunk[] => {
  const positions = map(dataValue ?? [], (item, position) => ({ id: item.id, subtype: item.subtype, position }))

  const chunks = flatMap(classIds, classId => map(
    chunk(positions.filter(item => item.subtype === classId), chunkSize),
    items => ({ classId, ids: map(items, 'id'), firstPosition: items[0].position })
  ))

  return map(sortBy(chunks, 'firstPosition'), ({ classId, ids }) => ({ classId, ids }))
}
