/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

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

  for (const item of items) {
    if ('children' in item && Array.isArray(item.children)) {
      keys.push(String(item.id), ...getFolderKeysFromTree(item.children))
    }
  }

  return keys
}
