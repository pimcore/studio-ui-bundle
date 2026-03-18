/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { isNil, isUndefined } from 'lodash'
import { Icon } from '@Pimcore/components/icon/icon'
import { type TreeDataItem } from '@Pimcore/components/tree-element/tree-element'
import { type ThumbnailConfigurationData, type ThumbnailConfigurationFolderData } from '@Pimcore/modules/asset/editor/types/asset-thumbnails-api-slice.gen'

export const findThumbnailById = (
  id: string,
  items: Array<ThumbnailConfigurationData | ThumbnailConfigurationFolderData>
): ThumbnailConfigurationData | ThumbnailConfigurationFolderData | null => {
  for (const item of items) {
    if (item.id === id) {
      return item
    }

    if ('children' in item && Array.isArray(item.children)) {
      const found = findThumbnailById(id, item.children)
      if (found !== null) {
        return found
      }
    }
  }

  return null
}

export const filterThumbnailsRecursive = (
  items: Array<ThumbnailConfigurationData | ThumbnailConfigurationFolderData>,
  searchTerm: string
): Array<ThumbnailConfigurationData | ThumbnailConfigurationFolderData> => {
  const searchLower = searchTerm.toLowerCase()

  return items.filter(item => {
    const nameMatches = item.name.toLowerCase().includes(searchLower)

    if ('children' in item && Array.isArray(item.children)) {
      const hasMatchingChildren = filterThumbnailsRecursive(item.children, searchTerm).length > 0
      return nameMatches || hasMatchingChildren
    }

    return nameMatches
  }).map(item => {
    if ('children' in item && Array.isArray(item.children)) {
      const folderItem = item
      const result: ThumbnailConfigurationFolderData = {
        ...folderItem,
        children: filterThumbnailsRecursive(folderItem.children, searchTerm) as ThumbnailConfigurationData[]
      }
      return result
    }

    return item
  })
}

export const getFolderKeysFromTree = (
  items: Array<ThumbnailConfigurationData | ThumbnailConfigurationFolderData>
): string[] => {
  const keys: string[] = []

  const traverseItems = (items: Array<ThumbnailConfigurationData | ThumbnailConfigurationFolderData>): void => {
    for (const item of items) {
      if ('children' in item && Array.isArray(item.children)) {
        keys.push(item.id)
        traverseItems(item.children)
      }
    }
  }

  traverseItems(items)

  return keys
}

export const transformToTreeData = (
  items: Array<ThumbnailConfigurationData | ThumbnailConfigurationFolderData> | null,
  leafIconValue: string,
  iconClassName: string,
  modifiedThumbnails: string[] = []
): TreeDataItem[] => {
  if (isNil(items)) {
    return []
  }

  return [...items]
    .sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }))
    .map((item) => {
      const isFolder = 'children' in item && Array.isArray(item.children)
      const isModified = !isFolder && modifiedThumbnails.includes(item.id)
      const actions = isFolder ? [] : [{ key: 'delete', icon: 'trash' }]
      const icon = isFolder
        ? React.createElement(Icon, { value: 'folder', className: iconClassName })
        : React.createElement(Icon, { value: leafIconValue, className: iconClassName })

      return {
        key: isUndefined(item.id) ? '' : String(item.id),
        title: `${item.name}${isModified ? ' *' : ''}`,
        icon,
        children: isFolder ? transformToTreeData((item).children, leafIconValue, iconClassName, modifiedThumbnails) : undefined,
        isLeaf: !isFolder,
        actions,
        allowDrag: false,
        allowDrop: false
      }
    })
}
