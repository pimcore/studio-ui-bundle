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
import {
  useAssetGetByIdQuery, type Video
} from '@Pimcore/modules/asset/asset-api-slice.gen'
import { AssetContext } from '@Pimcore/modules/asset/asset-provider'
import {
  VideoEditorSidebarDetailsTab
} from '@Pimcore/modules/asset/editor/types/video/tab-manager/tabs/preview/sidebar/tabs/details/details-view'
import { useThumbnailVideoGetCollectionQuery } from '@Pimcore/modules/asset/editor/types/asset-thumbnails-api-slice.gen'
import { getDomainWithPrefix } from '@Pimcore/app/api/pimcore/route'
import { saveFileLocal } from '@Pimcore/utils/files'
import { VideoContext } from '@Pimcore/modules/asset/editor/types/video/tab-manager/tabs/preview/preview-container'
import { Content } from '@Pimcore/components/content/content'

const DetailContainer = (): React.JSX.Element => {
  const { playerPosition, setThumbnail } = React.useContext(VideoContext)
  const assetContext = useContext(AssetContext)
  const [imagePreview, setImagePreview] = useState('')

  useMemo(() => {
    setImagePreviewFromBackend(200, 119)
  }, [])
  const { data: assetData } = useAssetGetByIdQuery({ id: assetContext.id! })
  const videoData = assetData! as Video
  const { data: thumbnailsData } = useThumbnailVideoGetCollectionQuery()
  const videoThumbnails = thumbnailsData?.items

  if (videoThumbnails === null || videoThumbnails === undefined) {
    return <Content loading />
  }

  return (
    <VideoEditorSidebarDetailsTab
      height={ videoData.height ?? 0 }
      imagePreview={ imagePreview }
      onApplyPlayerPosition={ onApplyPlayerPosition }
      onChangeThumbnail={ setThumbnailByThumbnailName }
      onClickDownloadByFormat={ downloadVideoByFormat }
      onDropImage={ onDropImage }
      thumbnails={ videoThumbnails }
      width={ videoData.width ?? 0 }
    />
  )

  function setImagePreviewFromBackend (width: number, height: number): void {
    const url = `${getDomainWithPrefix()}/assets/${assetContext.id!}/video/stream/image-thumbnail?width=${width}&height=${height}`
    fetch(url)
      .then(async (response) => await response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob)
        setImagePreview(url)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  function onDropImage (id: number): void {
    setImagePreviewByToBackend('image_thumbnail_asset', id)
  }

  function onApplyPlayerPosition (): void {
    setImagePreviewByToBackend('image_thumbnail_time', playerPosition)
  }

  function setImagePreviewByToBackend (key: string, value: number): void {
    const url = `${getDomainWithPrefix()}/assets/${assetContext.id!}`
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
      .then(() => { setImagePreviewFromBackend(200, 119) })
      .catch((err) => {
        console.error(err)
      })
  }

  function downloadVideoByFormat (format: string): void {
    const url = `${getDomainWithPrefix()}/assets/${assetContext.id!}/video/download/${format}`
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

  function setThumbnailByThumbnailName (name: string): void {
    const url = `${getDomainWithPrefix()}/assets/${assetContext.id!}/video/stream/${name}`

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
