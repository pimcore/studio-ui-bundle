/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type ColumnDef } from '@tanstack/react-table'
import { isNil, isString, isUndefined } from 'lodash'
import type { TFunction } from 'i18next'
import type { SelectedColumn } from '@Pimcore/modules/element/listing/abstract/configuration-layer/provider/selected-columns/selected-columns-provider'
import type { DisplayManyToManyRelationValueItem } from '../../hooks/use-value'
import type { RelationFilterColumn, VisibleFieldsMap } from '../types'

/** Columns that carry actions or grid controls instead of data. */
const NON_FILTERABLE_COLUMN_IDS = ['actions', 'selection', 'drag-handle']

/**
 * Value keys that are served by the relation item itself instead of the visible
 * fields data - the same mapping `enrichRowData` applies to the grid rows.
 */
const RELATION_ITEM_VALUE_KEYS: Record<string, keyof DisplayManyToManyRelationValueItem> = {
  id: 'id',
  fullPath: 'fullPath',
  fullpath: 'fullPath',
  type: 'type',
  subtype: 'subtype',
  classname: 'subtype'
}

/**
 * The columns the relation grid renders on its own. Everything else is
 * described by the column configuration and resolved dynamically.
 */
const RELATION_COLUMNS: Array<Pick<RelationFilterColumn, 'key' | 'valueKey' | 'type'> & { translationKey: string }> = [
  { key: 'id', valueKey: 'id', type: 'id', translationKey: 'relations.id' },
  { key: 'fullPath', valueKey: 'fullPath', type: 'string', translationKey: 'relations.reference' },
  { key: 'type', valueKey: 'type', type: 'string', translationKey: 'relations.type' },
  { key: 'subtype', valueKey: 'subtype', type: 'string', translationKey: 'relations.subtype' }
]

export const getDefaultRelationFilterColumns = (t: TFunction): RelationFilterColumn[] => {
  return RELATION_COLUMNS.map(({ key, valueKey, type, translationKey }) => ({
    key,
    valueKey,
    type,
    title: t(translationKey)
  }))
}

export const getColumnId = (column: ColumnDef<any>): string | undefined => {
  if (!isNil(column.id)) {
    return column.id
  }

  return 'accessorKey' in column && isString(column.accessorKey) ? column.accessorKey : undefined
}

const getColumnTitle = (column: ColumnDef<any>, fallback: string): string => {
  return isString(column.header) && column.header !== '' ? column.header : fallback
}

/**
 * Candidates for a filter: every rendered column paired with its column
 * configuration. Whether a candidate can actually be filtered is decided by the
 * field filter its type resolves to - see `useFilterableColumns`.
 */
export const getFilterColumnCandidates = (
  columnDefinition: Array<ColumnDef<any>> | undefined,
  t: TFunction,
  decodeColumn?: (columnId: string) => SelectedColumn | undefined
): RelationFilterColumn[] => {
  if (isUndefined(columnDefinition)) {
    return getDefaultRelationFilterColumns(t)
  }

  const relationColumns = getDefaultRelationFilterColumns(t)
  const candidates: RelationFilterColumn[] = []

  for (const column of columnDefinition) {
    const key = getColumnId(column)

    if (isUndefined(key) || NON_FILTERABLE_COLUMN_IDS.includes(key)) {
      continue
    }

    const selectedColumn = decodeColumn?.(key)

    if (!isUndefined(selectedColumn) && !isUndefined(selectedColumn?.key)) {
      candidates.push({
        key,
        valueKey: selectedColumn.key,
        title: getColumnTitle(column, selectedColumn.key),
        type: selectedColumn.type,
        frontendType: selectedColumn.frontendType,
        config: selectedColumn.config
      })

      continue
    }

    // A column the relation grid brings itself, e.g. when it is used without a
    // column configuration.
    const relationColumn = relationColumns.find((candidate) => candidate.key === key)

    if (!isUndefined(relationColumn)) {
      candidates.push({ ...relationColumn, title: getColumnTitle(column, relationColumn.title) })
    }
  }

  return candidates
}

export const buildVisibleFieldsMap = (visibleFieldsValue?: Array<Record<string, any> | undefined>): VisibleFieldsMap | undefined => {
  if (isNil(visibleFieldsValue)) {
    return undefined
  }

  return new Map(
    visibleFieldsValue
      .filter((field): field is Record<string, any> => !isUndefined(field) && !isNil(field?.id))
      .map((field) => [field.id as number, field])
  )
}

export const resolveRowValue = (
  item: DisplayManyToManyRelationValueItem,
  column: RelationFilterColumn,
  visibleFieldsMap?: VisibleFieldsMap
): unknown => {
  const relationItemKey = RELATION_ITEM_VALUE_KEYS[column.valueKey]

  if (!isUndefined(relationItemKey)) {
    return item[relationItemKey]
  }

  return visibleFieldsMap?.get(item.id)?.[column.valueKey]
}
