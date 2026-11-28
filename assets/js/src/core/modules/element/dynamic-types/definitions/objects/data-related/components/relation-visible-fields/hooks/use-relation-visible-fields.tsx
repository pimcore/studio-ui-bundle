/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { isArray, isEmpty, isNil, isString, isUndefined } from 'lodash'
import { type ColumnDef, createColumnHelper } from '@tanstack/react-table'
import type { ManyToManyRelationValue, ManyToManyRelationValueItem } from '@Pimcore/components/many-to-many-relation'
import {
  getTypedVisibleFieldsKey,
  VISIBLE_FIELDS_ELEMENT_TYPE
} from '@Pimcore/components/many-to-many-relation/utils/visible-fields-key'
import { useDataObjectGetAvailableGridColumnsForRelationQuery } from '@Pimcore/modules/data-object/data-object-api-slice.gen'
import { useClassDefinitions } from '@Pimcore/modules/data-object/utils/provider/class-defintions/use-class-definitions'
import { useElementContext } from '@Pimcore/modules/element/hooks/use-element-context'
import { useDataObjectDraft } from '@Pimcore/modules/data-object/hooks/use-data-object-draft'
import { useClassDefinitionSelectionOptional } from '@Pimcore/modules/data-object/listing/decorator/class-definition-selection/context-layer/provider/use-class-definition-selection'
import { useLanguageSelection } from '@Pimcore/components/language-selection'
import { type SelectedColumn } from '@Pimcore/modules/element/listing/abstract/configuration-layer/provider/selected-columns/selected-columns-provider'
import { Text } from '@Pimcore/components/text/text'
import type { VisibleFieldDefinition } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/many-to-many-object-relation/many-to-many-object-relation'
import { useGridOptions } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/many-to-many-object-relation/hooks/use-grid-options'
import { encodeColumnId } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/many-to-many-object-relation/utils/column-definition'
import { useRelationVisibleFieldValues } from './use-relation-visible-field-values'

/**
 * Where an enriched row keeps its visible field values. Not the field names themselves: the rows of the
 * advanced many-to-many relation carry their metadata columns under their names, and a metadata column and
 * a visible field may share a name.
 */
export const RELATION_VISIBLE_FIELD_VALUES: unique symbol = Symbol('relationVisibleFieldValues')

/** The definition of a visible field as the layout of the relation field carries it (see the core's enrichLayoutDefinition()). */
export interface RelationVisibleFieldLayoutDefinition {
  name?: string
  title?: string
  fieldtype?: string
  sources?: string[]
}

export interface RelationVisibleFieldsClassDefinitionProps {
  visibleFields?: string | null
  visibleFieldDefinitions?: Record<string, RelationVisibleFieldLayoutDefinition> | null
}

export const getRelationVisibleFieldNames = (visibleFields: unknown): string[] => {
  return isString(visibleFields) ? visibleFields.split(',').map((name) => name.trim()).filter((name) => name !== '') : []
}

export const hasRelationVisibleFields = (visibleFields: unknown): boolean => getRelationVisibleFieldNames(visibleFields).length > 0

interface UseRelationVisibleFieldsProps extends RelationVisibleFieldsClassDefinitionProps {
  combinedFieldName?: string
  value?: ManyToManyRelationValue | null
  disabled: boolean
}

export interface UseRelationVisibleFieldsReturn {
  isColumnsLoading: boolean
  /** One read-only column per visible field the user may see. */
  columnDefinition: Array<ColumnDef<any>>
  selectedColumns: SelectedColumn[]
  enrichRowData: (row: ManyToManyRelationValueItem) => ManyToManyRelationValueItem & Record<string | symbol, any>
  /** The values per related element, for the search and the column filters of the relation grid. */
  visibleFieldsValue: Array<Record<string | symbol, any>>
  /** Tells while the values are loading or when they failed, null otherwise. */
  status: React.ReactNode | null
}

/**
 * The visible field columns of the generic relation types (many-to-many relation, advanced many-to-many
 * relation). The columns are the relation's grid columns for the current user - the same column
 * configurations the object relation types render - and their values are loaded per page of rows, after the
 * rows are known: the rows of these relations come with the object data and carry no visible field values.
 */
export const useRelationVisibleFields = (props: UseRelationVisibleFieldsProps): UseRelationVisibleFieldsReturn => {
  const { t } = useTranslation()
  const { id } = useElementContext()
  const { dataObject } = useDataObjectDraft(id)
  const { getByName } = useClassDefinitions()
  // Inline-edit context: there is no editor draft for the row being edited, so fall back to the listing's selected class.
  const listingClassSelection = useClassDefinitionSelectionOptional()
  const { transformGridColumn } = useGridOptions()
  // Localized fields and language-specific metadata follow the content language of the editor, as the object relation types do.
  const { currentLanguage } = useLanguageSelection()

  const editorClassId = !isUndefined(dataObject) ? getByName(dataObject.className)?.id : undefined
  const classId = listingClassSelection?.selectedClassDefinition?.id ?? editorClassId
  const relationField = props.combinedFieldName
  const prevDataObjectRef = useRef(dataObject)

  const { isLoading: isColumnsLoading, data: columnsData } = useDataObjectGetAvailableGridColumnsForRelationQuery(
    { classId, relationField },
    { skip: isUndefined(classId) || isUndefined(relationField) }
  )

  const visibleFieldDefinitions = useMemo<VisibleFieldDefinition[]>(() => {
    const columns = columnsData?.columns
    if (isNil(columns) || isEmpty(columns)) {
      return []
    }

    const list = (isArray(columns) ? columns : Object.values(columns)) as Array<Omit<VisibleFieldDefinition, 'title'>>

    return list.map((column) => {
      // Class field columns are titled by their field definition (see transformGridColumn()); element
      // properties and asset fields by the title the relation describes them with.
      const title = props.visibleFieldDefinitions?.[column.key]?.title

      return { ...column, title: isString(title) && title !== '' ? t(title) : '' }
    })
  }, [columnsData, props.visibleFieldDefinitions, t])

  const { valuesByElement, isLoading, isError, loadedCount, totalCount, refetchAll } = useRelationVisibleFieldValues({
    enabled: visibleFieldDefinitions.length > 0,
    classId,
    relationField,
    locale: currentLanguage ?? null,
    dataValue: props.value
  })

  // When the draft transitions undefined → defined (object refreshed), the values may be outdated.
  useEffect(() => {
    if (prevDataObjectRef.current === undefined && dataObject !== undefined) {
      refetchAll()
    }
    prevDataObjectRef.current = dataObject
  }, [dataObject])

  const columnDefinition = useMemo(() => {
    const columnHelper = createColumnHelper<any>()

    return visibleFieldDefinitions.map((column) => {
      const locale = column.localizable ? currentLanguage : null

      return columnHelper.accessor((row: Record<string | symbol, any>) => row[RELATION_VISIBLE_FIELD_VALUES]?.[column.key], {
        ...transformGridColumn(column, props.disabled),
        id: encodeColumnId(column.key, locale)
      }) as ColumnDef<any>
    })
  }, [visibleFieldDefinitions, props.disabled, transformGridColumn, currentLanguage])

  const selectedColumns = useMemo<SelectedColumn[]>(() => visibleFieldDefinitions.map((column) => ({
    key: column.key,
    type: column.type,
    config: column.config,
    sortable: column.sortable ?? false,
    editable: false,
    localizable: column.localizable ?? false,
    frontendType: column.frontendType,
    locale: column.localizable ? currentLanguage : null,
    group: column.group as SelectedColumn['group']
  })), [visibleFieldDefinitions, currentLanguage])

  const enrichRowData = useCallback((row: ManyToManyRelationValueItem): ManyToManyRelationValueItem & Record<string | symbol, any> => {
    const columns = valuesByElement.get(getTypedVisibleFieldsKey(row.type, row.id)) ?? []
    const values: Record<string, unknown> = {}
    columns.forEach((column) => {
      if (isString(column.key)) {
        values[column.key] = column.value
      }
    })

    return {
      ...row,
      [RELATION_VISIBLE_FIELD_VALUES]: values,
      // the data object cells read the inheritance of a value from here, as in the object relation grids
      '__api-data': { columns }
    }
  }, [valuesByElement])

  const visibleFieldsValue = useMemo(() => Array.from(valuesByElement.entries()).map(([key, columns]) => {
    const separator = key.lastIndexOf(':')
    const entry: Record<string | symbol, any> = {}
    columns.forEach((column) => {
      if (isString(column.key)) {
        entry[column.key] = column.value
      }
    })
    entry.id = Number(key.substring(separator + 1))
    entry[VISIBLE_FIELDS_ELEMENT_TYPE] = key.substring(0, separator)

    return entry
  }), [valuesByElement])

  let status: React.ReactNode | null = null
  if (isLoading) {
    status = (
      <Text type="secondary">
        { loadedCount > 0
          ? t('relations.visible-fields.loading-progress', { loaded: loadedCount, total: totalCount })
          : t('relations.visible-fields.loading') }
      </Text>
    )
  } else if (isError) {
    status = <Text type="danger">{ t('relations.visible-fields.error') }</Text>
  }

  return {
    isColumnsLoading,
    columnDefinition,
    selectedColumns,
    enrichRowData,
    visibleFieldsValue,
    status
  }
}
