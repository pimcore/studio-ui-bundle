/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import {
  type VisibleFieldDefinition
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/components/many-to-many-object-relation/many-to-many-object-relation'
import { type ColumnDef, createColumnHelper } from '@tanstack/react-table'
import type {
  ManyToManyRelationValueItem
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/components/many-to-many-relation/hooks/use-value'

export const visibleFieldsToColumnDefinitions = (visibleFieldDefinitions: Record<string, VisibleFieldDefinition>): Array<ColumnDef<any>> => {
  const columnDefinition: Array<ColumnDef<any>> = []
  const columnHelper = createColumnHelper()

  for (const key in visibleFieldDefinitions) {
    const field = visibleFieldDefinitions[key]
    columnDefinition.push(
      columnHelper.accessor(key, {
        header: field.title,
        meta: {
          autoWidth: key === 'fullpath'
        },
        size: getColumnWidth(key)
      })
    )
  }

  return columnDefinition
}

export const enrichRowData = (visibleFieldDefinitions: Record<string, VisibleFieldDefinition>, row: ManyToManyRelationValueItem): ManyToManyRelationValueItem & Record<string, any> => {
  const additionalColumns = {}
  for (const key in visibleFieldDefinitions) {
    if (key === 'fullpath') {
      additionalColumns[key] = row.fullPath
    } else if (key === 'classname') {
      additionalColumns[key] = row.subtype
    } else if (key !== 'id') {
      additionalColumns[key] = 'not-implemented-yet'
    }
  }

  return {
    ...row,
    ...additionalColumns
  }
}

const getColumnWidth = (column: string): number => {
  if (column === 'id') {
    return 80
  }
  if (column === 'fullpath') {
    return 200
  }

  return 150
}
