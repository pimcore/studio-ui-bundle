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

// Related objects per grid request. Larger requests cost less per row.
export const VISIBLE_FIELDS_CHUNK_SIZE = 200

// Related objects in the first request of a class: small, so the rows on screen get their values quickly.
export const VISIBLE_FIELDS_FIRST_CHUNK_SIZE = 50

// Grid requests per relation field running at the same time.
export const VISIBLE_FIELDS_MAX_PARALLEL = 3

export interface GridChunk {
  classId: string
  ids: number[]
}

const splitIntoChunks = <T>(items: T[], chunkSize: number, firstChunkSize: number): T[][] =>
  items.length === 0 ? [] : [items.slice(0, firstChunkSize), ...chunk(items.slice(firstChunkSize), chunkSize)]

export const buildGridChunks = (
  dataValue: ManyToManyRelationValue | null | undefined,
  classIds: string[],
  chunkSize: number,
  firstChunkSize: number = chunkSize
): GridChunk[] => {
  const positions = map(dataValue ?? [], (item, position) => ({ id: item.id, subtype: item.subtype, position }))

  const chunks = flatMap(classIds, classId => map(
    splitIntoChunks(positions.filter(item => item.subtype === classId), chunkSize, firstChunkSize),
    items => ({ classId, ids: map(items, 'id'), firstPosition: items[0].position })
  ))

  return map(sortBy(chunks, 'firstPosition'), ({ classId, ids }) => ({ classId, ids }))
}
