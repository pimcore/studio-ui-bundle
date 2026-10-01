/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isNil } from 'lodash'
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
 * Props for {@link BaseColumnEditor}. Split out into this shared types module - rather than kept
 * inline in `base-column-editor.tsx` - to keep that file under the project's line budget.
 */
export interface BaseColumnEditorProps {
  entity: string
  classDefinitionId?: string
  columns: SchemaColumn[]
  onApply: (columns: SchemaColumn[]) => void
  onCancel: () => void
  /**
   * When true, the Apply/Discard toolbar buttons are hidden (used e.g. in a split migration view
   * where the host renders its own confirm/cancel actions). The add-column buttons still render.
   */
  hideApplyDiscard?: boolean
  /**
   * When true, the "Add column" / "Add advanced column" toolbar buttons and the embedded
   * fields-to-add panel are hidden (used when the host provides its own way to add columns).
   */
  hideAddButtons?: boolean
  /**
   * @deprecated Use `hideApplyDiscard` and/or `hideAddButtons` instead. When true and the split
   * flags are not explicitly set, this hides both the Apply/Discard buttons and the add-column
   * buttons, matching the previous all-or-nothing behavior.
   */
  hideToolbar?: boolean
  /** Service ID of the DynamicTypePipelineRegistry to use for source fields. */
  sourceFieldsRegistryId: string
  /** Service ID of the DynamicTypePipelineRegistry to use for transformers. */
  transformersRegistryId: string
  /** The currently selected preview language. When provided, the LanguageSelection is controlled externally. */
  language?: string
  /** Called when the user changes the preview language inside the modal. */
  onLanguageChange?: (language: string) => void
  /** When true, only columns marked as exportable are offered in the add-column dropdown. */
  exportableOnly?: boolean
  /** True when the editor is rendered in a horizontally constrained context (e.g. a dialog split view). */
  compact?: boolean
  /**
   * Called whenever the draft changes (add/remove/reorder/pipeline/locale edits), with the same
   * `SchemaColumn[]` shape `onApply`/`getColumns()` use. Additive: existing callers that only read
   * the draft on demand via the imperative handle's `getColumns()` are unaffected. Useful for a host
   * that embeds the editor with `hideApplyDiscard` and needs to track dirty state or mirror the
   * current columns elsewhere (e.g. a sibling preview panel) without polling the ref.
   */
  onChange?: (columns: SchemaColumn[]) => void
  /**
   * When true, hides the top bar's own preview object picker and language selector. Use this when
   * the host renders its own equivalent controls next to the editor (e.g. a preview panel) and the
   * two would otherwise duplicate each other; the editor still resolves an internal default object/
   * language for advanced columns' own inline pipeline preview.
   */
  hidePreviewControls?: boolean
  /**
   * When true, renders a fully non-interactive view: no add/fields panel, no drag handles, no
   * remove/locale controls, and every pipeline form is disabled. Implies `hideApplyDiscard`/
   * `hideAddButtons`. Use this for a schema/channel whose storage is not writeable.
   */
  readOnly?: boolean
  /**
   * When true, the editor stretches to fill 100% of its container's height instead of the fixed
   * `calc(80vh - 200px)` the editor originally inherited from its Data Hub modal use. Pass this
   * when the host already gives the editor a definite height to grow into (a full-height tab pane,
   * a dialog body with its own fixed height, ...) so the fields panel, column list and any nested
   * preview scroll internally within the available space instead of clipping at a fixed height.
   * Defaults to false so existing modal consumers (Data Hub's column config modal, which relies on
   * the fixed height because its own antd Modal has no definite height of its own) are unaffected.
   */
  fillHeight?: boolean
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
export const getClassificationStoreColumnLabel = (
  column: ClassificationStoreColumnLabelInput,
  translate: (name: string) => string = (name) => name
): string => {
  const fieldDefinition = column.config?.fieldDefinition as { title?: string, name?: string } | undefined
  const rawKeyLabel = fieldDefinition?.title ?? fieldDefinition?.name
  const keyLabel = rawKeyLabel !== undefined ? translate(rawKeyLabel) : String(column.config?.keyId ?? '')
  const groupName = column.config?.groupName

  return joinClassificationStoreLabel(typeof groupName === 'string' ? translate(groupName) : undefined, keyLabel)
}

/** Joins an (already translated) group name and key title into the "Group › Key" label. */
export const joinClassificationStoreLabel = (groupLabel: string | null | undefined, keyLabel: string): string =>
  isNil(groupLabel) || groupLabel === '' ? keyLabel : `${groupLabel} › ${keyLabel}`
