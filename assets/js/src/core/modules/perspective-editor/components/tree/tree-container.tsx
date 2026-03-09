/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type PerspectiveConfig, usePerspectiveGetConfigCollectionQuery } from '@Pimcore/modules/perspectives/perspectives-slice.enhanced'
import { Content, ContentLayout, Icon, IconButton, IconTextButton, SearchInput, Toolbar, type TreeDataItem, TreeElement } from '@sdk/components'
import { isNil, isUndefined } from 'lodash'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { usePerspectiveEditorContext } from '../../context/hooks/use-perspective-editor-context'
import { usePerspectiveEditor } from '../../hooks/use-perspective-editor'

export const TreeContainer = (): React.JSX.Element => {
  const { t } = useTranslation()
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [treeDataFiltered, setTreeDataFiltered] = useState<TreeDataItem[]>([])
  const { openPerspective } = usePerspectiveEditorContext()
  const { createPerspective } = usePerspectiveEditor()
  const { data: perspectives, isLoading, isFetching, refetch } = usePerspectiveGetConfigCollectionQuery()

  const generateTreeStructure = (perspectives: PerspectiveConfig[]): TreeDataItem[] => {
    return [...perspectives]
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((item: PerspectiveConfig) => ({
        title: item.name,
        key: item.id,
        icon: <Icon
          type={ item.icon.type }
          value={ item.icon.value }
              />
      }))
  }

  useEffect(() => {
    if (isUndefined(perspectives)) {
      setTreeDataFiltered([])
    }

    if (!isUndefined(perspectives)) {
      setTreeDataFiltered(generateTreeStructure(perspectives.items))
    }
  }, [perspectives])

  const handleSearch = (value: string): void => {
    if (value.length === 0) {
      if (!isUndefined(perspectives)) {
        setTreeDataFiltered(generateTreeStructure(perspectives.items))
      }
      return
    }

    if (!isUndefined(perspectives)) {
      const filteredData = perspectives.items.filter((item: PerspectiveConfig) => {
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
    if (!isUndefined(perspectives)) {
      setTreeDataFiltered(generateTreeStructure(perspectives.items))
    }
  }

  return (
    <ContentLayout
      renderToolbar={ (
        <Toolbar justify="space-between">
          <IconButton
            data-testid="perspective-tree-refresh-button"
            icon={ { value: 'refresh' } }
            loading={ isLoading || isFetching }
            onClick={ async () => {
              await refetch()
            } }
            title={ t('refresh') }
          />

          <IconTextButton
            data-testid="perspective-tree-create-button"
            disabled={ isLoading || isFetching }
            icon={ { value: 'new' } }
            loading={ isLoading || isFetching }
            onClick={ async () => { createPerspective() } }
          >
            {t('toolbar.new')}
          </IconTextButton>
        </Toolbar>
      ) }
    >
      <Content
        loading={ isLoading || isFetching }
        padded
      >
        <SearchInput
          onChange={ (e) => { setSearchTerm(e.target.value) } }
          onClear={ clearSearch }
          onSearch={ handleSearch }
          value={ searchTerm }
          withoutAddon
        />
        <TreeElement
          hasRoot={ false }
          onSelected={ (key) => {
            void openPerspective(key as string)
          } }
          treeData={ treeDataFiltered }
        />
      </Content>
    </ContentLayout>
  )
}
