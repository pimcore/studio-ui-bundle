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
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useWidgetEditorActions } from '../../context/hooks/use-widget-editor-context'
import { usePerspectiveWidgetGetConfigCollectionQuery } from '@sdk/api/perspectives'
import { type WidgetConfig } from '@Pimcore/modules/perspectives/perspectives-slice.enhanced'

export const TreeContainer = (): React.JSX.Element => {
  const { t } = useTranslation()
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [treeDataFiltered, setTreeDataFiltered] = useState<TreeDataItem[]>([])
  const { openWidget, createWidget } = useWidgetEditorActions()
  const { data: widgets, isFetching, isLoading, refetch } = usePerspectiveWidgetGetConfigCollectionQuery({ skipWrapperWidgets: true })

  const generateTreeStructure = useCallback((items: WidgetConfig[]): TreeDataItem[] => {
    return [...items]
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((item: WidgetConfig) => ({
        title: item.name,
        key: item.id,
        icon: <Icon
          type={ item.icon.type }
          value={ item.icon.value }
              />
      }))
  }, [])

  useEffect(() => {
    if (isUndefined(widgets)) {
      setTreeDataFiltered([])
    }

    if (!isUndefined(widgets)) {
      setTreeDataFiltered(generateTreeStructure(widgets.items))
    }
  }, [widgets, generateTreeStructure])

  const handleSearch = useCallback((value: string): void => {
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
  }, [widgets, generateTreeStructure])

  const clearSearch = useCallback((): void => {
    setSearchTerm('')
    if (!isUndefined(widgets)) {
      setTreeDataFiltered(generateTreeStructure(widgets.items))
    }
  }, [widgets, generateTreeStructure])

  const handleRefresh = useCallback(async (): Promise<void> => {
    await refetch()
  }, [refetch])

  const handleSelected = useCallback((key: React.Key): void => {
    const widget = widgets?.items.find((w) => isString(w.id) && isString(key) && w.id === key)

    if (widget !== undefined) {
      void openWidget(widget.id, widget.widgetType)
    }
  }, [widgets, openWidget])

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value)
  }, [])

  const toolbar = useMemo(() => (
    <Toolbar justify="space-between">
      <IconButton
        data-testid="widget-tree-refresh-button"
        icon={ { value: 'refresh' } }
        loading={ isLoading || isFetching }
        onClick={ handleRefresh }
        title={ t('refresh') }
      />

      <IconTextButton
        data-testid="widget-tree-create-button"
        icon={ { value: 'new' } }
        loading={ isLoading || isFetching }
        onClick={ createWidget }
      >
        {t('toolbar.new')}
      </IconTextButton>
    </Toolbar>
  ), [isLoading, isFetching, handleRefresh, createWidget, t])

  return (
    <ContentLayout
      renderToolbar={ toolbar }
    >
      <Content
        loading={ isLoading || isFetching }
        padded
      >
        <SearchInput
          onChange={ handleSearchChange }
          onClear={ clearSearch }
          onSearch={ handleSearch }
          value={ searchTerm }
          withoutAddon
        />
        <TreeElement
          hasRoot={ false }
          onSelected={ handleSelected }
          treeData={ treeDataFiltered }
        />
      </Content>
    </ContentLayout>
  )
}
