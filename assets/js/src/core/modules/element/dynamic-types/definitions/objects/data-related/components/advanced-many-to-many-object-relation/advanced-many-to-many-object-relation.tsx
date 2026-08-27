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
import {
  ManyToManyObjectRelation,
  type VisibleFieldDefinition
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/many-to-many-object-relation/many-to-many-object-relation'
import type {
  ManyToManyRelationValue,
  ManyToManyRelationValueItem
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/many-to-many-relation/hooks/use-value'
import _ from 'lodash'
import { Alert } from '@Pimcore/components/alert/alert'
import {
  type AdvancedManyToManyRelationValue
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/relations/types/advanced-many-to-many-relation'
import {
  useConvertRelationEditableColumns
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/relations/hooks/use-convert-relation-editable-columns'
import { type RowSelectionState } from '@tanstack/react-table'
import { BatchEditAction } from '../advanced-many-to-many-relation/batch-edit/batch-edit-action'

export interface AdvancedManyToManyObjectRelationClassDefinitionProps {
  allowToClearRelation: boolean
  allowMultipleAssignments: boolean
  maxItems: number | null
  pathFormatterClass: string | null
  width: number | string | null
  height: number | string | null
  visibleFieldDefinitions?: Record<string, VisibleFieldDefinition> | null
  allowedClassId: string | null
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

export interface AdvancedManyToManyObjectRelationProps extends AdvancedManyToManyObjectRelationClassDefinitionProps {
  disabled?: boolean
  value?: AdvancedManyToManyRelationValue | null
  onChange?: (value?: AdvancedManyToManyRelationValue | null) => void
  enrichRowData?: (row: ManyToManyRelationValueItem) => ManyToManyRelationValueItem & Record<string, any>
  className?: string
}

export const AdvancedManyToManyObjectRelation = (props: AdvancedManyToManyObjectRelationProps): React.JSX.Element => {
  const fieldName = props.name[props.name.length - 1]
  const { columnDefinition, onUpdateCellData, convertToManyToManyRelationValue, convertToAdvancedManyToManyRelationValue } = useConvertRelationEditableColumns(props.columns ?? [], fieldName, props.value, props.onChange)
  const isBatchEditEnabled = props.enableBatchEdit === true && props.disabled !== true

  const [selectedRows, setSelectedRows] = useState<RowSelectionState>({})

  useEffect(() => {
  }, [props.value])

  if (_.isEmpty(props.allowedClassId)) {
    return (
      <Alert
        message="Allowed class definition is missing in field configuration."
        type="warning"
      />
    )
  }

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
    <ManyToManyObjectRelation
      { ...props }
      allowToClearRelation={ isBatchEditEnabled ? false : props.allowToClearRelation }
      allowedClasses={ [String(props.allowedClassId)] }
      columnDefinition={ columnDefinition }
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
