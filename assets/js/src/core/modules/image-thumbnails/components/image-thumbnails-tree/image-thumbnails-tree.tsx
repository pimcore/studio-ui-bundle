/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect, useRef, useState, useMemo } from 'react'
import { isNil, isUndefined } from 'lodash'
import { Content } from '@Pimcore/components/content/content'
import { ContentLayout } from '@Pimcore/components/content-layout/content-layout'
import { Flex } from '@Pimcore/components/flex/flex'
import { Icon } from '@Pimcore/components/icon/icon'
import { SearchInput } from '@Pimcore/components/search-input/search-input'
import { Spin } from '@Pimcore/components/spin/spin'
import { TreeElement, type TreeDataItem } from '@Pimcore/components/tree-element/tree-element'
import { useTranslation } from 'react-i18next'
import { type ThumbnailConfigurationData, type ThumbnailConfigurationFolderData } from '@Pimcore/modules/asset/editor/types/asset-thumbnails-api-slice.gen'
import { ImageThumbnailsTreeToolbar } from '../image-thumbnails-tree-toolbar/image-thumbnails-tree-toolbar'
import { findThumbnailById, filterThumbnailsRecursive, getFolderKeysFromTree } from '../../utils/tree-helpers'
import { useStyles } from './image-thumbnails-tree.styles'
import { useThumbnailConfig } from '../../hooks/use-thumbnail-config'
import { useImageThumbnailsContext } from '../../providers/image-thumbnails-provider'
import { type ThumbnailTab } from '../../hooks/use-thumbnail-tab-manager'

export interface ImageThumbnailsTreeProps {
  onThumbnailSelect: (thumbnail: ThumbnailConfigurationData) => void
  onThumbnailClose: (id: string) => void
  openedThumbnails: ThumbnailTab[]
  activeTabKey: string | undefined
  modifiedThumbnails?: string[]
}

export const ImageThumbnailsTree = ({ onThumbnailSelect, onThumbnailClose, openedThumbnails, activeTabKey, modifiedThumbnails = [] }: ImageThumbnailsTreeProps): React.JSX.Element => {
  const { thumbnailsData, isLoading, isFetching, refetch, expandedKeys, setExpandedKeys } = useImageThumbnailsContext()
  const [thumbnailsListData, setThumbnailsListData] = useState<Array<ThumbnailConfigurationData | ThumbnailConfigurationFolderData>>([])
  const [filteredData, setFilteredData] = useState<Array<ThumbnailConfigurationData | ThumbnailConfigurationFolderData>>([])
  const [searchValue, setSearchValue] = useState('')
  const [treeKey, setTreeKey] = useState(0)
  const { styles } = useStyles()
  const { handleDelete: deleteThumbnail, handleAdd } = useThumbnailConfig({ refetch })
  const pendingOpenRef = useRef<string | null>(null)

  useEffect(() => {
    if (!isNil(thumbnailsData?.items)) {
      setThumbnailsListData(thumbnailsData.items)
      setFilteredData(thumbnailsData.items)
      setTreeKey(prev => prev + 1)

      if (!isNil(pendingOpenRef.current)) {
        const pendingName = pendingOpenRef.current
        const addedThumbnail = thumbnailsData.items.find((item) =>
          'name' in item && item.name === pendingName
        )

        if (!isUndefined(addedThumbnail) && 'writeable' in addedThumbnail) {
          onThumbnailSelect(addedThumbnail)
        }

        pendingOpenRef.current = null
      }
    }
  }, [thumbnailsData])

  useEffect(() => {
    if (searchValue === '') {
      setFilteredData(thumbnailsListData)
      setExpandedKeys([])
    } else {
      const filtered = filterThumbnailsRecursive(thumbnailsListData, searchValue)
      setFilteredData(filtered)
      setExpandedKeys(getFolderKeysFromTree(filtered))
    }
  }, [searchValue, thumbnailsListData])

  const { t } = useTranslation()

  const getTreeItemIcon = (item: ThumbnailConfigurationData | ThumbnailConfigurationFolderData): React.JSX.Element | undefined => {
    const isFolder = 'children' in item && Array.isArray(item.children)

    if (isFolder) {
      return (
        <Icon
          className={ styles.icon }
          value="folder"
        />
      )
    }

    return (
      <Icon
        className={ styles.icon }
        value="image-thumbnail"
      />
    )
  }

  const transformToTreeData = (items: Array<ThumbnailConfigurationData | ThumbnailConfigurationFolderData> | null): TreeDataItem[] => {
    if (isNil(items)) {
      return []
    }

    return [...items]
      .sort((a, b) => {
        return a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })
      })
      .map((item) => {
        const isFolder = 'children' in item && Array.isArray(item.children)
        const isModified = !isFolder && modifiedThumbnails.includes(item.id)
        const actions = isFolder
          ? []
          : [
              { key: 'delete', icon: 'trash' }
            ]

        return {
          key: isUndefined(item.id) ? '' : String(item.id),
          title: `${item.name}${isModified ? ' *' : ''}`,
          icon: getTreeItemIcon(item),
          children: isFolder ? transformToTreeData((item).children) : undefined,
          isLeaf: !isFolder,
          actions,
          allowDrag: false,
          allowDrop: false
        }
      })
  }

  const treeData = useMemo(() => transformToTreeData(filteredData), [filteredData, modifiedThumbnails])

  const handleAddWithSelection = (): void => {
    handleAdd((thumbnailName: string) => {
      pendingOpenRef.current = thumbnailName
    })
  }

  const handleDelete = async (key: string): Promise<void> => {
    const thumbnail = findThumbnailById(key, thumbnailsListData)
    if (!isNil(thumbnail) && 'writeable' in thumbnail) {
      await deleteThumbnail(thumbnail, () => {
        onThumbnailClose(key)
      })
    }
  }

  const handleActionsClick = async (key: string, action: string): Promise<void> => {
    if (action === 'delete') {
      await handleDelete(key)
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

  const selectedKeys = activeTabKey != null ? [activeTabKey] : []

  return (
    <ContentLayout
      renderToolbar={
        <ImageThumbnailsTreeToolbar
          isFetching={ isFetching }
          onAdd={ handleAddWithSelection }
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
