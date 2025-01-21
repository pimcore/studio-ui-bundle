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
import { type ColumnDef, createColumnHelper } from '@tanstack/react-table'
import _ from 'lodash'
import { useTranslation } from 'react-i18next'
import { type OnUpdateCellDataEvent } from '@Pimcore/types/components/types'
import { type AdvancedManyToManyRelationValue } from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/helpers/relations/types/advanced-many-to-many-relation'

export interface UseConvertRelationEditableColumnsResult {
  columnDefinition: Array<ColumnDef<any>>
  onUpdateCellData: (event: OnUpdateCellDataEvent) => void
}

export const EDITABLE_COLUMN_PREFIX = 'edit::'

export const useConvertRelationEditableColumns = (
  columns: RelationColumnDefinition[],
  value?: AdvancedManyToManyRelationValue | null,
  onChange?: (value?: AdvancedManyToManyRelationValue | null) => void
): UseConvertRelationEditableColumnsResult => {
  const { t } = useTranslation()
  const columnDefinition = useMemo(() => {
    const columnHelper = createColumnHelper()
    const columnDefinition: Array<ColumnDef<any>> = []

    for (const column of columns) {
      columnDefinition.push(
        columnHelper.accessor(EDITABLE_COLUMN_PREFIX + column.key, {
          header: !_.isEmpty(column.label) ? t(String(column.label)) : undefined,
          size: column.width ?? 150,
          meta: {
            type: column.type,
            editable: true
          }
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
            [event.columnId.replace(EDITABLE_COLUMN_PREFIX, '')]: event.value
          }
        }
      }
      return row
    })

    console.log('newValue', newValue)
    onChange?.(newValue)
  }

  return { columnDefinition, onUpdateCellData }
}
