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
import { useScrollToLastAdded } from '@Pimcore/components/stack-list/use-scroll-to-last-added'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { useStyles } from './base-column-editor.styles'
import { ColumnEditorToolbar } from './column-editor-toolbar'
import { FieldsToAddPanel } from './fields-to-add-panel'
import { LanguageSelectionContext } from '@Pimcore/components/language-selection/provider/language-selection-provider'
import { LanguageSelectionWithProvider } from '@Pimcore/components/language-selection/language-selection-with-provider'
import { useUser } from '@Pimcore/modules/auth/hooks/use-user'
import { ClassificationStoreModalProvider } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/provider/classifcation-store-modal-provider'
import { AvailableColumnsProvider } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/available-columns-provider'
import { useColumnEditorState } from './use-column-editor-state'
import { useClassificationStoreColumnPicker } from './use-classification-store-column-picker'
import { useSyncAvailableColumnsContext } from './use-sync-available-columns-context'
import { buildColumnStackItems } from './build-column-stack-items'
import { type BaseColumnEditorProps, type ColumnEditorHandle } from './types'

export type { BaseColumnEditorProps } from './types'

/**
 * Wraps {@link BaseColumnEditorInner} with its own, self-contained
 * {@link ClassificationStoreModalProvider} and {@link AvailableColumnsProvider}: the editor is
 * mounted in several realms that don't already provide either (the Studio main window's settings
 * area, and - so far - the document editor iframe dialog), so it cannot rely on an ambient
 * provider the way Studio's own grid configuration does. `AvailableColumnsProvider` is populated
 * from the editor's own available-columns query via `useSyncAvailableColumnsContext` below, so a
 * pipeline source field (e.g. "Simple field") that groups its options by `column.group` sees the
 * same groups the listing grid config offers. Nesting either provider is safe even where an
 * ambient one *does* exist (each provider instance owns its own state).
 */
export const BaseColumnEditor = forwardRef<ColumnEditorHandle, BaseColumnEditorProps>(
  function BaseColumnEditor (props, ref) {
    return (
      <ClassificationStoreModalProvider>
        <AvailableColumnsProvider>
          <BaseColumnEditorInner
            { ...props }
            ref={ ref }
          />
        </AvailableColumnsProvider>
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
    readOnly = false,
    fillHeight = false
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
    // Keep the preview language in step with a controlled `language` prop (host-driven changes).
    // Does not call onLanguageChange: only user selection reports back.
    useEffect(() => {
      if (language !== undefined) {
        setCurrentLanguage(language)
      }
    }, [language])
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

    // Lets pipeline source fields (e.g. "Simple field") group their options by `column.group`,
    // the same way the listing grid configuration's own source-field dropdown does.
    useSyncAvailableColumnsContext(availableFields)

    // Scrolls the newly added row (the last one, when several were added at once - e.g. picking
    // several classification store keys) into view for every user-initiated add: a fields-panel
    // pick, "Add advanced column", the classification store picker, and the imperative
    // `ref.addColumn`, all funnel through `handleAddColumnOfType`/`handleColumnPick` above and end
    // up appending to `draft`. Stays inert on initial load, on re-seeding from the `columns` prop
    // (see `useColumnEditorState`, which always mints a fresh `_id` per re-seed), and on
    // remove/reorder/edit, none of which are a pure append of `draft`'s existing ids.
    const scrollContainerRef = useScrollToLastAdded({ items: draft, getItemId: (col) => col._id })

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
            // `fillHeight` consumers (a full-height tab pane, a dialog body sized by the host)
            // already give this element a definite height to grow into via Content's own
            // `height: 100%` default - the fixed calc() below is only needed for the original
            // Data Hub modal use, whose antd Modal has no definite height of its own.
            style={ fillHeight ? undefined : { height: 'calc(80vh - 200px)' } }
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
                    <div ref={ scrollContainerRef }>
                      <StackList
                        items={ stackItems }
                        onItemsChange={ (items) => {
                          handleReorder(items.map(item => String(item.id)))
                        } }
                        sortable={ !readOnly }
                      />
                    </div>
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
