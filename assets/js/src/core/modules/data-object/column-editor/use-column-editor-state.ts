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
import { api, type GridColumnConfiguration } from '@Pimcore/modules/data-object/data-object-api-slice-enhanced'
import { useClassDefinitionCollectionQuery } from '@Pimcore/modules/class-definition/class-definition-slice.gen'
import { isAllowed } from '@Pimcore/modules/auth/permission-helper'
import { UserPermission } from '@Pimcore/modules/auth/enums/user-permission'
import { skipToken } from '@reduxjs/toolkit/query'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import { isEqual, isNil } from 'lodash'
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
import { buildEditorColumnFromAvailable } from './build-editor-column'
import { hydrateDraft, reorderDraft } from './draft-helpers'
import { usePreviewObject } from './use-preview-object'

// Stable identity for "no columns yet", so effects keyed on `availableFields` do not re-run every render.
const NO_AVAILABLE_FIELDS: GridColumnConfiguration[] = []

interface UseColumnEditorStateOptions {
  entity: string
  classDefinitionId?: string
  columns: SchemaColumn[]
  onApply: (columns: SchemaColumn[]) => void
  onCancel: () => void
  /** When true, only columns marked as exportable are offered in the add-column dropdown. */
  exportableOnly?: boolean
  /**
   * Called whenever the draft changes (add/remove/reorder/pipeline/locale edits), with the same
   * shape `getColumns()`/`onApply` use. Additive: existing callers that only read the draft via
   * `getColumns()` on demand (e.g. through the imperative handle) are unaffected.
   */
  onChange?: (columns: SchemaColumn[]) => void
}

interface UseColumnEditorStateResult {
  draft: AdvancedEditorColumn[]
  isLoading: boolean
  objectId: number | null
  /**
   * The resolved class definition id (explicit prop, or looked up from `entity`) pipeline forms
   * scope class-bound pickers to. Stays `undefined` while a class-id lookup by `entity` name is
   * still in flight, rather than falling back to the name itself.
   */
  resolvedClassId?: string
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
  exportableOnly = false,
  onChange
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
  const {
    data: classDefinitionsData,
    isLoading: isClassDefinitionsLoading,
    error: classDefinitionsError
  } = useClassDefinitionCollectionQuery(undefined, {
    skip: !needsClassLookup || !hasObjectsPermission
  })

  useEffect(() => {
    if (classDefinitionsError !== undefined) {
      trackError(new ApiError(classDefinitionsError))
    }
  }, [classDefinitionsError])

  // While the lookup is in flight, resolvedClassId stays undefined instead of falling back to
  // the class NAME: passing the name as a classId fires `available-columns`/grid requests
  // against the wrong id, which then get replaced once the real id resolves.
  const isClassLookupPending = needsClassLookup && hasObjectsPermission && isClassDefinitionsLoading

  const resolvedClassId = useMemo(() => {
    if (!isNil(classDefinitionId)) return classDefinitionId
    if (isClassLookupPending) return undefined
    return classDefinitionsData?.items?.find((item) => item.name === entity)?.id ?? entity
  }, [classDefinitionId, entity, classDefinitionsData, isClassLookupPending])

  // `currentData`, not `data`: `data` keeps the previous class's result while a new class loads.
  const { currentData: data, isLoading: isAvailableColumnsLoading } = api.endpoints.dataObjectGetAvailableGridColumns.useQuery(
    resolvedClassId !== undefined ? { classId: resolvedClassId, folderId: 1 } : skipToken
  )

  const isLoading = isClassLookupPending || isAvailableColumnsLoading

  const [draft, setDraft] = useState<AdvancedEditorColumn[]>(() =>
    columns.map(advancedFromSchemaColumn)
  )

  // Tracks the draft reference last produced by re-seeding from the `columns` prop (below), so the
  // onChange effect can tell a genuine user edit apart from the render the re-seed itself causes.
  // Declared before the re-seed effect: effects for the same commit run in declaration order, and
  // the onChange effect below must compare against the *previous* baseline, not one a sibling
  // effect already advanced further down in the same flush.
  const lastSeededDraft = useRef(draft)
  // The current draft for effects that must not depend on it (see the hydration effect below).
  const draftRef = useRef(draft)
  draftRef.current = draft
  const onChangeRef = useRef(onChange)
  onChangeRef.current = onChange

  // Notifies the host on every draft change (add/remove/reorder/pipeline/locale edits), so a
  // consumer that embeds the editor without its own Apply/Discard toolbar (e.g. Backend Power
  // Tools' Output Channels) can track dirty state and the current columns without polling
  // `ref.getColumns()`. Skipped when this render's draft is the one the re-seed effect (below)
  // just produced from the `columns` prop, to avoid a spurious "dirty" notification on mount or
  // whenever the host passes an equivalent-but-new `columns` array.
  useEffect(() => {
    if (draft === lastSeededDraft.current) {
      return
    }

    onChangeRef.current?.(draft.filter(col => col.key !== '').map(advancedToSchemaColumn))
    // The latest callback is read via a ref, so the effect fires once per draft change and never
    // because the caller passed a new callback identity.
  }, [draft])

  // Re-seeds only when the host's `columns` really changed in content, or the class changed. A new
  // array instance with equal contents (a host re-rendering with fresh data) must not discard
  // unapplied local edits; a class change always rebuilds the class-bound draft metadata.
  const lastSeed = useRef({ columns, classId: resolvedClassId })

  useEffect(() => {
    const isSameClass = lastSeed.current.classId === resolvedClassId
    const isSameContent = isEqual(columns, lastSeed.current.columns)
    lastSeed.current = { columns, classId: resolvedClassId }

    if (isSameClass && isSameContent) {
      return
    }

    const reseeded = columns.map(advancedFromSchemaColumn)
    lastSeededDraft.current = reseeded
    draftRef.current = reseeded
    setDraft(reseeded)
  }, [columns, resolvedClassId])

  const { objectId, openElementSelector } = usePreviewObject(resolvedClassId, entity)

  const availableFields: GridColumnConfiguration[] = data?.columns ?? NO_AVAILABLE_FIELDS

  // Hydration is a seed operation, not a user edit: it keeps the draft reference when it changes
  // nothing, and moves the seed baseline along when the draft is still unedited, so a metadata
  // response arriving after mount never reports the editor as changed.
  useEffect(() => {
    if (availableFields.length === 0) return

    const current = draftRef.current
    const hydrated = hydrateDraft(current, availableFields)
    if (isEqual(hydrated, current)) return

    if (current === lastSeededDraft.current) {
      lastSeededDraft.current = hydrated
    }
    draftRef.current = hydrated
    setDraft(hydrated)
  }, [availableFields])

  const handleAddColumnOfType = useCallback((column: GridColumnConfiguration): void => {
    setDraft(prev => [...prev, buildEditorColumnFromAvailable(column)])
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
    setDraft(prev => reorderDraft(prev, ids))
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
