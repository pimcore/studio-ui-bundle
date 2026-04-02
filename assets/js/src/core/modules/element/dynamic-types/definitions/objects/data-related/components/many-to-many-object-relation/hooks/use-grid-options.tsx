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
import { useTranslation } from 'react-i18next'
import { isEmpty, isObject } from 'lodash'
import { type ColumnMeta, type IdentifiedColumnDef } from '@tanstack/react-table'
import { Alert } from '@Pimcore/components/alert/alert'
import { DefaultCell } from '@Pimcore/components/grid/columns/default-cell'
import { useDynamicTypeResolver } from '@Pimcore/modules/element/dynamic-types/resolver/hooks/use-dynamic-type-resolver'
import { DEFAULT_COLUMN_WIDTH } from '@Pimcore/modules/element/dynamic-types/utils/column-helper'
import { type GridProps as BaseGridProps } from '@Pimcore/types/components/types'
import type { VisibleFieldDefinition } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/many-to-many-object-relation/many-to-many-object-relation'
import { isEmptyValue } from '@Pimcore/utils/type-utils'
import { getElementCellConfig } from '@Pimcore/components/many-to-many-relation'

export type GridProps = Pick<BaseGridProps, 'contextMenu' | 'enableMultipleRowSelection' | 'enableRowSelection' | 'enableSorting' | 'modifiedCells' | 'onSelectedRowsChange' | 'onSortingChange' | 'onUpdateCellData' | 'selectedRows' | 'sorting' | 'onRowDoubleClick' | 'manualSorting'>

type IGetDefaultVisibleFieldDefinitionsReturn = Array<{
  key: string
  title: string
  fieldtype: string
}>

export interface UseGridOptionsReturn {
  transformGridColumn: (column: VisibleFieldDefinition, disabled: boolean) => IdentifiedColumnDef<unknown, never>
  getDefaultVisibleFieldDefinitions: () => IGetDefaultVisibleFieldDefinitionsReturn
}

export const useGridOptions = (): UseGridOptionsReturn => {
  const { t } = useTranslation()
  const { hasType } = useDynamicTypeResolver()

  const getDefaultVisibleFieldDefinitions = (): IGetDefaultVisibleFieldDefinitionsReturn => ([
    {
      key: 'id',
      title: 'id',
      fieldtype: 'input'
    },
    {
      key: 'fullpath',
      title: t('relations.reference'),
      fieldtype: 'input'
    },
    {
      key: 'classname',
      title: t('relations.class'),
      fieldtype: 'input'
    }
  ])

  const getDefaultSystemColumnSize = (column: VisibleFieldDefinition): number | undefined => {
    if (Array.isArray(column.group) && column.group.includes('system')) {
      if (
        column.key === 'id' ||
        column.key === 'index' ||
        column.key === 'type'
      ) {
        return 100
      }

      if (
        column.key === 'mimetype' ||
        column.key === 'fileSize'
      ) {
        return DEFAULT_COLUMN_WIDTH
      }

      if (
        column.key === 'key' ||
        column.key === 'classname' ||
        column.key === 'fullpath'
      ) {
        return 200
      }
    }

    return 150
  }

  const transformGridColumn = (column: VisibleFieldDefinition, disabled: boolean): IdentifiedColumnDef<unknown, never> => {
    const isMainTypeIncluded = hasType({ target: 'GRID_CELL', dynamicTypeIds: [column.type] })
    const isSecondaryTypeIncluded = hasType({ target: 'GRID_CELL', dynamicTypeIds: [column.frontendType] })
    const isTypeIncluded = isMainTypeIncluded || isSecondaryTypeIncluded

    const getDataObjectHeader = (value?: string): string => {
      return isEmptyValue(value) ? t(column.key) : value!
    }

    const getMetaData = (): ColumnMeta<unknown, never> | undefined => {
      return column.key === 'fullpath'
        ? {
            type: 'element',
            autoWidth: true,
            config: getElementCellConfig(disabled)
          }
        : {
            type: isMainTypeIncluded ? column.type : column.frontendType,
            ...(!isEmpty(column.config) && {
              config: isMainTypeIncluded
                ? {
                    dataObjectType: column.frontendType,
                    dataObjectConfig: column.config
                  }
                : getElementCellConfig(disabled)
            })
          }
    }

    const fieldDefinition = isObject(column.config) && 'fieldDefinition' in column.config ? column.config?.fieldDefinition as Record<string, any> : undefined

    const advancedDataObjectHeader = getDataObjectHeader(isEmptyValue(fieldDefinition?.title) ? undefined : t(String(fieldDefinition?.title)))
    const defaultDataObjectHeader = getDataObjectHeader(column.title)

    const columnDefinition: IdentifiedColumnDef<unknown, never> = {
      header: isMainTypeIncluded ? advancedDataObjectHeader : defaultDataObjectHeader,
      meta: {
        columnKey: column.key,
        editable: false,
        ...getMetaData()
      },
      size: getDefaultSystemColumnSize(column)
    }

    if (!isTypeIncluded) {
      columnDefinition.cell = (info) => {
        const currentValue = info.getValue()
        if (typeof currentValue === 'string' || typeof currentValue === 'number') {
          const newInfo = {
            ...info,
            meta: {
              type: 'input'
            }
          }

          return <DefaultCell { ...newInfo } />
        }

        return (
          <Alert
            message="Not supported"
            type="warning"
          />
        )
      }
    }

    return columnDefinition
  }

  return { transformGridColumn, getDefaultVisibleFieldDefinitions }
}
