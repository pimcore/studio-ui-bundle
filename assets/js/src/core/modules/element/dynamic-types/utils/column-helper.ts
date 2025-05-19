/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useInjection } from '@Pimcore/app/depency-injection'
import { type RelationColumnDefinition } from '../definitions/objects/data-related/components/advanced-many-to-many-object-relation/advanced-many-to-many-object-relation'
import { type DynamicTypeObjectDataRegistry } from '../definitions/objects/data-related/dynamic-type-object-data-registry'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { isNumber } from 'lodash'
import { type ColumnMeta } from '@tanstack/react-table'

export const DEFAULT_COLUMN_WIDTH = 150

export const addDefaultWithToColumnDefinition = (columns: RelationColumnDefinition[]): RelationColumnDefinition[] => {
  const tmpColumns: RelationColumnDefinition[] = []

  columns.forEach((column) => {
    if (isNumber(column.width)) {
      tmpColumns.push(column)
      return
    }

    const columnWidth = getDefaultGridColumnWidthFromDynamicObjectType(column.type)
    if (columnWidth !== undefined) {
      tmpColumns.push({
        ...column,
        width: columnWidth
      })

      return
    }

    tmpColumns.push({
      ...column,
      width: DEFAULT_COLUMN_WIDTH
    })
  })

  return tmpColumns
}

export const calculateColumnWithOfTableCells = (props: ColumnMeta<any, any>): number => {
  const fieldDefinition = props.config?.dataObjectConfig.fieldDefinition
  const columns = fieldDefinition?.columns ?? null
  let calcColumnWidth = 350

  if (columns !== null) {
    columns.forEach(column => {
      if (isNumber(column.width)) {
        calcColumnWidth += column.width
        return
      }

      const columnWidth = getDefaultGridColumnWidthFromDynamicObjectType(column.type as string, props)
      if (columnWidth !== undefined) {
        calcColumnWidth += columnWidth
        return
      }

      calcColumnWidth += DEFAULT_COLUMN_WIDTH
    })
  }

  return calcColumnWidth
}

export const getDefaultGridColumnWidthFromDynamicObjectType = (columnType?: string, columnMeta?: ColumnMeta<any, any>): number | undefined => {
  const objectDataRegistry = useInjection<DynamicTypeObjectDataRegistry>(serviceIds['DynamicTypes/ObjectDataRegistry'])

  if (columnType !== undefined) {
    const dynType = objectDataRegistry.getDynamicType(columnType, false)
    if (dynType?.getDefaultGridColumnWidth !== undefined) {
      return dynType.getDefaultGridColumnWidth(columnMeta)
    }
  }

  return undefined
}
