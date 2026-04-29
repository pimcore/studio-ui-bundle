/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type VisibleFieldDefinition } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/many-to-many-object-relation/many-to-many-object-relation'
import { type ColumnDef, createColumnHelper, type IdentifiedColumnDef } from '@tanstack/react-table'
import type { ManyToManyRelationValueItem } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/many-to-many-relation/hooks/use-value'

import { isNonEmptyString } from '@Pimcore/utils/type-utils'
import { type GridColumnData } from '@Pimcore/modules/data-object/data-object-api-slice.gen'
import { renderFullPathCell } from '@Pimcore/components/many-to-many-relation/utils/full-path-cell-renderer'

interface IVisibleFieldsToColumnDefinitionsProps {
  visibleFieldDefinitions?: VisibleFieldDefinition[]
  disabled: boolean
  pathFormatterClass: string
  transformGridColumn: (column: VisibleFieldDefinition, disabled: boolean) => IdentifiedColumnDef<unknown, never>
  userLanguage: string | null
}

/**
 * Encode a column id as JSON matching the format expected by decodeColumnIdentifier
 * in use-column-mapper.tsx: { key, locale }
 */
export const encodeColumnId = (key: string, locale: string | null | undefined): string => {
  return JSON.stringify({
    key: key.replaceAll('.', '**'),
    locale: locale ?? null
  })
}

export const visibleFieldsToColumnDefinitions = ({ visibleFieldDefinitions, disabled, pathFormatterClass, transformGridColumn, userLanguage }: IVisibleFieldsToColumnDefinitionsProps): Array<ColumnDef<any>> => {
  const columnDefinition: Array<ColumnDef<any>> = []
  const columnHelper = createColumnHelper()

  for (const column of visibleFieldDefinitions ?? []) {
    const baseColumn = transformGridColumn(column, disabled)
    const locale = column.localizable ? userLanguage : null
    columnDefinition.push(
      columnHelper.accessor(column.key, {
        ...baseColumn,
        id: encodeColumnId(column.key, locale),
        ...(isNonEmptyString(pathFormatterClass) && baseColumn.meta?.columnKey === 'fullpath' ? { cell: renderFullPathCell } : {})
      })
    )
  }

  return columnDefinition
}

export const enrichRowData = (visibleFieldDefinitions: VisibleFieldDefinition[] | undefined, row: ManyToManyRelationValueItem, rowData: GridColumnData[]): ManyToManyRelationValueItem & Record<string, any> => {
  const additionalColumns = {}

  for (const field of visibleFieldDefinitions ?? []) {
    const key = field.key
    const value = rowData?.find(item => item.key === key)?.value

    if (key === 'fullpath') {
      additionalColumns[key] = row.fullPath
    } else if (key === 'classname') {
      additionalColumns[key] = row.subtype
    } else if (key !== 'id') {
      additionalColumns[key] = value
    }
  }

  return {
    ...row,
    ...additionalColumns,
    '__api-data': { columns: rowData }
  }
}
