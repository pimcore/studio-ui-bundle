/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect, useState, useMemo } from 'react'
import { isNil, isUndefined } from 'lodash'
import { Content } from '@Pimcore/components/content/content'
import { ContentLayout } from '@Pimcore/components/content-layout/content-layout'
import { Flex } from '@Pimcore/components/flex/flex'
import { Icon } from '@Pimcore/components/icon/icon'
import { SearchInput } from '@Pimcore/components/search-input/search-input'
import { Spin } from '@Pimcore/components/spin/spin'
import { TreeElement, type TreeDataItem } from '@Pimcore/components/tree-element/tree-element'
import { useTranslation } from 'react-i18next'
import { useThumbnailImageGetTreeQuery, type ThumbnailConfigurationData, type ThumbnailConfigurationFolderData } from '@Pimcore/modules/asset/editor/types/asset-thumbnails-api-slice.gen'
import { ImageThumbnailsTreeToolbar } from '../image-thumbnails-tree-toolbar/image-thumbnails-tree-toolbar'
import { findThumbnailById, filterThumbnailsRecursive } from '../../utils/tree-helpers'

export interface ImageThumbnailsTreeProps {
  onThumbnailSelect: (thumbnail: ThumbnailConfigurationData) => void
  selectedThumbnail: ThumbnailConfigurationData | null
}

export const ImageThumbnailsTree = ({ onThumbnailSelect, selectedThumbnail }: ImageThumbnailsTreeProps): React.JSX.Element => {
  const { data: thumbnailsData, isLoading, isFetching, refetch } = useThumbnailImageGetTreeQuery()
  const [thumbnailsListData, setThumbnailsListData] = useState<(ThumbnailConfigurationData | ThumbnailConfigurationFolderData)[]>([])
  const [filteredData, setFilteredData] = useState<(ThumbnailConfigurationData | ThumbnailConfigurationFolderData)[]>([])
  const [searchValue, setSearchValue] = useState('')
  const [expandedKeys, setExpandedKeys] = useState<string[]>([])
  const [treeKey, setTreeKey] = useState(0)

  useEffect(() => {
    if (!isNil(thumbnailsData?.items)) {
      setThumbnailsListData(thumbnailsData.items)
      setFilteredData(thumbnailsData.items)
      setTreeKey(prev => prev + 1)
    }
  }, [thumbnailsData])

  useEffect(() => {
    if (searchValue === '') {
      setFilteredData(thumbnailsListData)
    } else {
      setFilteredData(filterThumbnailsRecursive(thumbnailsListData, searchValue))
    }
  }, [searchValue, thumbnailsListData])

  const { t } = useTranslation()

  const getTreeItemIcon = (item: ThumbnailConfigurationData | ThumbnailConfigurationFolderData): React.JSX.Element | undefined => {
    const isFolder = 'children' in item && Array.isArray(item.children)
    
    if (isFolder) {
      return <Icon value="folder" />
    }

    return <Icon value="image-thumbnail-clear" />
  }

  const transformToTreeData = (items: (ThumbnailConfigurationData | ThumbnailConfigurationFolderData)[] | null): TreeDataItem[] => {
    if (isNil(items)) {
      return []
    }

    return [...items]
      .sort((a, b) => {
        return a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })
      })
      .map((item) => {
        const isFolder = 'children' in item && Array.isArray(item.children)
        const actions = isFolder
          ? []
          : [
              { key: 'delete', icon: 'trash' }
            ]

        return {
          key: isUndefined(item.id) ? '' : String(item.id),
          title: item.name,
          icon: getTreeItemIcon(item),
          children: isFolder ? transformToTreeData((item as ThumbnailConfigurationFolderData).children) : undefined,
          isLeaf: !isFolder,
          actions,
          allowDrag: false,
          allowDrop: false
        }
      })
  }

  const treeData = useMemo(() => transformToTreeData(filteredData), [filteredData])

  const handleAdd = (): void => {
    console.log('Add thumbnail configuration')
  }

  const handleDelete = (key: string): void => {
    const thumbnail = findThumbnailById(key, thumbnailsListData)
    if (!isNil(thumbnail) && 'writeable' in thumbnail) {
      console.log('Delete thumbnail:', thumbnail)
    }
  }


  const handleActionsClick = (key: string, action: string): void => {
    switch (action) {
      case 'delete':
        handleDelete(key)
        break
    }
  }

  const handleTreeItemClick = (key: string): void => {
    const thumbnail = findThumbnailById(key, thumbnailsListData)
    if (!isNil(thumbnail)) {
      const isFolder = 'children' in thumbnail && Array.isArray(thumbnail.children)
      
      if (isFolder) {
        const currentKeys = expandedKeys
        if (!isNil(currentKeys) && currentKeys.includes(key)) {
          setExpandedKeys(currentKeys.filter(k => k !== key))
        } else {
          setExpandedKeys([...currentKeys, key])
        }
      } else {
        onThumbnailSelect(thumbnail as ThumbnailConfigurationData)
      }
    }
  }

  const selectedKeys = selectedThumbnail ? [selectedThumbnail.id] : []

  return (
    <ContentLayout
      renderToolbar={
        <ImageThumbnailsTreeToolbar
          isFetching={ isFetching }
          onAdd={ handleAdd }
          onRefresh={ refetch }
        />
      }
    >
      <Content
        loading={ isLoading }
        padded
      >
        <SearchInput
          onChange={ (e) => { setSearchValue(e.target.value) } }
          placeholder={ t('search') }
          withoutAddon
        />

        <Flex
          className="h-full"
          gap="mini"
          justify={ isFetching ? 'center' : 'start' }
          vertical
        >
          {isFetching
            ? (
              <Flex
                align="center"
                justify="center"
              >
                <Spin
                  asContainer
                  tip='Loading'
                />
              </Flex>
              )
            : (
              <>
                {filteredData.length === 0
                  ? (
                    <Content none />
                    )
                  : (
                    <TreeElement
                      defaultExpandedKeys={ expandedKeys }
                      key={ `thumbnail-tree-${treeKey}` }
                      onActionsClick={ handleActionsClick }
                      onExpand={ (keys) => { setExpandedKeys(keys as string[]) } }
                      onSelected={ (key) => { handleTreeItemClick(String(key)) } }
                      selectedKeys={ selectedKeys }
                      treeData={ treeData }
                    />
                    )}
              </>
              )}
        </Flex>
      </Content>
    </ContentLayout>
  )
}
