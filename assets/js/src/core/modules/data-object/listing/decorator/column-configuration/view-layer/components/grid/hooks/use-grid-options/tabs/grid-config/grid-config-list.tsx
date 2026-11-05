/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect, useMemo, useRef, type ReactNode } from 'react'
import { StackList, type StackListProps } from '@Pimcore/components/stack-list/stack-list'
import { Empty } from 'antd'
import { useGridConfig } from './hooks/use-grid-config'
import { useTranslation } from 'react-i18next'
import { uuid } from '@Pimcore/utils/uuid'
import { type StackListItemProps } from '@Pimcore/components/stack-list/stack-list-item'
import { type AvailableColumn } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/available-columns-provider'
import { SimpleColumnPreview, SimpleColumnPreviewsProvider } from './simple-column-preview/simple-column-preview'
import { usePreviewModeOptional } from '@Pimcore/components/preview-mode/preview-mode-provider'
import { PermissionBasedLanguageSelectionControl } from '@Pimcore/modules/element/components/language-selection/permission-based-language-selection-control'
import { useInjection } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { type DynamicTypePipelineRegistry } from '@Pimcore/modules/element/dynamic-types/definitions/pipelines/dynamic-type-pipeline-registry'
import { useAvailableColumns } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/use-available-columns'
import { convertColumnToAdvanced, findColumnConversion } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/convert-column-to-advanced'
import { buildAdvancedBody, renderColumnTitle, renderRightToolbar } from './grid-config-list-items'
import { type PipelineItemPosition } from '@Pimcore/components/pipeline/provider/pipeline-item-expand/pipeline-item-expand-provider'

function findScrollableParent (element: HTMLElement | null): HTMLElement | null {
  if (element === null || element === document.documentElement) return null
  const { overflow, overflowY } = window.getComputedStyle(element)
  if (/(auto|scroll)/.test(overflow + overflowY) && element.scrollHeight > element.clientHeight) {
    return element
  }
  return findScrollableParent(element.parentElement)
}


interface ColumnStackListItemProps extends StackListItemProps {
  meta: AvailableColumn
}

interface ColumnStackListProps extends Omit<StackListProps, 'items'> {
  items: ColumnStackListItemProps[]
}

export interface GridConfigPipelineItem extends PipelineItemPosition {
  columnId: string
}

// the sidebar offers expanding a pipeline item into the modal, which then scrolls to that item
export interface GridConfigListProps {
  onExpandPipelineItem?: (item: GridConfigPipelineItem) => void
  focusedPipelineItem?: GridConfigPipelineItem
}

export const GridConfigList = ({ onExpandPipelineItem, focusedPipelineItem }: GridConfigListProps): React.JSX.Element => {
  const { setColumns, columns } = useGridConfig()
  const { t } = useTranslation()
  const containerRef = useRef<HTMLDivElement>(null)
  const prevColumnKeysRef = useRef<string[]>([])
  const hasMountedRef = useRef(false)
  const { enabled: previewEnabled } = usePreviewModeOptional()
  const { getAdvancedColumnTemplate } = useAvailableColumns()
  const sourceFieldsRegistry = useInjection<DynamicTypePipelineRegistry>(serviceIds['DynamicTypes/Grid/SourceFieldsRegistry'])

  const advancedColumnTemplate = useMemo(() => getAdvancedColumnTemplate(), [getAdvancedColumnTemplate])
  const sourceFieldTypes = useMemo(() => sourceFieldsRegistry.getDynamicTypes(), [sourceFieldsRegistry])

  useEffect(() => {
    const currentKeys = columns.map((col) => col.__meta?.uniqueId ?? col.key)

    if (!hasMountedRef.current) {
      hasMountedRef.current = true
      prevColumnKeysRef.current = currentKeys
      return
    }

    const prevKeys = prevColumnKeysRef.current
    const isAppend = currentKeys.length > prevKeys.length &&
      prevKeys.every((key, i) => key === currentKeys[i])

    if (isAppend) {
      const isAdvanced = columns[columns.length - 1]?.key === 'advanced'

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const container = containerRef.current
          if (container === null) return

          const scrollParent = findScrollableParent(container.parentElement)
          if (scrollParent === null) return

          if (isAdvanced) {
            const items = container.querySelectorAll<HTMLElement>('.stack-list__item')
            const lastItem = items[items.length - 1]
            if (lastItem === undefined) return
            const itemTop = lastItem.getBoundingClientRect().top - scrollParent.getBoundingClientRect().top + scrollParent.scrollTop
            scrollParent.scrollTo({ top: itemTop - 8, behavior: 'smooth' })
          } else {
            scrollParent.scrollTo({ top: scrollParent.scrollHeight - scrollParent.clientHeight, behavior: 'smooth' })
          }
        })
      })
    }

    prevColumnKeysRef.current = currentKeys
  }, [columns])

  const stackListItems: ColumnStackListProps['items'] = useMemo(() => columns.map((column) => {
    const uniqueId = column.__meta?.uniqueId ?? uuid()
    const isAdvancedColumn = column.key === 'advanced'
    const advancedBody = buildAdvancedBody({
      column,
      uniqueId,
      previewEnabled,
      focusedPipelineItem,
      onExpandPipelineItem,
      onChange: (newColumn) => { onAdvancedColumnChange(newColumn, uniqueId) }
    })

    return {
      id: uniqueId,
      sortable: true,
      meta: column,

      type: isAdvancedColumn ? 'collapse' : 'default',
      defaultActive: isAdvancedColumn,
      children: renderColumnTitle(column, t),

      ...(isAdvancedColumn
        ? advancedBody
        : (previewEnabled ? { body: <SimpleColumnPreview column={ column } /> } : {})),

      renderRightToolbar: renderRightToolbar({
        column,
        uniqueId,
        t,
        isConvertible: isConvertible(column),
        languageSelection: getLanguageSelection(uniqueId, column),
        onConvert: () => { onConvertColumn(uniqueId) },
        onRemove: () => { onRemoveColumn(uniqueId) }
      })
    }
  }), [columns, advancedColumnTemplate, sourceFieldTypes, previewEnabled, onExpandPipelineItem, focusedPipelineItem])

  return (
    <>
      { stackListItems.length === 0 && <Empty image={ Empty.PRESENTED_IMAGE_SIMPLE } /> }
      { stackListItems.length > 0 && (
        <div ref={ containerRef }>
          <SimpleColumnPreviewsProvider columns={ columns }>
            <StackList
              items={ stackListItems }
              onItemsChange={ onItemsChange }
              sortable
            />
          </SimpleColumnPreviewsProvider>
        </div>
      ) }
    </>
  )

  function getLanguageSelection (uniqueId: string, column: AvailableColumn): ReactNode {
    if (!column.localizable) {
      return <></>
    }

    const isClassificationStore = column.type === 'dataobject.classificationstore'

    return (
      <PermissionBasedLanguageSelectionControl
        customKeys={ isClassificationStore ? ['default'] : [] }
        isNullable
        onChange={ (language) => { onLanguageSelection(uniqueId, column, language) } }
        value={ column.locale === undefined ? null : column.locale }
      />
    )
  }

  function onAdvancedColumnChange (column: AvailableColumn, id: string): void {
    const itemList = stackListItems.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          meta: {
            ...item.meta,
            __meta: {
              ...item.meta.__meta,
              advancedColumnConfig: column.__meta?.advancedColumnConfig
            }
          }
        }
      }
      return item
    })

    const newColumns = itemList.map((item) => item.meta)
    setColumns(newColumns)
  }

  function onRemoveColumn (uniqueId: string): void {
    const itemList = stackListItems.filter((item) => item.id !== uniqueId)
    const newColumns = itemList.map((item) => item.meta)
    setColumns(newColumns)
  }

  /**
   * Whether the column can be turned into an advanced one. Decided by the pipeline source field
   * types, so e.g. relation columns – which have no equivalent source field – are left out.
   */
  function isConvertible (column: AvailableColumn): boolean {
    if (advancedColumnTemplate === undefined) {
      return false
    }

    return findColumnConversion(column, advancedColumnTemplate, sourceFieldTypes) !== undefined
  }

  function onConvertColumn (uniqueId: string): void {
    if (advancedColumnTemplate === undefined) {
      return
    }

    const newColumns = stackListItems.map((item) => {
      if (item.id !== uniqueId) {
        return item.meta
      }

      return convertColumnToAdvanced({
        column: item.meta,
        advancedColumnTemplate,
        sourceFieldTypes,
        siblingColumns: columns.filter((column) => column.__meta?.uniqueId !== uniqueId),
        translate: t
      }) ?? item.meta
    })

    setColumns(newColumns)
  }

  function onLanguageSelection (uniqueId: string, column: AvailableColumn, locale: string | null): void {
    const itemList = stackListItems.map((item) => (
      item.id === uniqueId ? { ...item, meta: { ...item.meta, locale } } : item
    ))

    const newColumns = itemList.map((item) => item.meta)
    setColumns(newColumns)
  }

  function onItemsChange (items: ColumnStackListProps['items']): void {
    const newColumns = items.map((item) => item.meta)
    setColumns(newColumns)
  }
}
