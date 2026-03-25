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
import { SearchInput } from '@Pimcore/components/search-input/search-input'
import { Spin } from '@Pimcore/components/spin/spin'
import { TreeElement } from '@Pimcore/components/tree-element/tree-element'
import { useTranslation } from 'react-i18next'
import { type ThumbnailConfigurationData, type ThumbnailConfigurationFolderData } from '@Pimcore/modules/asset/editor/types/asset-thumbnails-api-slice.gen'
import { VideoThumbnailsTreeToolbar } from '../video-thumbnails-tree-toolbar/video-thumbnails-tree-toolbar'
import { findThumbnailById, filterThumbnailsRecursive, getFolderKeysFromTree, transformToTreeData } from '../../utils/tree-helpers'
import { useStyles } from './video-thumbnails-tree.styles'
import { useVideoThumbnailConfig } from '../../hooks/use-video-thumbnail-config'
import { useVideoThumbnailsContext } from '../../providers/video-thumbnails-provider'
import { type ThumbnailTab } from '../../hooks/use-video-thumbnail-tab-manager'

export interface VideoThumbnailsTreeProps {
  onThumbnailSelect: (thumbnail: ThumbnailConfigurationData) => void
  openedThumbnails: ThumbnailTab[]
  activeTabKey: string | undefined
  modifiedThumbnails?: string[]
}

export const VideoThumbnailsTree = ({ onThumbnailSelect, openedThumbnails, activeTabKey, modifiedThumbnails = [] }: VideoThumbnailsTreeProps): React.JSX.Element => {
  const { thumbnailsData, isLoading, isFetching, refetch, expandedKeys, setExpandedKeys } = useVideoThumbnailsContext()
  const [thumbnailsListData, setThumbnailsListData] = useState<Array<ThumbnailConfigurationData | ThumbnailConfigurationFolderData>>([])
  const [filteredData, setFilteredData] = useState<Array<ThumbnailConfigurationData | ThumbnailConfigurationFolderData>>([])
  const [searchValue, setSearchValue] = useState('')
  const [treeKey, setTreeKey] = useState(0)
  const { styles } = useStyles()
  const { handleDelete: deleteThumbnail, handleAdd } = useVideoThumbnailConfig({ refetch })
  const pendingOpenRef = useRef<string | null>(null)
  const savedExpandedKeysRef = useRef<string[] | null>(null)

  useEffect(() => {
    if (!isNil(thumbnailsData?.items)) {
      setThumbnailsListData(thumbnailsData.items)

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
      if (savedExpandedKeysRef.current !== null) {
        setExpandedKeys(savedExpandedKeysRef.current)
        savedExpandedKeysRef.current = null
      }
    } else {
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      if (savedExpandedKeysRef.current === null) {
        savedExpandedKeysRef.current = expandedKeys
      }
      const filtered = filterThumbnailsRecursive(thumbnailsListData, searchValue)
      setFilteredData(filtered)
      setExpandedKeys(getFolderKeysFromTree(filtered))
    }
    setTreeKey(prev => prev + 1)
  }, [searchValue, thumbnailsListData])

  const { t } = useTranslation()

  const treeData = useMemo(() => transformToTreeData(filteredData, 'video-thumbnail', styles.icon, modifiedThumbnails), [filteredData, modifiedThumbnails])

  const handleAddWithSelection = (): void => {
    handleAdd((thumbnailName: string) => {
      pendingOpenRef.current = thumbnailName
    })
  }

  const handleDelete = async (key: string): Promise<void> => {
    const thumbnail = findThumbnailById(key, thumbnailsListData)
    if (!isNil(thumbnail) && 'writeable' in thumbnail) {
      await deleteThumbnail(thumbnail)
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
        if (isNil(currentKeys) || !currentKeys.includes(key)) {
          setExpandedKeys([...currentKeys, key])
        } else {
          setExpandedKeys(currentKeys.filter(k => k !== key))
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
        <VideoThumbnailsTreeToolbar
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
                      key={ `video-thumbnail-tree-${treeKey}` }
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
