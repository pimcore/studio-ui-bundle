/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { useInjection } from '@Pimcore/app/depency-injection'
import { isNumber } from 'lodash'
import { type RelationColumnDefinition } from '../definitions/objects/data-related/components/advanced-many-to-many-object-relation/advanced-many-to-many-object-relation'
import { type AbstractObjectDataDefinition } from '../definitions/objects/data-related/dynamic-type-object-data-abstract'
import { type DynamicTypeObjectDataRegistry } from '../definitions/objects/data-related/dynamic-type-object-data-registry'
import { defaultFieldWidthValues } from '../definitions/objects/data-related/providers/field-width/field-width-provider'

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

export const calculateColumnWithOfTableCells = (props?: AbstractObjectDataDefinition): number => {
  const fieldDefinition = props?.config?.dataObjectConfig.fieldDefinition
  const columns = props?.columns ?? null
  let calcColumnWidth = 350

  if (columns !== null) {
    columns.forEach(column => {
      if (isNumber(column.width)) {
        calcColumnWidth += column.width
        return
      }

      const objectDataDefinition: AbstractObjectDataDefinition = {
        ...fieldDefinition,
        defaultFieldWidth: defaultFieldWidthValues
      }

      const columnWidth = getDefaultGridColumnWidthFromDynamicObjectType(column.type as string, objectDataDefinition)
      if (columnWidth !== undefined) {
        calcColumnWidth += columnWidth
        return
      }

      calcColumnWidth += DEFAULT_COLUMN_WIDTH
    })
  }

  return calcColumnWidth
}

export const getDefaultGridColumnWidthFromDynamicObjectType = (columnType?: string, columnMeta?: AbstractObjectDataDefinition): number | undefined => {
  const objectDataRegistry = useInjection<DynamicTypeObjectDataRegistry>(serviceIds['DynamicTypes/ObjectDataRegistry'])

  if (columnType !== undefined) {
    const dynType = objectDataRegistry.getDynamicType(columnType, false)
    if (dynType?.getDefaultGridColumnWidth !== undefined) {
      return dynType.getDefaultGridColumnWidth(columnMeta)
    }
  }

  return undefined
}
