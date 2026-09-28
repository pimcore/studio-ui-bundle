/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { uuid } from '@Pimcore/utils/uuid'
import { type GridColumnConfiguration } from '@Pimcore/modules/data-object/data-object-api-slice-enhanced'

/**
 * Persisted column shape shared across all consumers of the column editor (Data Hub adapter
 * bundles, Backend Power Tools output channels, …).
 * For advanced columns (type === ADVANCED_COLUMN_TYPE), `key` holds the user-defined title.
 */
export interface SchemaColumn {
  key: string
  fieldtype: string
  type: string
  /** Consumer-specific persisted column data (e.g. { advancedColumns, transformers } for advanced columns). */
  config?: Record<string, any>
  locale?: string | null
}

/**
 * Imperative handle exposed by BaseColumnEditor via forwardRef.
 * Allows a consumer to imperatively read the current draft and add a column.
 */
export interface ColumnEditorHandle<TColumns = SchemaColumn> {
  /** Returns the current list of columns from the editor draft. */
  getColumns: () => TColumns[]
  /** Programmatically adds a column from the available-columns list. */
  addColumn: (column: GridColumnConfiguration) => void
}

/**
 * The special column key that identifies an advanced/pipeline column.
 * Advanced columns have a pipeline (sourceFields + transformers) instead of a direct field mapping.
 */
export const ADVANCED_COLUMN_KEY = 'advanced'

/**
 * The column type registered by the backend for advanced/pipeline columns.
 * Used as the reliable discriminator when loading persisted columns, because the key
 * is now set to the user-defined title rather than the hardcoded sentinel 'advanced'.
 */
export const ADVANCED_COLUMN_TYPE = 'dataobject.advanced'

/**
 * The `fieldtype` value system columns (`id`, `fullpath`, ...) are persisted with. Both Data Hub
 * export adapters shipped in this platform version key off this exact literal - not the column's
 * `type` (e.g. `system.id`) and not its key - to recognize/skip system columns:
 * `data-hub-file-export`'s `UpdateConfiguration` schema example and `AbstractExporter`
 * (`$column['fieldtype'] ?? '' === 'system'`), and `data-hub-simple-rest`'s
 * `DataObjectMappingAndDataExtractor` (`$column['fieldtype'] !== 'system'`).
 */
export const SYSTEM_COLUMN_FIELDTYPE = 'system'

/**
 * Frontend-only draft column type used by the column editor when it supports
 * advanced (pipeline) columns. Extends the base persisted shape with working-state
 * fields that are never written to the backend directly.
 */
export interface AdvancedEditorColumn {
  /** Frontend-only unique id for list keying. */
  _id: string
  key: string
  fieldtype: string
  type: string
  /** Persisted column config blob (e.g. { advancedColumns, transformers } for advanced columns). */
  config?: Record<string, any>
  /**
   * Frontend-only pipeline schema fetched from the available-columns API.
   * Drives what source field types are available in the pipeline form.
   * Never persisted.
   */
  pipelineConfig?: Record<string, any>
  /**
   * Draft pipeline value: { title, sourceFields, transformers }.
   * Present only for advanced columns (type === ADVANCED_COLUMN_TYPE).
   * Never persisted directly — on save, title becomes the column key and
   * sourceFields/transformers are packed into config.advancedColumns/config.transformers.
   */
  pipeline?: Record<string, any>
  /** Whether this column supports per-column locale selection. */
  localizable?: boolean
  locale?: string | null
  /**
   * Frontend-only: true for columns added during the current editing session.
   * Drives the initial collapse state — only freshly added advanced columns mount
   * expanded, while columns loaded from the persisted config stay collapsed. Never persisted.
   */
  isNew?: boolean
}

/**
 * Converts a persisted SchemaColumn into an AdvancedEditorColumn draft.
 * For advanced columns (type === ADVANCED_COLUMN_TYPE) the persisted config is
 * unpacked into the frontend `pipeline` working state, and the column key
 * (which holds the user title) is mapped to pipeline.title.
 */
export const advancedFromSchemaColumn = (col: SchemaColumn): AdvancedEditorColumn => ({
  _id: uuid(),
  key: col.key,
  fieldtype: col.fieldtype,
  type: col.type,
  config: col.config,
  pipeline: col.type === ADVANCED_COLUMN_TYPE
    ? {
        // New format: key holds the title. Legacy format: key === 'advanced', title was a separate field.
        title: col.key !== ADVANCED_COLUMN_KEY ? col.key : (col as any).title,
        sourceFields: (col.config?.advancedColumns ?? []).map((sf: Record<string, any>) => ({
          ...sf,
          config: sf.config ?? {}
        })),
        transformers: col.config?.transformers
      }
    : undefined,
  locale: col.locale
})

/**
 * Converts an AdvancedEditorColumn draft back to a persisted SchemaColumn.
 * For advanced columns the frontend `pipeline` is packed into config.advancedColumns + config.transformers.
 */
export const advancedToSchemaColumn = (col: AdvancedEditorColumn): SchemaColumn => ({
  key: col.type === ADVANCED_COLUMN_TYPE && col.pipeline?.title !== undefined && col.pipeline.title !== ''
    ? col.pipeline.title as string
    : col.key,
  fieldtype: col.fieldtype,
  type: col.type,
  config: col.pipeline !== undefined
    ? {
        advancedColumns: (col.pipeline.sourceFields ?? []).map((sf: Record<string, any>) => ({
          ...sf,
          config: sf.config ?? {}
        })),
        transformers: col.pipeline.transformers
      }
    : col.config,
  locale: col.locale
})

/**
 * The column type registered by the backend for a classification store field: one Studio
 * "available column" entry per container field (e.g. `technicalAttributes`), picked further down
 * into one column per group/key via the group/key picker (see `BaseColumnEditor` and Studio's own
 * grid configuration, which already opens the same picker).
 */
export const CLASSIFICATION_STORE_COLUMN_TYPE = 'dataobject.classificationstore'

export interface ColumnIdentityInput {
  key: string
  type: string
  config?: Record<string, any>
}

/**
 * A stable identity for a persisted column: the bare `key` for every column type except
 * classification store, where several picked keys are persisted under the same container field
 * `key` (e.g. `technicalAttributes`) and only `config.groupId`/`config.keyId` tell them apart.
 * Used for duplicate detection while adding columns, for column list row identity, and as the base
 * Backend Power Tools' Output Channels builds its label-storage keys from.
 *
 * This is the single source of truth for the format (`<key>#<groupId>.<keyId>`). Output Channels
 * mirrors it verbatim in `OutputChannelColumn::getIdentity()` (PHP) and reuses this exact function
 * from its own TypeScript (`buildLabelKey`/`validateColumns`/`useColumnTitles`) - keep all of them in
 * sync if this format ever changes.
 */
export const getColumnIdentity = (column: ColumnIdentityInput): string => {
  const groupId = column.config?.groupId
  const keyId = column.config?.keyId

  if (column.type === CLASSIFICATION_STORE_COLUMN_TYPE && groupId !== undefined && keyId !== undefined) {
    return `${column.key}#${groupId}.${keyId}`
  }

  return column.key
}

export interface ClassificationStoreColumnLabelInput {
  config?: Record<string, any>
}

/**
 * "Group › key" display label for a classification store column, e.g. "Dimensions › Height". Falls
 * back to the key's own title/name (or, as a last resort, its raw key id) when no group name is
 * available - columns picked before the group/key picker started recording `config.groupName` only
 * have `config.groupId`.
 */
export const getClassificationStoreColumnLabel = (column: ClassificationStoreColumnLabelInput): string => {
  const fieldDefinition = column.config?.fieldDefinition as { title?: string, name?: string } | undefined
  const keyLabel = fieldDefinition?.title ?? fieldDefinition?.name ?? String(column.config?.keyId ?? '')
  const groupName = column.config?.groupName

  return typeof groupName === 'string' && groupName !== '' ? `${groupName} › ${keyLabel}` : keyLabel
}
