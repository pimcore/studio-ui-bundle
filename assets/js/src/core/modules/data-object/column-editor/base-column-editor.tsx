/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useCallback, useEffect, useImperativeHandle, useMemo, useState, forwardRef } from 'react'
import { Empty } from 'antd'
import { useTranslation } from 'react-i18next'
import { Button } from '@Pimcore/components/button/button'
import { Content } from '@Pimcore/components/content/content'
import { ContentLayout } from '@Pimcore/components/content-layout/content-layout'
import { Flex } from '@Pimcore/components/flex/flex'
import { Space } from '@Pimcore/components/space/space'
import { Spin } from '@Pimcore/components/spin/spin'
import { StackList } from '@Pimcore/components/stack-list/stack-list'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { useStyles } from './base-column-editor.styles'
import { ColumnEditorToolbar } from './column-editor-toolbar'
import { FieldsToAddPanel } from './fields-to-add-panel'
import { LanguageSelectionContext } from '@Pimcore/components/language-selection/provider/language-selection-provider'
import { LanguageSelectionWithProvider } from '@Pimcore/components/language-selection/language-selection-with-provider'
import { useUser } from '@Pimcore/modules/auth/hooks/use-user'
import { ClassificationStoreModalProvider } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/provider/classifcation-store-modal-provider'
import { useColumnEditorState } from './use-column-editor-state'
import { useClassificationStoreColumnPicker } from './use-classification-store-column-picker'
import { buildColumnStackItems } from './build-column-stack-items'
import { type ColumnEditorHandle, type SchemaColumn } from './types'

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
}

/**
 * Wraps {@link BaseColumnEditorInner} with its own, self-contained
 * {@link ClassificationStoreModalProvider}: the editor is mounted in several realms that don't
 * already provide one (the Studio main window's settings area, and - so far - the document editor
 * iframe dialog), so it cannot rely on an ambient provider the way Studio's own grid configuration
 * does. Nesting is safe even where an ambient provider *does* exist (each provider instance owns its
 * own modal state).
 */
export const BaseColumnEditor = forwardRef<ColumnEditorHandle, BaseColumnEditorProps>(
  function BaseColumnEditor (props, ref) {
    return (
      <ClassificationStoreModalProvider>
        <BaseColumnEditorInner
          { ...props }
          ref={ ref }
        />
      </ClassificationStoreModalProvider>
    )
  }
)

const BaseColumnEditorInner = forwardRef<ColumnEditorHandle, BaseColumnEditorProps>(
  function BaseColumnEditorInner ({
    entity,
    classDefinitionId,
    columns,
    onApply,
    onCancel,
    hideApplyDiscard,
    hideAddButtons,
    hideToolbar = false,
    sourceFieldsRegistryId,
    transformersRegistryId,
    language,
    onLanguageChange,
    exportableOnly = false,
    compact = false,
    onChange,
    hidePreviewControls = false,
    readOnly = false
  }: BaseColumnEditorProps, ref): React.JSX.Element {
    const { t } = useTranslation()
    const { styles } = useStyles()
    const user = useUser()
    const [fieldsToAddOpen, setFieldsToAddOpen] = useState(true)

    // hideToolbar is a deprecated alias that hides both halves of the toolbar; the split flags
    // take precedence when explicitly set, so a caller can hide only one half. `readOnly` always
    // hides both, regardless of what the split flags say.
    const resolvedHideApplyDiscard = hideApplyDiscard ?? hideToolbar
    const resolvedHideAddButtons = hideAddButtons ?? hideToolbar
    const showAddButtons = !resolvedHideAddButtons && !readOnly
    const showApplyDiscard = !resolvedHideApplyDiscard && !readOnly
    const showToolbar = showAddButtons || showApplyDiscard

    // Own the language state here. Initialize once from the prop, falling back to
    // the user's first content language. This is the single source of truth —
    // no synchronization effects needed.
    const initialLanguage = language ?? (user.contentLanguages as string[] | undefined)?.[0] ?? 'en'
    const [currentLanguage, setCurrentLanguage] = useState(initialLanguage)
    const [hasLocalizedFields, setHasLocalizedFields] = useState(false)

    // On mount, persist the resolved initial language to the parent so that
    // entities that have never had a language set get one saved immediately.
    useEffect(() => {
      onLanguageChange?.(currentLanguage)
    }, [])

    const handleLanguageChange = useCallback((lang: string) => {
      setCurrentLanguage(lang)
      onLanguageChange?.(lang)
    }, [onLanguageChange])

    // Build a stable context value to pass to the provider.
    const languageContextValue = useMemo(() => ({
      currentLanguage,
      setCurrentLanguage: handleLanguageChange,
      hasLocalizedFields,
      setHasLocalizedFields
    }), [currentLanguage, handleLanguageChange, hasLocalizedFields])

    const {
      draft,
      isLoading,
      objectId,
      resolvedClassId,
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
      getColumns
    } = useColumnEditorState({ entity, classDefinitionId, columns, onApply, onCancel, exportableOnly, onChange })

    const { handleColumnPick } = useClassificationStoreColumnPicker({
      resolvedClassId,
      entity,
      draft,
      handleAddColumnOfType
    })

    useImperativeHandle(ref, () => ({
      getColumns,
      addColumn: handleColumnPick
    }), [getColumns, handleColumnPick])

    const stackItems = buildColumnStackItems({
      draft,
      resolvedClassId,
      compact,
      entity,
      objectId,
      sourceFieldsRegistryId,
      transformersRegistryId,
      onPipelineChange: handlePipelineChange,
      onLocaleChange: handleLocaleChange,
      onRemove: handleRemove,
      readOnly,
      t
    })

    if (isLoading) {
      return (
        <Flex
          align='center'
          justify='center'
          style={ { minHeight: 200 } }
        >
          <Spin />
        </Flex>
      )
    }

    return (
      <LanguageSelectionContext.Provider value={ languageContextValue }>
        <ContentLayout
          renderToolbar={ !showToolbar
            ? undefined
            : (
              <ColumnEditorToolbar
                onAddAdvancedColumn={ onAddAdvancedColumn }
                onApply={ handleApply }
                onDiscard={ handleDiscard }
                onToggleFieldsPanel={ () => { setFieldsToAddOpen(isOpen => !isOpen) } }
                showAddButtons={ showAddButtons }
                showApplyDiscard={ showApplyDiscard }
              />
              ) }
          renderTopBar={ hidePreviewControls
            ? undefined
            : (
              <Toolbar
                align='center'
                position='content'
                theme='secondary'
              >
                <Button onClick={ openElementSelector }>
                  { t('column-editor.preview.select-object') }
                </Button>

                <LanguageSelectionWithProvider />
              </Toolbar>
              ) }
        >
          <Content
            padded
            padding={ { x: 'none', y: 'small' } }
            style={ { height: 'calc(80vh - 200px)' } }
          >
            <div className={ styles.body }>
              { showAddButtons && fieldsToAddOpen && (
                <FieldsToAddPanel
                  groups={ columnGroups }
                  onClose={ () => { setFieldsToAddOpen(false) } }
                  onColumnSelect={ handleColumnPick }
                />
              ) }

              <div className={ styles.list }>
                <Space
                  className='w-full'
                  direction='vertical'
                >
                  { draft.length === 0 && (
                    <Empty image={ Empty.PRESENTED_IMAGE_SIMPLE } />
                  ) }

                  { draft.length > 0 && (
                    <StackList
                      items={ stackItems }
                      onItemsChange={ (items) => {
                        handleReorder(items.map(item => String(item.id)))
                      } }
                      sortable={ !readOnly }
                    />
                  ) }
                </Space>
              </div>
            </div>
          </Content>
        </ContentLayout>
      </LanguageSelectionContext.Provider>
    )
  }
)
