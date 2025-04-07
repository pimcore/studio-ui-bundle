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

import React, { useContext, useMemo, useState } from 'react'
import { useAssetGetByIdQuery, type Video } from '@Pimcore/modules/asset/asset-api-slice-enhanced'
import { AssetContext } from '@Pimcore/modules/asset/asset-provider'
import {
  VideoEditorSidebarDetailsTab
} from '@Pimcore/modules/asset/editor/types/video/tab-manager/tabs/preview/sidebar/tabs/details/details-view'
import { useThumbnailVideoGetCollectionQuery } from '@Pimcore/modules/asset/editor/types/asset-thumbnails-api-slice.gen'
import { getPrefix } from '@Pimcore/app/api/pimcore/route'
import { saveFileLocal } from '@Pimcore/utils/files'
import { VideoContext } from '@Pimcore/modules/asset/editor/types/video/tab-manager/tabs/preview/preview-container'
import { Content } from '@Pimcore/components/content/content'
import { fetchBlobWithPolling } from '@Pimcore/utils/polling-helper'
import trackError, { GeneralError } from '@Pimcore/modules/app/error-handler'

const DetailContainer = (): React.JSX.Element => {
  const [isDownloading, setIsDownloading] = useState(false)
  const { playerPosition, setThumbnail } = React.useContext(VideoContext)
  const assetContext = useContext(AssetContext)
  const [imagePreview, setImagePreview] = useState('')

  useMemo(() => {
    setImagePreviewFromBackend(200, 119)
  }, [])
  const { data: assetData } = useAssetGetByIdQuery({ id: assetContext.id })
  const videoData = assetData! as Video
  const { data: thumbnailsData } = useThumbnailVideoGetCollectionQuery()
  const videoThumbnails = thumbnailsData?.items

  if (videoThumbnails === null || videoThumbnails === undefined) {
    return <Content loading />
  }

  type Callback = () => void
  const noop = (): void => {}

  return (
    <VideoEditorSidebarDetailsTab
      height={ videoData.height ?? 0 }
      imagePreview={ imagePreview }
      isDownloading={ isDownloading }
      onApplyPlayerPosition={ onApplyPlayerPosition }
      onChangeThumbnail={ setThumbnail }
      onClickDownloadByFormat={ downloadVideoByFormat }
      onDropImage={ onDropImage }
      thumbnails={ videoThumbnails }
      width={ videoData.width ?? 0 }
    />
  )

  function setImagePreviewFromBackend (width: number, height: number, then: Callback = noop): void {
    const url = `${getPrefix()}/assets/${assetContext.id}/video/stream/image-thumbnail?width=${width}&height=${height}&aspectRatio=true`
    fetch(url)
      .then(async (response) => await response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob)
        setImagePreview(url)
      })
      .catch(() => {
        trackError(new GeneralError('An error occurred while loading the Thumbnail'))
      }).finally(then)
  }

  function onDropImage (id: number, callback: Callback = noop): void {
    setImagePreviewByToBackend('image_thumbnail_asset', id, callback)
  }

  function onApplyPlayerPosition (callback: Callback = noop): void {
    setImagePreviewByToBackend('image_thumbnail_time', playerPosition, callback)
  }

  function setImagePreviewByToBackend (key: string, value: number, callback: Callback = noop): void {
    const url = `${getPrefix()}/assets/${assetContext.id}`
    fetch(
      url,
      {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          data: {
            customSettings: [
              {
                key,
                value
              }
            ]
          }
        })
      }
    )
      .then(() => {
        setImagePreviewFromBackend(200, 119, callback)
      })
      .catch(() => {
        trackError(new GeneralError('An error occured while setting the Image Preview'))
        callback()
      })
  }

  function downloadVideoByFormat (format: string): void {
    setIsDownloading(true)
    const url = `${getPrefix()}/assets/${assetContext.id}/video/download/${format}`

    fetchBlobWithPolling({
      url,
      onSuccess: (blob) => {
        const objectUrl = URL.createObjectURL(blob)
        saveFileLocal(objectUrl, videoData.filename)
      }
    })
      .catch(() => { trackError(new GeneralError('An error occured while loading the Video')) })
      .finally(() => {
        setIsDownloading(false)
      })
  }
}

export { DetailContainer }
