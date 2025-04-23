/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import React, { type ReactNode } from 'react'
import { StackList, type StackListProps } from '@Pimcore/components/stack-list/stack-list'
import { Empty, Tag } from 'antd'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { LanguageSelection, transformLanguage } from '@Pimcore/components/language-selection/language-selection'
import { useGridConfig } from './hooks/use-grid-config'
import { useTranslation } from 'react-i18next'
import { Space } from '@Pimcore/components/space/space'
import { useSettings } from '@Pimcore/modules/app/settings/hooks/use-settings'
import { uuid } from '@Pimcore/utils/uuid'
import { type StackListItemProps } from '@Pimcore/components/stack-list/stack-list-item'
import { type AvailableColumn } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/available-columns-provider'

interface GridConfigListProps {
  columns: AvailableColumn[]
}

interface ColumnStackListItemProps extends StackListItemProps {
  meta: AvailableColumn
}

interface ColumnStackListProps extends Omit<StackListProps, 'items'> {
  items: ColumnStackListItemProps[]
}

/* eslint-disable react/jsx-key */
export const GridConfigList = ({ columns }: GridConfigListProps): React.JSX.Element => {
  const { setColumns } = useGridConfig()
  const settings = useSettings()
  const { t } = useTranslation()

  const stackListItems: ColumnStackListProps['items'] = columns.map((column) => {
    const uniqueId = uuid()
    let translationKey = `${column.key}`

    if ('fieldDefinition' in column.config) {
      const fieldDefinition = column.config.fieldDefinition as Record<string, any>
      translationKey = fieldDefinition?.title ?? column.key
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
        <StackList
          items={ stackListItems }
          onItemsChange={ onItemsChange }
          sortable
        />
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
