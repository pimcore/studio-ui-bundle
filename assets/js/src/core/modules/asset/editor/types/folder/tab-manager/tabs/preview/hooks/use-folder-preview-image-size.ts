/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useCallback, useEffect, useState } from 'react'
import { isNil, isPlainObject, omit } from 'lodash'
import { removeLocalStorageItem, setLocalStorageItem } from '@Pimcore/utils/local-storage'
import { loadReduxState } from '@Pimcore/utils/redux-state-persistence'
import { useUser } from '@Pimcore/modules/auth/hooks/use-user'
import { SizeTypes } from '@Pimcore/components/preview-card/preview-card.types'

export const FOLDER_PREVIEW_IMAGE_SIZE_STORAGE_KEY = 'asset_folder_preview_image_size'
export const DEFAULT_FOLDER_PREVIEW_IMAGE_SIZE = SizeTypes.SMALL

type ImageSizeByFolder = Record<string, SizeTypes>

/**
 * Mirrors getWidgetManagerStorageKey(): a user id of 0 means the user is not loaded yet.
 */
export const getFolderPreviewImageSizeStorageKey = (userId?: number): string => {
  if (!isNil(userId) && userId !== 0) {
    return `${FOLDER_PREVIEW_IMAGE_SIZE_STORAGE_KEY}_${userId}`
  }
  return FOLDER_PREVIEW_IMAGE_SIZE_STORAGE_KEY
}

const isSizeType = (value: unknown): value is SizeTypes =>
  Object.values<unknown>(SizeTypes).includes(value)

/**
 * Reads the folder -> size map, dropping anything that is not a known size so a manually edited
 * or future-format entry can never reach the Segmented control.
 */
const readImageSizeByFolder = (storageKey: string): ImageSizeByFolder => {
  const stored = loadReduxState<unknown>(storageKey)

  if (!isPlainObject(stored)) {
    return {}
  }

  return Object.entries(stored as Record<string, unknown>)
    .reduce<ImageSizeByFolder>((imageSizeByFolder, [folderId, size]) => {
      if (isSizeType(size)) {
        imageSizeByFolder[folderId] = size
      }
      return imageSizeByFolder
    }, {})
}

const writeImageSizeByFolder = (storageKey: string, imageSizeByFolder: ImageSizeByFolder): void => {
  if (Object.keys(imageSizeByFolder).length === 0) {
    removeLocalStorageItem(storageKey)
    return
  }

  setLocalStorageItem(storageKey, JSON.stringify(imageSizeByFolder))
}

interface UseFolderPreviewImageSize {
  imageSize: SizeTypes
  setImageSize: (size: SizeTypes) => void
}

/**
 * Persists the folder preview image display size per folder and user in local storage, so the
 * choice survives a remount, a reload and a re-login. It is intentionally browser local: the
 * setting does not sync across browsers or machines.
 */
export const useFolderPreviewImageSize = (folderId: number): UseFolderPreviewImageSize => {
  const user = useUser()
  const storageKey = getFolderPreviewImageSizeStorageKey(user?.id)

  const [imageSize, setImageSizeState] = useState<SizeTypes>(
    () => readImageSizeByFolder(storageKey)[folderId] ?? DEFAULT_FOLDER_PREVIEW_IMAGE_SIZE
  )

  useEffect(() => {
    setImageSizeState(readImageSizeByFolder(storageKey)[folderId] ?? DEFAULT_FOLDER_PREVIEW_IMAGE_SIZE)
  }, [storageKey, folderId])

  const setImageSize = useCallback((size: SizeTypes): void => {
    setImageSizeState(size)

    const imageSizeByFolder = readImageSizeByFolder(storageKey)

    writeImageSizeByFolder(
      storageKey,
      // Only folders deviating from the default are kept, which bounds the stored payload
      size === DEFAULT_FOLDER_PREVIEW_IMAGE_SIZE
        ? omit(imageSizeByFolder, String(folderId))
        : { ...imageSizeByFolder, [folderId]: size }
    )
  }, [storageKey, folderId])

  return { imageSize, setImageSize }
}
