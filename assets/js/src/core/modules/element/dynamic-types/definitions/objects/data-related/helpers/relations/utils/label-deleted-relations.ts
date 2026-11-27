/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { t } from 'i18next'
import { isObject } from 'lodash'

const SINGLE_RELATION = 'manyToOneRelation'
const MULTIPLE_RELATIONS = new Set(['manyToManyRelation', 'manyToManyObjectRelation'])

interface DeletedRelationEntry {
  id: number
  type: string
  isDeleted: true
}

const isDeletedEntry = (entry: unknown): entry is DeletedRelationEntry =>
  isObject(entry) && (entry as Partial<DeletedRelationEntry>).isDeleted === true

const labelEntry = (entry: unknown): unknown => {
  if (!isDeletedEntry(entry)) {
    return entry
  }

  return { ...entry, fullPath: t('version.deleted-relation', { type: entry.type, id: entry.id }) }
}

/**
 * A version keeps relations to elements that were deleted afterwards as entries marked with "isDeleted" and
 * without a path. They get a label instead, so the version shows which element the relation pointed to.
 */
export const labelDeletedRelations = (fieldtype: string, value: unknown): unknown => {
  if (fieldtype === SINGLE_RELATION) {
    return labelEntry(value)
  }

  if (MULTIPLE_RELATIONS.has(fieldtype) && Array.isArray(value)) {
    return value.map(labelEntry)
  }

  return value
}
