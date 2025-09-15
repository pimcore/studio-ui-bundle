/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import {
  type VisibleFieldDefinition
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/many-to-many-object-relation/many-to-many-object-relation'
import { type ColumnDef, createColumnHelper } from '@tanstack/react-table'
import type {
  ManyToManyRelationValueItem
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/many-to-many-relation/hooks/use-value'
import {
  getElementCellConfig
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/many-to-many-relation/utils/helpers'
import { Flex } from 'antd'
import { SanitizeHtml } from '@Pimcore/components/sanitize-html/sanitize-html'
import { LoadingOutlined } from '@ant-design/icons'
import { isNonEmptyString } from '@Pimcore/utils/type-utils'
import { type GridColumnData } from '@Pimcore/modules/data-object/data-object-api-slice.gen'

export const visibleFieldsToColumnDefinitions = (visibleFieldDefinitions: VisibleFieldDefinition[] | undefined, disabled: boolean, pathFormatterClass: string): Array<ColumnDef<any>> => {
  const columnDefinition: Array<ColumnDef<any>> = []
  const columnHelper = createColumnHelper()

  const renderFullPathCell = (info: any): React.JSX.Element => {
    return (
      <Flex
        align={ 'center' }
        className={ 'p-mini' }
      >
        <SanitizeHtml html={ info.getValue() ?? '' } />
        {info.row.original.loading !== false ? (<LoadingOutlined style={ { marginLeft: 8 } } />) : null}
      </Flex>
    )
  }

  for (const field of visibleFieldDefinitions ?? []) {
    const key = field.key

    columnDefinition.push(
      columnHelper.accessor(key, {
        header: field.title,
        meta: key === 'fullpath'
          ? {
              type: 'element',
              autoWidth: true,
              editable: false,
              config: getElementCellConfig(disabled)
            }
          : undefined,
        size: getColumnWidth(key),
        ...(isNonEmptyString(pathFormatterClass) ? { cell: renderFullPathCell } : {})
      })
    )
  }

  return columnDefinition
}

export const enrichRowData = (visibleFieldDefinitions: VisibleFieldDefinition[] | undefined, row: ManyToManyRelationValueItem, rowData: GridColumnData[]): ManyToManyRelationValueItem & Record<string, any> => {
  const additionalColumns = {}

  visibleFieldDefinitions?.forEach(field => {
    const key = field.key
    const value = rowData?.find(item => item.key === key)?.value

    if (key === 'fullpath') {
      additionalColumns[key] = row.fullPath
    } else if (key === 'classname') {
      additionalColumns[key] = row.subtype
    } else if (key !== 'id') {
      additionalColumns[key] = value
    }
  })

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
