/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isArray, isEmpty, isNil, isPlainObject, isString } from 'lodash'
import { type DataObjectGetSearchApiResponse } from '@Pimcore/modules/search/search-api-slice.gen'
import { type ManyToManyRelationValueItem } from '@Pimcore/components/many-to-many-relation/hooks/use-value'
import { type VisibleFieldDefinition } from '../../many-to-many-object-relation'

export type SearchItem = NonNullable<DataObjectGetSearchApiResponse['items']>[number]

const isBlankColumnValue = (v: unknown): boolean => {
  if (isNil(v)) return true
  if (isString(v)) return isEmpty(v) || v === 'null'
  if (isArray(v) || isPlainObject(v)) return isEmpty(v)
  return false
}

export const buildLabel = (item: SearchItem, resolvedVisibleDefs: VisibleFieldDefinition[]): string => {
  const fullpath = item.columns?.find(c => c.key === 'fullpath')?.value as string ?? String(item.id)
  if (resolvedVisibleDefs.length === 0) return fullpath

  return resolvedVisibleDefs
    .map(fd => {
      const v = item.columns?.find(c => c.key === fd.key)?.value
      if (isBlankColumnValue(v)) return '-'
      return isArray(v) || isPlainObject(v) ? JSON.stringify(v) : String(v)
    })
    .join(', ')
}

export const processItems = (
  items: SearchItem[],
  resolvedVisibleDefs: VisibleFieldDefinition[],
  itemMap: Map<number, ManyToManyRelationValueItem>
): Map<number, string> => {
  const newLabels = new Map<number, string>()
  items.forEach(item => {
    if (item.id === undefined) return
    const fullpath = item.columns?.find(c => c.key === 'fullpath')?.value as string ?? String(item.id)
    const classname = item.columns?.find(c => c.key === 'classname')?.value as string ?? 'object'
    itemMap.set(item.id, {
      id: item.id,
      type: 'object',
      subtype: classname,
      fullPath: fullpath,
      isPublished: null
    })
    newLabels.set(item.id, buildLabel(item, resolvedVisibleDefs))
  })
  return newLabels
}
