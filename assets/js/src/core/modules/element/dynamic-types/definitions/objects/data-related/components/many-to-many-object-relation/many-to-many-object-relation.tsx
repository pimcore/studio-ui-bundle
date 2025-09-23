/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { isUndefined, isEmpty, find, isNil } from 'lodash'
import { ManyToManyRelation } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/many-to-many-relation/many-to-many-relation'
import { type ColumnDef } from '@tanstack/react-table'
import type { ManyToManyRelationValue, ManyToManyRelationValueItem } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/many-to-many-relation/hooks/use-value'
import type { IRelationAllowedTypesDataComponent } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/relations/allowed-types'
import { enrichRowData, visibleFieldsToColumnDefinitions } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/many-to-many-object-relation/utils/column-definition'
import { type OnUpdateCellDataEvent } from '@Pimcore/types/components/types'
import { useClassDefinitions } from '@Pimcore/modules/data-object/utils/provider/class-defintions/use-class-definitions'
import { useElementContext } from '@Pimcore/modules/element/hooks/use-element-context'
import { useDataObjectDraft } from '@Pimcore/modules/data-object/hooks/use-data-object-draft'
import {
  type AdvancedColumnConfig,
  type GridColumnData,
  useDataObjectGetAvailableGridColumnsForRelationQuery
} from '@Pimcore/modules/data-object/data-object-api-slice.gen'
import { useDataObjectGrids } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/many-to-many-object-relation/hooks/use-data-object-grids'
import {
  useGridOptions
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/many-to-many-object-relation/hooks/use-grid-options'
import { useDataObjectGetByIdQuery } from '@Pimcore/modules/data-object/data-object-api-slice-enhanced'

export interface ManyToManyObjectRelationClassDefinitionProps {
  allowToClearRelation: boolean
  maxItems: number | null
  pathFormatterClass: string | null
  width: number | string | null
  height: number | string | null
  visibleFieldDefinitions?: Record<string, VisibleFieldDefinition> | null
}

export interface VisibleFieldDefinition {
  additionalAttributes: object
  config: Array<string | AdvancedColumnConfig>
  editable: boolean
  exportable: boolean
  filterable: boolean
  frontendType: string
  group: string[]
  key: string
  locale: string | null
  localizable: boolean
  sortable: boolean
  title: string
  type: string
}

export interface ManyToManyObjectRelationProps extends IRelationAllowedTypesDataComponent, ManyToManyObjectRelationClassDefinitionProps {
  combinedFieldName?: string
  disabled?: boolean
  inherited?: boolean
  value?: ManyToManyRelationValue | null
  onChange?: (value?: ManyToManyRelationValue | null) => void
  columnDefinition?: Array<ColumnDef<any>>
  enrichRowData?: (row: ManyToManyRelationValueItem) => ManyToManyRelationValueItem & Record<string, any>
  hint?: React.ReactNode | null
  onUpdateCellData?: (event: OnUpdateCellDataEvent) => void
  className?: string
}

export const ManyToManyObjectRelation = (props: ManyToManyObjectRelationProps): React.JSX.Element => {
  const { t } = useTranslation()

  const { id } = useElementContext()
  const { dataObject } = useDataObjectDraft(id)
  const { getByName } = useClassDefinitions()

  const { transformGridColumn } = useGridOptions()

  const classId = !isUndefined(dataObject) ? getByName(dataObject.className)?.id : ''
  const relationField = props?.combinedFieldName
  const dataRelationClasses = props?.allowedClasses

  const DEFAULT_VISIBLE_FIELD_DEFINITIONS = [
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
  ]

  const { data: currentObjectData } = useDataObjectGetByIdQuery({ id })
  const { isLoading: isAvailableGridColumnsLoading, data: availableGridColumnsData } = useDataObjectGetAvailableGridColumnsForRelationQuery({
    classId,
    relationField
  }, { skip: isUndefined(classId) || isUndefined(relationField) })

  const visibleFieldDefinitions: VisibleFieldDefinition[] | undefined = useMemo(() => {
    if (isAvailableGridColumnsLoading) return undefined

    const fieldDefinitions = !isNil(availableGridColumnsData)
      ? availableGridColumnsData?.columns
      : DEFAULT_VISIBLE_FIELD_DEFINITIONS

    return fieldDefinitions?.map((field) => {
      const newField = { ...field }

      if (newField.key === 'id' || newField.key === 'fullpath' || newField.key === 'classname') {
        if (newField.title === t('relations.reference')) {
          return newField // skip modifications
        }

        newField.title = t(`relations.${newField.key}`)
      } else {
        newField.title = t(newField.title as string)
      }

      const fieldData = find(availableGridColumnsData?.columns, { key: newField.key })

      return {
        ...newField,
        ...fieldData?.config
      }
    })
  }, [availableGridColumnsData])

  const visibleColumns = (visibleFieldDefinitions ?? []).map(col => ({
    ...col,
    group: col?.group?.[0]
  }))

  const gridDataQueries = useDataObjectGrids({
    classIds: dataRelationClasses,
    convertClassName: getByName,
    columns: visibleColumns,
    dataValue: currentObjectData?.objectData?.[relationField ?? '']
  })
  const isGridFullDataLoading = gridDataQueries?.some(q => q.isLoading === true || q.isFetching)
  const gridFullData = gridDataQueries?.flatMap(q => q.data?.items ?? [])

  const columnDefinition = visibleFieldsToColumnDefinitions({
    visibleFieldDefinitions,
    disabled: props.inherited === true || props.disabled === true,
    pathFormatterClass: props.pathFormatterClass ?? '',
    translate: t,
    transformGridColumn
  })

  const handleEnrichRowData = useCallback(
    (row: ManyToManyRelationValueItem) => {
      const rowData: GridColumnData[] = gridFullData?.find(item => item.id === row.id)?.columns ?? []

      return enrichRowData(visibleFieldDefinitions, row, rowData)
    },
    [gridFullData, visibleFieldDefinitions]
  )

  return (
    <ManyToManyRelation
      { ...props }
      columnDefinition={ [...columnDefinition, ...(props.columnDefinition ?? [])] }
      dataObjectsAllowed={ !isEmpty(props.allowedClasses) }
      enrichRowData={ handleEnrichRowData }
      isLoading={ isAvailableGridColumnsLoading || isGridFullDataLoading }
      value={ currentObjectData?.objectData?.[relationField ?? ''] ?? [] }
    />
  )
}
