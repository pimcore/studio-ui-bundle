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

import { useMemo } from 'react'
import { type RelationColumnDefinition } from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/components/advanced-many-to-many-object-relation/advanced-many-to-many-object-relation'
import { type ColumnDef, type ColumnMeta, createColumnHelper } from '@tanstack/react-table'
import _ from 'lodash'
import { useTranslation } from 'react-i18next'
import { type OnUpdateCellDataEvent } from '@Pimcore/types/components/types'
import { type AdvancedManyToManyRelationValue, type AdvancedManyToManyRelationValueItem } from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/helpers/relations/types/advanced-many-to-many-relation'
import { type ManyToManyRelationValue, type ManyToManyRelationValueItem } from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/components/many-to-many-relation/hooks/use-value'

export interface UseConvertRelationEditableColumnsResult {
  columnDefinition: Array<ColumnDef<any>>
  onUpdateCellData: (event: OnUpdateCellDataEvent) => void
  convertToManyToManyRelationValue: (value?: AdvancedManyToManyRelationValue | null) => ManyToManyRelationValue | null
  convertToAdvancedManyToManyRelationValue: (value?: ManyToManyRelationValue | null) => AdvancedManyToManyRelationValue | null
}

const EDITABLE_COLUMN_PREFIX = 'edit::'

const mapColumnType = (type: string, value?: string): ColumnMeta<any, any> => {
  if (type === 'bool' || type === 'columnbool') {
    return {
      type: 'checkbox',
      editable: true
    }
  }

  if (type === 'number') {
    return {
      type: 'number',
      editable: true
    }
  }

  if (type === 'select') {
    return {
      type: 'select',
      editable: true,
      config: {
        options: value?.split(';') ?? []
      }
    }
  }

  if (type === 'multiselect') {
    return {
      type: 'multi-select',
      editable: true,
      config: {
        options: value?.split(';') ?? []
      }
    }
  }

  return {
    type: 'input',
    editable: true
  }
}

export const useConvertRelationEditableColumns = (
  columns: RelationColumnDefinition[],
  fieldName: string,
  value?: AdvancedManyToManyRelationValue | null,
  onChange?: (value?: AdvancedManyToManyRelationValue | null) => void
): UseConvertRelationEditableColumnsResult => {
  const { t } = useTranslation()
  const columnKeys = columns.map((column) => column.key)

  const columnDefinition = useMemo(() => {
    const columnHelper = createColumnHelper()
    const columnDefinition: Array<ColumnDef<any>> = []

    for (const column of columns) {
      columnDefinition.push(
        columnHelper.accessor(EDITABLE_COLUMN_PREFIX + column.key, {
          header: !_.isEmpty(column.label) ? t(String(column.label)) : undefined,
          size: column.width ?? 150,
          meta: mapColumnType(column.type ?? 'text', column.value)
        })
      )
    }

    return columnDefinition
  }, [columns, t])

  const onUpdateCellData = (event: OnUpdateCellDataEvent): void => {
    let newValue: AdvancedManyToManyRelationValue = [...(value ?? [])]
    newValue = newValue.map((row, index) => {
      if (index === event.rowIndex) {
        return {
          ...row,
          data: {
            ...row.data,
            [event.columnId.replace(EDITABLE_COLUMN_PREFIX, '')]: transformColumnData(event.value)
          }
        }
      }
      return row
    })

    onChange?.(newValue)
  }

  const convertToManyToManyRelationValue = (value?: AdvancedManyToManyRelationValue | null): ManyToManyRelationValue | null => {
    if (value === undefined || value === null) {
      return null
    }
    return value.map((item) => {
      return convertToManyToManyRelationValueItem(item)
    })
  }

  const convertToManyToManyRelationValueItem = (value: AdvancedManyToManyRelationValueItem): ManyToManyRelationValueItem & Record<string, any> => {
    const editableData: Record<string, any> = {}
    if (value.data !== undefined) {
      for (const key in value.data) {
        const column = columns.find(col => col.key === key)
        if (column?.type === 'multiselect') {
          editableData[EDITABLE_COLUMN_PREFIX + key] = _.isEmpty(value.data[key]) ? [] : _.compact(String(value.data[key]).split(','))
        } else {
          editableData[EDITABLE_COLUMN_PREFIX + key] = value.data[key]
        }
      }
    }
    return {
      id: value.element.id,
      type: value.element.type,
      subtype: value.element.subtype,
      isPublished: value.element.isPublished,
      fullPath: value.element.fullPath,
      ...editableData
    }
  }

  const convertToAdvancedManyToManyRelationValue = (value?: ManyToManyRelationValue | null): AdvancedManyToManyRelationValue | null => {
    if (value === undefined || value === null) {
      return null
    }
    return value.map((item) => {
      return convertToAdvancedManyToManyRelationValueItem(item)
    })
  }

  const convertToAdvancedManyToManyRelationValueItem = (value: ManyToManyRelationValueItem & Record<string, any>): AdvancedManyToManyRelationValueItem => {
    const data: Record<string, any> = {}
    for (const columnKey of columnKeys) {
      const valueKey = EDITABLE_COLUMN_PREFIX + columnKey
      if (value[valueKey] !== undefined) {
        data[columnKey] = transformColumnData(value[valueKey])
      } else {
        data[columnKey] = null
      }
    }

    return {
      element: {
        id: value.id,
        type: value.type,
        subtype: value.subtype,
        isPublished: value.isPublished,
        fullPath: value.fullPath
      },
      data,
      fieldName,
      columns: columnKeys
    }
  }

  const transformColumnData = (value: any): any => {
    if (value === undefined) {
      return null
    }
    if (Array.isArray(value)) {
      return _.compact(value).join(',')
    }
    return value
  }

  return { columnDefinition, onUpdateCellData, convertToManyToManyRelationValue, convertToAdvancedManyToManyRelationValue }
}
