/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect, useRef, type ReactNode } from 'react'

function findScrollableParent (element: HTMLElement | null): HTMLElement | null {
  if (element === null || element === document.documentElement) return null
  const { overflow, overflowY } = window.getComputedStyle(element)
  if (/(auto|scroll)/.test(overflow + overflowY) && element.scrollHeight > element.clientHeight) {
    return element
  }
  return findScrollableParent(element.parentElement as HTMLElement | null)
}
import { StackList, type StackListProps } from '@Pimcore/components/stack-list/stack-list'
import { Empty, Tag } from 'antd'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { LanguageSelection } from '@Pimcore/components/language-selection/language-selection'
import { transformLanguage } from '@Pimcore/components/language-selection/helpers'
import { useGridConfig } from './hooks/use-grid-config'
import { useTranslation } from 'react-i18next'
import { Space } from '@Pimcore/components/space/space'
import { useSettings } from '@Pimcore/modules/app/settings/hooks/use-settings'
import { uuid } from '@Pimcore/utils/uuid'
import { type StackListItemProps } from '@Pimcore/components/stack-list/stack-list-item'
import { type AvailableColumn } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/available-columns-provider'
import { isEmptyValue } from '@Pimcore/utils/type-utils'
import { hasFieldDefinition } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/has-field-definition'


interface GridConfigListProps {
  columns: AvailableColumn[]
}

interface ColumnStackListItemProps extends StackListItemProps {
  meta: AvailableColumn
}

interface ColumnStackListProps extends Omit<StackListProps, 'items'> {
  items: ColumnStackListItemProps[]
}

export const GridConfigList = ({ columns }: GridConfigListProps): React.JSX.Element => {
  const { setColumns } = useGridConfig()
  const settings = useSettings()
  const { t } = useTranslation()
  const containerRef = useRef<HTMLDivElement>(null)
  const prevColumnKeysRef = useRef<string[]>([])
  const hasMountedRef = useRef(false)

  useEffect(() => {
    const currentKeys = columns.map((col) => col.key)

    if (!hasMountedRef.current) {
      hasMountedRef.current = true
      prevColumnKeysRef.current = currentKeys
      return
    }

    const prevKeys = prevColumnKeysRef.current
    const isAppend = currentKeys.length > prevKeys.length &&
      prevKeys.every((key, i) => key === currentKeys[i])

    if (isAppend) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const container = containerRef.current
          if (container === null) return
          const scrollParent = findScrollableParent(container.parentElement as HTMLElement | null)
          if (scrollParent === null) return
          scrollParent.scrollTo({ top: scrollParent.scrollHeight - scrollParent.clientHeight, behavior: 'smooth' })
        })
      })
    }

    prevColumnKeysRef.current = currentKeys
  }, [columns])

  const stackListItems: ColumnStackListProps['items'] = columns.map((column) => {
    const uniqueId = uuid()

    let translationKey = `${column.key}`

    if (hasFieldDefinition(column.config)) {
      const fieldDefinition = column.config.fieldDefinition as Record<string, any>
      translationKey = !isEmptyValue(fieldDefinition?.title) ? fieldDefinition?.title : column.key
    }

    return {
      id: uniqueId,
      sortable: true,
      meta: column,

      children: <Tag>{t(`${translationKey}`)}</Tag>,

      renderRightToolbar: (
        <Space size='mini'>
          { getLanguageSelection(uniqueId, column) }
          <IconButton
            icon={ { value: 'trash' } }
            onClick={ () => { onRemoveColumn(uniqueId) } }
            size='small'
            theme='secondary'
          />
        </Space>
      )
    }
  })

  return (
    <>
      { stackListItems.length === 0 && <Empty image={ Empty.PRESENTED_IMAGE_SIMPLE } /> }
      { stackListItems.length > 0 && (
        <div ref={ containerRef }>
          <StackList
            items={ stackListItems }
            onItemsChange={ onItemsChange }
            sortable
          />
        </div>
      ) }
    </>
  )

  function getLanguageSelection (uniqueId: string, column: AvailableColumn): ReactNode {
    if (!column.localizable) {
      return <></>
    }

    const languages = [
      '-',
      ...settings.requiredLanguages
    ]

    return (
      <LanguageSelection
        languages={ languages }
        onSelectLanguage={ (language) => { onLanguageSelection(uniqueId, column, language) } }
        selectedLanguage={ column.locale ?? '-' }
      />
    )
  }

  function onRemoveColumn (uniqueId: string): void {
    const itemList = stackListItems.filter((item) => item.id !== uniqueId)
    const newColumns = itemList.map((item) => item.meta)
    setColumns(newColumns)
  }

  function onLanguageSelection (uniqueId: string, column: AvailableColumn, locale: string): void {
    const itemList = stackListItems.map((item) => {
      if (item.id === uniqueId) {
        return {
          ...item,
          meta: {
            ...item.meta,
            locale: transformLanguage(locale)
          }
        }
      }

      return item
    })

    const newColumns = itemList.map((item) => item.meta)
    setColumns(newColumns)
  }

  function onItemsChange (items: ColumnStackListProps['items']): void {
    const newColumns = items.map((item) => item.meta)
    setColumns(newColumns)
  }
}
