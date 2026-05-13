/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
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
import { type IUseDataObjectGridsReturn, useDataObjectGrids } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/many-to-many-object-relation/hooks/use-data-object-grids'
import { useGridOptions } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/many-to-many-object-relation/hooks/use-grid-options'
import { isEmptyValue } from '@Pimcore/utils/type-utils'
import { DynamicTypeRegistryProvider } from '@Pimcore/modules/element/dynamic-types/registry/provider/dynamic-type-registry-provider'
import { SelectedColumnsProvider, type SelectedColumn } from '@Pimcore/modules/element/listing/abstract/configuration-layer/provider/selected-columns/selected-columns-provider'
import { useUserContentLanguage } from '@Pimcore/modules/auth/hooks/use-user-content-language'
import { useClassDefinitionSelectionOptional } from '@Pimcore/modules/data-object/listing/decorator/class-definition-selection/context-layer/provider/use-class-definition-selection'

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

const ManyToManyObjectRelationInner = (props: ManyToManyObjectRelationProps): React.JSX.Element => {
  const { t } = useTranslation()

  const { id } = useElementContext()
  const { dataObject } = useDataObjectDraft(id)
  const { getByName } = useClassDefinitions()
  // Inline-edit context: there is no editor draft for the row being edited, so
  // fall back to the listing's selected class.
  const listingClassSelection = useClassDefinitionSelectionOptional()

  const { transformGridColumn, getDefaultVisibleFieldDefinitions } = useGridOptions()
  const userLanguage = useUserContentLanguage()

  const editorClassId = !isUndefined(dataObject) ? getByName(dataObject.className)?.id : undefined
  const listingClassId = listingClassSelection?.selectedClassDefinition?.id
  // Prefer the listing's selected class when available; the editor's element
  // context can point to an unrelated open object (or a folder) in inline edit.
  const classId = listingClassId ?? editorClassId
  const relationField = props?.combinedFieldName
  const dataRelationClasses = props?.allowedClasses

  const [cachedGridFullData, setCachedGridFullData] = useState<IUseDataObjectGridsReturn['data']>([])
  const prevLanguageRef = useRef(userLanguage)
  const prevDataObjectRef = useRef(dataObject)

  // Synchronously reset cache when language changes, before useDataObjectGrids is called
  if (prevLanguageRef.current !== userLanguage) {
    prevLanguageRef.current = userLanguage
    cachedGridFullData.length > 0 && setCachedGridFullData([])
  }

  const { isLoading: isAvailableGridColumnsLoading, data: availableGridColumnsData } = useDataObjectGetAvailableGridColumnsForRelationQuery({
    classId,
    relationField
  }, { skip: isUndefined(classId) || isUndefined(relationField) })

  const visibleFieldDefinitions: VisibleFieldDefinition[] | undefined = useMemo(() => {
    if (isAvailableGridColumnsLoading) return undefined

    const columns = availableGridColumnsData?.columns
    let fieldDefinitions
    if (!isNil(columns) && !isEmpty(columns)) {
      fieldDefinitions = Array.isArray(columns) ? columns : Object.values(columns)
    } else {
      fieldDefinitions = getDefaultVisibleFieldDefinitions()
    }

    return fieldDefinitions?.map((field: VisibleFieldDefinition) => {
      const newField = { ...field }
      const fieldData = find(availableGridColumnsData?.columns, { key: newField.key })
      const mergedField = {
        ...newField,
        ...fieldData?.config
      }

      if (mergedField.key === 'id' || mergedField.key === 'fullpath' || mergedField.key === 'classname') {
        if (mergedField.title === t('relations.reference')) {
          return mergedField // skip modifications
        }

        mergedField.title = t(`relations.${mergedField.key}`)
      } else {
        mergedField.title = t(mergedField.title)
      }

      return mergedField
    })
  }, [availableGridColumnsData])

  const visibleColumns = (visibleFieldDefinitions ?? []).map(col => ({
    key: col.key,
    type: col.type,
    group: col.group,
    config: col.config,
    locale: col.localizable ? userLanguage : undefined
  }))

  const { data: gridFullData, isLoading: isGridFullDataLoading, refetchAll } = useDataObjectGrids({
    classIds: dataRelationClasses,
    convertClassName: getByName,
    columns: visibleColumns,
    applyFallbackLanguages: true,
    dataValue: props?.value
  })

  useEffect(() => {
    if (!isGridFullDataLoading && !isEmptyValue(gridFullData)) {
      setCachedGridFullData(gridFullData)
    }
  }, [gridFullData, isGridFullDataLoading])

  useEffect(() => {
    if (!isEmpty(props.value)) {
      const currentIds = new Set((props?.value ?? []).map(item => item.id))
      setCachedGridFullData(prev => prev.filter(item => !isUndefined(item.id) && currentIds.has(item.id)))
    }
  }, [props?.value])

  // When the draft transitions undefined → defined (object refreshed), force a refetch.
  // Queries are always active (dataValue = props.value, unfiltered), so refetchAll() works immediately.
  useEffect(() => {
    if (prevDataObjectRef.current === undefined && dataObject !== undefined) {
      refetchAll()
    }
    prevDataObjectRef.current = dataObject
  }, [dataObject])

  const columnDefinition = visibleFieldsToColumnDefinitions({
    visibleFieldDefinitions,
    disabled: props.inherited === true || props.disabled === true,
    pathFormatterClass: props.pathFormatterClass ?? '',
    transformGridColumn,
    userLanguage
  })

  const selectedColumns = useMemo<SelectedColumn[]>(() => {
    return (visibleFieldDefinitions ?? []).map(col => {
      const locale = col.localizable ? userLanguage : null
      return {
        key: col.key,
        type: col.type,
        config: col.config,
        sortable: col.sortable ?? false,
        editable: col.editable ?? false,
        localizable: col.localizable ?? false,
        frontendType: col.frontendType,
        locale,
        group: col.group as SelectedColumn['group']
      }
    })
  }, [visibleFieldDefinitions, userLanguage])

  const mergedGridFullData = !isEmptyValue(gridFullData) ? gridFullData : cachedGridFullData

  const visibleFieldsValue = useMemo(() => {
    return mergedGridFullData.map(item => {
      return item?.columns?.reduce<Record<string, any>>((acc, col) => {
        acc[col.key!] = col.value
        return acc
      }, {})
    })
  }, [mergedGridFullData])

  const handleEnrichRowData = useCallback(
    (row: ManyToManyRelationValueItem) => {
      const rowData: GridColumnData[] = mergedGridFullData?.find(item => item.id === row.id)?.columns ?? []

      return enrichRowData(visibleFieldDefinitions, row, rowData)
    },
    [mergedGridFullData, visibleFieldDefinitions]
  )

  return (
    <SelectedColumnsProvider columns={ selectedColumns }>
      <ManyToManyRelation
        { ...props }
        columnDefinition={ [...columnDefinition, ...(props.columnDefinition ?? [])] }
        dataObjectsAllowed
        enrichRowData={ handleEnrichRowData }
        isLoading={ isAvailableGridColumnsLoading || isGridFullDataLoading }
        value={ props.value }
        visibleFieldsValue={ visibleFieldsValue }
      />
    </SelectedColumnsProvider>
  )
}

export const ManyToManyObjectRelation = (props: ManyToManyObjectRelationProps): React.JSX.Element => {
  return (
    <DynamicTypeRegistryProvider serviceIds={ [
      'DynamicTypes/GridCellRegistry',
      'DynamicTypes/MetadataRegistry',
      'DynamicTypes/ListingRegistry'
    ] }
    >
      <ManyToManyObjectRelationInner { ...props } />
    </DynamicTypeRegistryProvider>
  )
}
