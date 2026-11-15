/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useContext } from 'react'
import {
  type Image,
  useAssetGetByIdQuery,
  useLazyAssetImageDownloadByThumbnailQuery
} from '@Pimcore/modules/asset/asset-api-slice-enhanced'
import { AssetContext } from '@Pimcore/modules/asset/asset-provider'
import {
  AssetEditorSidebarDetailsView,
  type CustomDownloadProps
} from '@Pimcore/modules/asset/editor/types/image/tab-manager/tabs/preview/sidebar/tabs/details/details-view'
import { replaceFileEnding, saveFileLocal } from '@Pimcore/utils/files'
import { buildQueryString } from '@Pimcore/utils/query-string'
import { getPrefix } from '@Pimcore/app/api/pimcore/route'
import trackError, { GeneralError } from '@Pimcore/modules/app/error-handler'
import { useThumbnailImageGetCollectionQuery } from '@Pimcore/modules/asset/editor/types/asset-thumbnails-api-slice.gen'
import { isAllowed } from '@Pimcore/modules/auth/permission-helper'
import { UserPermission } from '@Pimcore/modules/auth/enums/user-permission'

// a thumbnail config can change the image format, so the saved file takes the extension of what was rendered
const thumbnailFileEndings: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/avif': 'avif',
  'image/gif': 'gif',
  'image/tiff': 'tiff',
  'image/svg+xml': 'svg'
}

const getThumbnailFilename = (assetFilename: string, mimeType: string): string => {
  const fileEnding = thumbnailFileEndings[mimeType]
  if (fileEnding === undefined || !assetFilename.includes('.')) {
    return assetFilename
  }

  return replaceFileEnding(assetFilename, fileEnding)
}

const DetailContainer = (): React.JSX.Element => {
  const assetContext = useContext(AssetContext)
  const { data } = useAssetGetByIdQuery({ id: assetContext.id })
  const imageData = data! as Image
  const [fetchThumbnailDownload] = useLazyAssetImageDownloadByThumbnailQuery()

  // the collection endpoint is gated by the thumbnails permission on top of the assets permission
  const canListThumbnails = isAllowed(UserPermission.Thumbnails)
  const { data: thumbnailsData } = useThumbnailImageGetCollectionQuery(undefined, { skip: !canListThumbnails })
  const downloadableThumbnails = (thumbnailsData?.items ?? []).map(thumbnail => ({
    value: thumbnail.id,
    label: thumbnail.text
  }))

  return (
    <AssetEditorSidebarDetailsView
      downloadableThumbnails={ downloadableThumbnails }
      height={ imageData.height ?? 0 }
      onClickCustomDownload={ async (customDownloadProps) => {
        downloadImageByCustomSettings(assetContext.id, customDownloadProps)
      } }
      onClickDownloadByFormat={ async (format) => {
        downloadImageByFormat(assetContext.id, format)
      } }
      onClickDownloadByThumbnail={ (thumbnailName) => {
        downloadImageByThumbnail(assetContext.id, thumbnailName)
      } }
      width={ imageData.width ?? 0 }
    />
  )

  function downloadImageByThumbnail (id: number, thumbnailName: string): void {
    const request = fetchThumbnailDownload({ id, thumbnailName })
    request
      .unwrap()
      .then((blob) => {
        const objectUrl = URL.createObjectURL(blob)
        saveFileLocal(objectUrl, getThumbnailFilename(imageData.filename, blob.type))
        setTimeout(() => { URL.revokeObjectURL(objectUrl) }, 0)
      })
      .catch(() => {
        trackError(new GeneralError('Could not download thumbnail'))
      })
      .finally(() => {
        request.unsubscribe()
      })
  }

  function downloadImageByCustomSettings (id, {
    width,
    height,
    quality,
    dpi,
    mode,
    format
  }: CustomDownloadProps): void {
    // ?mimeType=JPEG&resizeMode=scaleByWidth&width=140&height=78&quality=99&dpi=200
    const keyValues = [
      {
        key: 'mimeType',
        value: format
      },
      {
        key: 'resizeMode',
        value: mode
      },
      {
        key: 'dpi',
        value: dpi.toString()
      },
      {
        key: 'quality',
        value: quality.toString()
      },
      {
        key: 'height',
        value: height.toString()
      },
      {
        key: 'width',
        value: width.toString()
      }
    ]

    const queryString = buildQueryString(keyValues, ['', '-1'])

    fetch(`${getPrefix()}/assets/${id}/image/download/custom?${queryString}`)
      .then(async (response) => await response.blob())
      .then((imageBlob) => {
        const imageURL = URL.createObjectURL(imageBlob)
        downloadShortcutsHandlerForCustomSettings(imageData.filename, imageURL, format)
      })
      .catch(() => {
        trackError(new GeneralError('Could not download image'))
      })
  }

  function downloadImageByFormat (id: number, format: string): void {
    if (format === 'original') {
      prepareDownload(`${getPrefix()}/assets/${id}/download`, format)
      return
    }
    prepareDownload(`${getPrefix()}/assets/${id}/image/download/format/${format}`, format)
  }

  function prepareDownload (url: string, format: string): void {
    fetch(url)
      .then(async (response) => await response.blob())
      .then((imageBlob) => {
        const imageURL = URL.createObjectURL(imageBlob)

        downloadShortcutsHandler(imageData.filename, imageURL, format)
      })
      .catch(() => { trackError(new GeneralError('Could not prepare download')) })
  }

  function downloadShortcutsHandler (name: string, url: string, format: string): void {
    let filename = name
    if (format !== 'original') {
      filename = replaceFileEnding(name, 'jpg')
    }

    saveFileLocal(url, filename)
  }

  function downloadShortcutsHandlerForCustomSettings (name: string, url: string, format: string): void {
    const filename = replaceFileEnding(name, format.toLowerCase())
    saveFileLocal(url, filename)
  }
}

export { DetailContainer }
