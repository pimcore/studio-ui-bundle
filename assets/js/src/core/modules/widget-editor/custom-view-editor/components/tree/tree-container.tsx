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
import { usePerspectiveWidgetGetConfigCollectionQuery } from '@sdk/api/perspectives'
import { useAppDispatch } from '@Pimcore/app/store'
import { api, type WidgetConfig } from '@Pimcore/modules/perspectives/perspectives-slice.enhanced'
import { invalidatingTags } from '@Pimcore/app/api/pimcore/tags'

export const TreeContainer = (): React.JSX.Element => {
  const { t } = useTranslation()
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [treeDataFiltered, setTreeDataFiltered] = useState<TreeDataItem[]>([])
  const { openWidget, createWidget, setIsLoading, isLoading } = useWidgetEditorContext()
  const { data: widgets, isFetching } = usePerspectiveWidgetGetConfigCollectionQuery()
  const dispatch = useAppDispatch()

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
            loading={isLoading || isFetching}
            title={t('refresh')}
            onClick={() => {
              setIsLoading(true)

              dispatch(
                api.util.invalidateTags(
                  invalidatingTags.WIDGETS()
                )
              )

              setIsLoading(false)
            }}
          />

          <IconTextButton
            icon={{ value: 'new' }}
            onClick={createWidget}
            loading={isLoading || isFetching}
          >
            {t('toolbar.new')}
          </IconTextButton>
        </Toolbar>
      )}
    >
      <Content
        padded
        loading={isLoading || isFetching}
      >
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
