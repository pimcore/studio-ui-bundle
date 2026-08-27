/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useCallback, useEffect, useState } from 'react'
import type {
  ManyToManyRelationValue,
  ManyToManyRelationValueItem
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/many-to-many-relation/hooks/use-value'
import {
  type AdvancedManyToManyRelationValue
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/relations/types/advanced-many-to-many-relation'
import {
  useConvertRelationEditableColumns
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/relations/hooks/use-convert-relation-editable-columns'
import {
  ManyToManyRelation
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/many-to-many-relation/many-to-many-relation'
import type {
  IRelationAllowedTypesDataComponent
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/relations/allowed-types'
import { type ColumnDef, createColumnHelper, type RowSelectionState } from '@tanstack/react-table'
import { useTranslation } from 'react-i18next'
import {
  getElementCellConfig
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/many-to-many-relation/utils/helpers'
import { isNonEmptyString } from '@Pimcore/utils/type-utils'
import { renderFullPathCell } from '@Pimcore/components/many-to-many-relation/utils/full-path-cell-renderer'
import { BatchEditAction } from './batch-edit/batch-edit-action'

export interface AdvancedManyToManyRelationClassDefinitionProps {
  allowToClearRelation: boolean
  allowMultipleAssignments: boolean
  maxItems: number | null
  pathFormatterClass: string | null
  width: number | string | null
  height: number | string | null
  columns?: RelationColumnDefinition[] | null
  name: string[]
  hideOpenButton?: boolean
  enableBatchEdit?: boolean
}

export interface RelationColumnDefinition {
  type?: string
  position: number
  key: string
  label?: string
  width?: number
  value?: string
}

export interface AdvancedManyToManyRelationProps extends IRelationAllowedTypesDataComponent, AdvancedManyToManyRelationClassDefinitionProps {
  disabled?: boolean
  inherited?: boolean
  value?: AdvancedManyToManyRelationValue | null
  onChange?: (value?: AdvancedManyToManyRelationValue | null) => void
  enrichRowData?: (row: ManyToManyRelationValueItem) => ManyToManyRelationValueItem & Record<string, any>
  className?: string
}

export const AdvancedManyToManyRelation = (props: AdvancedManyToManyRelationProps): React.JSX.Element => {
  const fieldName = props.name[props.name.length - 1]
  const { columnDefinition, onUpdateCellData, convertToManyToManyRelationValue, convertToAdvancedManyToManyRelationValue } = useConvertRelationEditableColumns(props.columns ?? [], fieldName, props.value, props.onChange)
  const { t } = useTranslation()
  const isBatchEditEnabled = props.enableBatchEdit === true && props.disabled !== true

  const [selectedRows, setSelectedRows] = useState<RowSelectionState>({})

  useEffect(() => {
  }, [props.value])

  const onChange = (value?: ManyToManyRelationValue | null): void => {
    props.onChange?.(convertToAdvancedManyToManyRelationValue(value))
  }

  const handleBatchApply = useCallback((columnKey: string, value: any): void => {
    if (props.value === undefined || props.value === null) return

    const selectedIndices = Object.keys(selectedRows).map(Number)
    const applyToAll = selectedIndices.length === 0

    const newValue: AdvancedManyToManyRelationValue = props.value.map((row, index) => {
      if (applyToAll || selectedIndices.includes(index)) {
        return {
          ...row,
          data: {
            ...row.data,
            [columnKey]: Array.isArray(value) ? value.join(',') : value
          }
        }
      }
      return row
    })

    props.onChange?.(newValue)
    setSelectedRows({})
  }, [props.value, props.onChange, selectedRows])

  const handleBatchDelete = useCallback((): void => {
    if (props.value === undefined || props.value === null) return

    const selectedIndices = Object.keys(selectedRows).map(Number)
    const applyToAll = selectedIndices.length === 0

    if (applyToAll) {
      props.onChange?.([])
    } else {
      const newValue = props.value.filter((_, index) => !selectedIndices.includes(index))
      props.onChange?.(newValue)
    }

    setSelectedRows({})
  }, [props.value, props.onChange, selectedRows])

  const addNotEditableColumns = (columnDefinition: Array<ColumnDef<any>>): Array<ColumnDef<any>> => {
    const columnHelper = createColumnHelper()
    return [
      columnHelper.accessor('id', {
        header: t('relations.id'),
        size: 80
      }),
      columnHelper.accessor('fullPath', {
        header: t('relations.reference'),
        meta: {
          type: 'element',
          autoWidth: true,
          editable: false,
          config: getElementCellConfig(props.inherited === true || props.disabled === true)
        },
        size: 200,
        ...(isNonEmptyString(props.pathFormatterClass) ? { cell: renderFullPathCell } : {})
      }),
      ...columnDefinition,
      columnHelper.accessor('type', {
        header: t('relations.type'),
        meta: {
          type: 'translate'
        },
        size: 150
      }),
      columnHelper.accessor('subtype', {
        header: t('relations.subtype'),
        meta: {
          type: 'translate'
        },
        size: 150
      })
    ]
  }

  const totalRowCount = props.value?.length ?? 0

  const batchEditToolbarItem = isBatchEditEnabled
    ? (
      <BatchEditAction
        columns={ props.columns ?? [] }
        disabled={ props.disabled }
        onApply={ handleBatchApply }
        onDelete={ handleBatchDelete }
        selectedRows={ selectedRows }
        setSelectedRows={ setSelectedRows }
        totalRowCount={ totalRowCount }
      />
      )
    : undefined

  return (
    <ManyToManyRelation
      { ...props }
      allowToClearRelation={ isBatchEditEnabled ? false : props.allowToClearRelation }
      columnDefinition={ addNotEditableColumns(columnDefinition) }
      dataObjectsAllowed
      enableMultipleRowSelection={ isBatchEditEnabled }
      extraToolbarItems={ batchEditToolbarItem }
      onChange={ onChange }
      onSelectedRowsChange={ isBatchEditEnabled ? setSelectedRows : undefined }
      onUpdateCellData={ onUpdateCellData }
      selectedRows={ isBatchEditEnabled ? selectedRows : undefined }
      value={ convertToManyToManyRelationValue(props.value) }
    />
  )
}
