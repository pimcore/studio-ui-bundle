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

import React from 'react'
import { type GridColumnConfiguration } from '@Pimcore/modules/asset/asset-api-slice.gen'
import { StackList, type StackListProps } from '@Pimcore/components/stack-list/stack-list'
import { Empty, Tag } from 'antd'
import { ButtonGroup } from '@Pimcore/components/button-group/button-group'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { LanguageSelection } from '@Pimcore/language-selection/language-selection'
import { useGridConfig } from './hooks/use-grid-config'
import { useTranslation } from 'react-i18next'

interface GridConfigListProps {
  columns: GridColumnConfiguration[]
}

/* eslint-disable react/jsx-key */
export const GridConfigList = ({ columns }: GridConfigListProps): React.JSX.Element => {
  const { removeColumn, setColumns } = useGridConfig()
  const { t } = useTranslation()

  const stackListItems: StackListProps['items'] = columns.map((column) => ({
    id: column.key,
    sortable: true,

    children: <Tag>{t(`asset.listing.column.${column.key}`)}</Tag>,

    renderRightToolbar: (
      <ButtonGroup items={ [
        <IconButton
          icon='trash'
          onClick={ () => { removeColumn(column) } }
          theme='secondary'
        />,
        ...getLanguageSelection(column)
      ] }
      />
    )
  }))

  return (
    <>
      { stackListItems.length === 0 && <Empty image={ Empty.PRESENTED_IMAGE_SIMPLE } /> }
      { stackListItems.length > 0 && (
      <StackList
        items={ stackListItems }
        onItemsChange={ onItemsChange }
      />
      ) }
    </>
  )

  function getLanguageSelection (column: GridColumnConfiguration): React.JSX.Element[] {
    if (!column.localizable) {
      return []
    }

    // @todo implement language selection with actual data
    return [
      <LanguageSelection
        languages={ ['EN', 'FR'] }
        onSelectLanguage={ () => {} }
        selectedLanguage={ 'EN' }
      />
    ]
  }

  function onItemsChange (items: StackListProps['items']): void {
    const newColumns = items.map((item) => columns.find((column) => column.key === item.id)) as GridColumnConfiguration[]
    setColumns(newColumns)
  }
}
