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
import { Empty, Tag } from 'antd'
import { useTranslation } from 'react-i18next'
import { Button } from '@Pimcore/components/button/button'
import { Content } from '@Pimcore/components/content/content'
import { ContentLayout } from '@Pimcore/components/content-layout/content-layout'
import { Flex } from '@Pimcore/components/flex/flex'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { Space } from '@Pimcore/components/space/space'
import { Spin } from '@Pimcore/components/spin/spin'
import { StackList, type StackListProps } from '@Pimcore/components/stack-list/stack-list'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { useStyles } from './base-column-editor.styles'
import { ColumnEditorToolbar } from './column-editor-toolbar'
import { FieldsToAddPanel } from './fields-to-add-panel'
import { LanguageSelectionContext } from '@Pimcore/components/language-selection/provider/language-selection-provider'
import { LanguageSelectionWithProvider } from '@Pimcore/components/language-selection/language-selection-with-provider'
import { useUser } from '@Pimcore/modules/auth/hooks/use-user'
import { isNil } from 'lodash'
import { ColumnEditorItemBody } from './column-editor-item'
import { ColumnLocaleControl } from './column-locale-control'
import { useColumnEditorState } from './use-column-editor-state'
import {
  ADVANCED_COLUMN_TYPE,
  type ColumnEditorHandle,
  type SchemaColumn,
  type AdvancedEditorColumn
} from './types'

const getColumnLabel = (col: AdvancedEditorColumn): string => {
  if (col.key === '') return ''
  return col.key
}

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
}

export const BaseColumnEditor = forwardRef<ColumnEditorHandle, BaseColumnEditorProps>(
  function BaseColumnEditor ({
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
    compact = false
  }: BaseColumnEditorProps, ref): React.JSX.Element {
    const { t } = useTranslation()
    const { styles } = useStyles()
    const user = useUser()
    const [fieldsToAddOpen, setFieldsToAddOpen] = useState(true)

    // hideToolbar is a deprecated alias that hides both halves of the toolbar; the split flags
    // take precedence when explicitly set, so a caller can hide only one half.
    const resolvedHideApplyDiscard = hideApplyDiscard ?? hideToolbar
    const resolvedHideAddButtons = hideAddButtons ?? hideToolbar
    const showAddButtons = !resolvedHideAddButtons
    const showApplyDiscard = !resolvedHideApplyDiscard
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
    } = useColumnEditorState({ entity, classDefinitionId, columns, onApply, onCancel, exportableOnly })

    useImperativeHandle(ref, () => ({
      getColumns,
      addColumn: handleAddColumnOfType
    }), [getColumns, handleAddColumnOfType])

    const stackItems: StackListProps['items'] = draft.map(col => {
      const isAdvanced = col.type === ADVANCED_COLUMN_TYPE
      const label = getColumnLabel(col)

      return {
        id: col._id,
        sortable: true,
        type: isAdvanced ? 'collapse' as const : 'default' as const,
        defaultActive: isAdvanced && col.isNew === true,
        children: isAdvanced
          ? <Tag color='purple'>{ !isNil(col.pipeline?.title) ? String(col.pipeline?.title) : label }</Tag>
          : <Tag>{ label }</Tag>,
        ...(isAdvanced
          ? {
              body: col.pipelineConfig !== undefined
                ? (
                  <ColumnEditorItemBody
                    classDefinitionId={ resolvedClassId }
                    column={ col }
                    compact={ compact }
                    entity={ entity }
                    objectId={ objectId }
                    onPipelineChange={ handlePipelineChange }
                    sourceFieldsRegistryId={ sourceFieldsRegistryId }
                    transformersRegistryId={ transformersRegistryId }
                  />
                  )
                : <Spin />
            }
          : {}),
        renderRightToolbar: (
          <Space size='mini'>
            { col.localizable === true && isAdvanced && (
              <ColumnLocaleControl
                onChange={ (locale) => { handleLocaleChange(col._id, locale) } }
                value={ col.locale }
              />
            ) }
            <IconButton
              icon={ { value: 'trash' } }
              onClick={ () => { handleRemove(col._id) } }
              theme='secondary'
            />
          </Space>
        )
      }
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
          renderTopBar={ (
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
                  onColumnSelect={ handleAddColumnOfType }
                />
              ) }

              <div className={ styles.list }>
                <Space
                  direction='vertical'
                  style={ { width: '100%' } }
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
                      sortable
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
