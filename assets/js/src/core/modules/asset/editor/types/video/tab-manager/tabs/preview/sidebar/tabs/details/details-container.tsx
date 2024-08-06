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
import {
  useGetAssetByIdQuery, type Video
} from '@Pimcore/modules/asset/asset-api-slice.gen'
import { AssetContext } from '@Pimcore/modules/asset/asset-provider'
import {
  VideoEditorSidebarDetailsTab
} from '@Pimcore/modules/asset/editor/types/video/tab-manager/tabs/preview/sidebar/tabs/details/details-view'
import { useGetVideoThumbnailsQuery } from '@Pimcore/modules/asset/editor/types/asset-thumbnails-api-slice.gen'
import { getDomainWithPrefix } from '@Pimcore/utils/route'
import { saveFileLocal } from '@Pimcore/utils/files'
import { VideoContext } from '@Pimcore/modules/asset/editor/types/video/tab-manager/tabs/preview/preview-container'

const DetailContainer = (): React.JSX.Element => {
  const { setThumbnail } = React.useContext(VideoContext)
  const assetContext = useContext(AssetContext)
  const { data } = useGetAssetByIdQuery({ id: assetContext.id! })
  const videoData = data! as Video
  const videoThumbnailsReq = useGetVideoThumbnailsQuery()
  const videoThumbnails = videoThumbnailsReq.data?.items

  if (videoThumbnails === null || videoThumbnails === undefined) {
    return <>Loading ....</>
  }

  return (
    <VideoEditorSidebarDetailsTab
      height={ videoData.height ?? 0 }
      onChangeThumbnail={ async (thumbnail) => {
        setThumbnailByThumbnailName(assetContext.id!, thumbnail)
      } }
      onClickDownloadByFormat={ async (format) => {
        downloadVideoByFormat(assetContext.id!, format)
      } }
      thumbnails={ videoThumbnails }
      width={ videoData.width ?? 0 }
    />
  )

  function downloadVideoByFormat (id: number, format: string): void {
    const url = `${getDomainWithPrefix()}/assets/${id}/video/download/${format}`

    fetch(url)
      .then(async (response) => await response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob)
        saveFileLocal(videoData.filename!, url)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  function setThumbnailByThumbnailName (id: number, name: string): void {
    const url = `${getDomainWithPrefix()}/assets/${id}/video/stream/${name}`

    fetch(url)
      .then(async (response) => await response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob)
        setThumbnail(url)
      })
      .catch((err) => {
        console.error(err)
      })
  }
}

export { DetailContainer }
