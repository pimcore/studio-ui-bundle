/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import React, { useContext } from 'react'
import { type Image, useAssetGetByIdQuery } from '@Pimcore/modules/asset/asset-api-slice-enhanced'
import { AssetContext } from '@Pimcore/modules/asset/asset-provider'
import {
  AssetEditorSidebarDetailsView,
  type CustomDownloadProps
} from '@Pimcore/modules/asset/editor/types/image/tab-manager/tabs/preview/sidebar/tabs/details/details-view'
import { replaceFileEnding, saveFileLocal } from '@Pimcore/utils/files'
import { buildQueryString } from '@Pimcore/utils/query-string'
import { getPrefix } from '@Pimcore/app/api/pimcore/route'

const DetailContainer = (): React.JSX.Element => {
  const assetContext = useContext(AssetContext)
  const { data } = useAssetGetByIdQuery({ id: assetContext.id })
  const imageData = data! as Image

  return (
    <AssetEditorSidebarDetailsView
      height={ imageData.height ?? 0 }
      onClickCustomDownload={ async (customDownloadProps) => {
        downloadImageByCustomSettings(assetContext.id, customDownloadProps)
      } }
      onClickDownloadByFormat={ async (format) => {
        downloadImageByFormat(assetContext.id, format)
      } }
      width={ imageData.width ?? 0 }
    />
  )

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
        downloadShortcutsHandlerForCustomSettings(imageData.filename!, imageURL, format)
      })
      .catch((err) => {
        console.error(err)
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

        downloadShortcutsHandler(imageData.filename!, imageURL, format)
      })
      .catch((err) => {
        console.error(err)
      })
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
