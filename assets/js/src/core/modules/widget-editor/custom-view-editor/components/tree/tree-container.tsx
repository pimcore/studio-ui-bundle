/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Content, ContentLayout, Icon, IconButton, IconTextButton, SearchInput, Toolbar, type TreeDataItem, TreeElement } from '@sdk/components'
import { isNil, isString, isUndefined } from 'lodash'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useWidgetEditorContext } from '../../context/hooks/use-widget-editor-context'
import { usePerspectiveWidgetGetConfigCollectionQuery, type WidgetConfig } from '@sdk/api/perspectives'

export const TreeContainer = (): React.JSX.Element => {
  const { t } = useTranslation()
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [treeDataFiltered, setTreeDataFiltered] = useState<TreeDataItem[]>([])
  const { openWidget } = useWidgetEditorContext()
  const { data: widgets } = usePerspectiveWidgetGetConfigCollectionQuery()

  const generateTreeStructure = (widgets: WidgetConfig[]): TreeDataItem[] => {
    const tmpTreeData: TreeDataItem[] = []

    if (widgets.length > 0) {
      widgets.forEach((item: WidgetConfig) => {
        tmpTreeData.push({
          title: item.name,
          key: item.id,
          icon: <Icon value={item.icon.value} />
        })
      })
    }

    return tmpTreeData
  }

  useEffect(() => {
    if (isUndefined(widgets)) {
      setTreeDataFiltered([])
    }

    if (!isUndefined(widgets)) {
      setTreeDataFiltered(generateTreeStructure(widgets.items))
    }
  }, [widgets])

  const handleSearch = (value: string): void => {
    if (value.length === 0) {
      if (!isUndefined(widgets)) {
        setTreeDataFiltered(generateTreeStructure(widgets.items))
      }
      return
    }

    if (!isUndefined(widgets)) {
      const filteredData = widgets.items.filter((item: WidgetConfig) => {
        if (!isNil(item.name)) {
          return item.name.toLowerCase().includes(value.toLowerCase())
        }

        return false
      })

      setTreeDataFiltered(generateTreeStructure(filteredData))
    }
  }

  const clearSearch = (): void => {
    setSearchTerm('')
    if (!isUndefined(widgets)) {
      setTreeDataFiltered(generateTreeStructure(widgets.items))
    }
  }

  return (
    <ContentLayout
      renderToolbar={(
        <Toolbar justify="space-between">
          <IconButton
            icon={{ value: 'refresh' }}
            title={t('refresh')}
          />

          <IconTextButton
            icon={{ value: 'new' }}
          >
            {t('toolbar.new')}
          </IconTextButton>
        </Toolbar>
      )}
    >
      <Content padded>
        <SearchInput
          onChange={(e) => { setSearchTerm(e.target.value) }}
          onClear={clearSearch}
          onSearch={handleSearch}
          value={searchTerm}
          withoutAddon
        />
        <TreeElement
          hasRoot={false}
          onSelected={(key) => {
            const widget = widgets!.items.find((w) => isString(w.id) && isString(key) && w.id === key)

            if (widget !== undefined) {
              void openWidget(widget.id, widget.widgetType)
            }
          }}
          treeData={treeDataFiltered}
        />
      </Content>
    </ContentLayout>
  )
}
