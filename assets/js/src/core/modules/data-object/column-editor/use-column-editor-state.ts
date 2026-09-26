/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { useElementSelector } from '@Pimcore/modules/element/element-selector/provider/element-selector/use-element-selector'
import { SelectionType } from '@Pimcore/modules/element/element-selector/provider/element-selector/element-selector-provider'
import { api, type GridColumnConfiguration } from '@Pimcore/modules/data-object/data-object-api-slice-enhanced'
import { useClassDefinitionCollectionQuery } from '@Pimcore/modules/class-definition/class-definition-slice.gen'
import { isAllowed } from '@Pimcore/modules/auth/permission-helper'
import { UserPermission } from '@Pimcore/modules/auth/enums/user-permission'
import { isNil } from 'lodash'
import {
  advancedFromSchemaColumn,
  advancedToSchemaColumn,
  ADVANCED_COLUMN_KEY,
  ADVANCED_COLUMN_TYPE,
  type AdvancedEditorColumn,
  type SchemaColumn
} from './types'
import { type ColumnPickerGroup } from '@Pimcore/components/column-picker/column-picker.types'
import { useAddColumnGroups } from './use-add-column-groups'

const SYSTEM_COLUMNS = [
  { key: 'id', type: 'system.id', group: ['system'] as string[], config: [] as never[] },
  { key: 'fullpath', type: 'system.string', group: ['system'] as string[], config: [] as never[] }
]

interface UseColumnEditorStateOptions {
  entity: string
  classDefinitionId?: string
  columns: SchemaColumn[]
  onApply: (columns: SchemaColumn[]) => void
  onCancel: () => void
  /** When true, only columns marked as exportable are offered in the add-column dropdown. */
  exportableOnly?: boolean
}

interface UseColumnEditorStateResult {
  draft: AdvancedEditorColumn[]
  isLoading: boolean
  objectId: number | null
  /** The resolved class definition id (explicit prop, or looked up from `entity`) pipeline forms scope class-bound pickers to. */
  resolvedClassId: string
  availableFields: GridColumnConfiguration[]
  columnGroups: Array<ColumnPickerGroup<GridColumnConfiguration>>
  /** Adds an advanced (pipeline) column, or undefined when the schema offers none. */
  onAddAdvancedColumn?: () => void
  openElementSelector: () => void
  handleAddColumnOfType: (column: GridColumnConfiguration) => void
  handlePipelineChange: (id: string, pipeline: Record<string, any>) => void
  handleRemove: (id: string) => void
  handleApply: () => void
  handleDiscard: () => void
  handleLocaleChange: (id: string, locale: string | null) => void
  handleReorder: (ids: string[]) => void
  getColumns: () => SchemaColumn[]
}

export const useColumnEditorState = ({
  entity,
  classDefinitionId,
  columns,
  onApply,
  onCancel,
  exportableOnly = false
}: UseColumnEditorStateOptions): UseColumnEditorStateResult => {
  // Resolved directly from the class-definition list query rather than through
  // useClassDefinitions()/ClassDefinitionsProvider: this hook is also mounted inside the
  // document editor iframe realm (BPT's `outputdata` editable), which has no
  // ClassDefinitionsProvider ancestor. The query is only a fallback for when the caller
  // does not already know the class id, so it is skipped entirely whenever
  // `classDefinitionId` is supplied - the common case for every embedding except the
  // Studio grid's own "add column" entry point.
  const needsClassLookup = isNil(classDefinitionId)
  const hasObjectsPermission = isAllowed(UserPermission.Objects)
  const { data: classDefinitionsData } = useClassDefinitionCollectionQuery(undefined, {
    skip: !needsClassLookup || !hasObjectsPermission
  })

  const resolvedClassId = useMemo(() => {
    if (!isNil(classDefinitionId)) return classDefinitionId
    return classDefinitionsData?.items?.find((item) => item.name === entity)?.id ?? entity
  }, [classDefinitionId, entity, classDefinitionsData])

  const { data, isLoading } = api.endpoints.dataObjectGetAvailableGridColumns.useQuery({
    classId: resolvedClassId,
    folderId: 1
  })

  const [draft, setDraft] = useState<AdvancedEditorColumn[]>(() =>
    columns.map(advancedFromSchemaColumn)
  )

  useEffect(() => {
    setDraft(columns.map(advancedFromSchemaColumn))
  }, [columns])

  const [objectId, setObjectId] = useState<number | null>(null)
  const hasManualSelection = useRef(false)

  const { data: gridData } = api.endpoints.dataObjectGetGrid.useQuery(
    { classId: resolvedClassId, body: { folderId: 1, columns: SYSTEM_COLUMNS, filters: { includeDescendants: true, page: 1, pageSize: 1 } } },
    { skip: resolvedClassId === undefined }
  )

  useEffect(() => {
    if (hasManualSelection.current) return
    const firstItem = gridData?.items?.[0]
    if (firstItem?.id !== undefined) {
      setObjectId(firstItem.id)
    }
  }, [gridData?.items])

  const { open: openElementSelector } = useElementSelector({
    selectionType: SelectionType.Single,
    areas: { object: true, asset: false, document: false },
    config: {
      objects: {
        allowedTypes: ['object'],
        ...(entity !== undefined ? { allowedClasses: [entity] } : {})
      }
    },
    onFinish: (event) => {
      const item = event?.items?.[0]
      if (item !== undefined) {
        hasManualSelection.current = true
        setObjectId(item.data.id)
      }
    }
  })

  const availableFields: GridColumnConfiguration[] = data?.columns ?? []

  useEffect(() => {
    if (availableFields.length === 0) return
    setDraft(prev => prev.map(col => {
      const available = availableFields.find(f =>
        f.key === col.key || (col.type === ADVANCED_COLUMN_TYPE && f.type === col.type)
      )
      if (available === undefined) return col
      return {
        ...col,
        localizable: col.localizable ?? available.localizable,
        pipelineConfig: col.pipelineConfig ?? (available.config as Record<string, any> | undefined)
      }
    }))
  }, [availableFields])

  const handleAddColumnOfType = useCallback((column: GridColumnConfiguration): void => {
    setDraft(prev => [...prev, {
      _id: crypto.randomUUID(),
      key: column.key,
      fieldtype: column.key,
      type: column.type,
      pipelineConfig: column.config as Record<string, any> | undefined,
      localizable: column.localizable,
      isNew: true
    }])
  }, [])

  // Only the add-column dropdown is restricted to exportable columns. The full
  // availableFields list is still used above to hydrate already-configured columns,
  // so existing schemas containing non-exportable columns keep rendering unchanged.
  const addColumnFields = useMemo(
    () => exportableOnly ? availableFields.filter(field => field.exportable === true) : availableFields,
    [availableFields, exportableOnly]
  )

  const columnGroups = useAddColumnGroups(addColumnFields)

  const advancedColumn = useMemo(
    () => addColumnFields.find(field => field.type === ADVANCED_COLUMN_TYPE || field.key === ADVANCED_COLUMN_KEY),
    [addColumnFields]
  )

  const onAddAdvancedColumn = advancedColumn !== undefined
    ? (): void => { handleAddColumnOfType(advancedColumn) }
    : undefined

  const handlePipelineChange = (id: string, pipeline: Record<string, any>): void => {
    setDraft(prev => prev.map(col =>
      col._id === id ? { ...col, pipeline } : col
    ))
  }

  const handleRemove = (id: string): void => {
    setDraft(prev => prev.filter(col => col._id !== id))
  }

  const handleApply = (): void => {
    onApply(draft.filter(col => col.key !== '').map(advancedToSchemaColumn))
  }

  const handleDiscard = (): void => {
    setDraft(columns.map(advancedFromSchemaColumn))
    onCancel()
  }

  const handleLocaleChange = (id: string, locale: string | null): void => {
    setDraft(prev => prev.map(c => c._id === id ? { ...c, locale } : c))
  }

  const handleReorder = (ids: string[]): void => {
    setDraft(prev => {
      return ids
        .map(id => prev.find(col => col._id === id))
        .filter((col): col is AdvancedEditorColumn => col !== undefined)
    })
  }

  return {
    draft,
    isLoading,
    objectId,
    resolvedClassId,
    availableFields,
    columnGroups,
    onAddAdvancedColumn,
    openElementSelector,
    handleAddColumnOfType,
    handlePipelineChange,
    handleRemove,
    handleApply,
    handleDiscard,
    handleLocaleChange,
    handleReorder,
    getColumns: () => draft.filter(col => col.key !== '').map(advancedToSchemaColumn)
  }
}
