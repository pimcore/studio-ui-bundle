/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useCallback } from 'react'
import { Card } from '@Pimcore/components/card/card'
import {
  VideoFooter
} from './footer'
import { AssetTarget } from '@Pimcore/components/asset-target/asset-target'
import { useTranslation } from 'react-i18next'
import { Droppable } from '@Pimcore/components/drag-and-drop/droppable'
import type { DragAndDropInfo } from '@sdk/components'
import {
  VideoPreview
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/video/preview'
import { toCssDimension } from '@Pimcore/utils/css'
import cn from 'classnames'
import { useStyles } from './video.styles'
import { InlineUpload } from '@Pimcore/components/inline-upload'
import { useUploadModal } from '@Pimcore/components/modal-upload/hooks/use-upload-modal'
import { type Asset } from '@Pimcore/modules/asset/asset-api-slice-enhanced'

export type VideoValue = AssetVideoValue | YoutubeVideoValue | VimeoVideoValue | DailymotionVideoValue

interface AssetVideoValue {
  type: 'asset'
  data: {
    type: 'asset'
    id: number
    fullPath: string
    subtype: string
  } | null
  title?: string
  description?: string
  poster?: {
    type: 'asset'
    id: number
    fullPath: string
    subtype: string
  } | null
}

interface YoutubeVideoValue {
  type: 'youtube'
  data: string | null
}

interface VimeoVideoValue {
  type: 'vimeo'
  data: string | null
}

interface DailymotionVideoValue {
  type: 'dailymotion'
  data: string | null
}

export type VideoType = 'asset' | 'youtube' | 'vimeo' | 'dailymotion'

export interface VideoProps {
  width: string | number | null
  height: string | number | null
  disabled?: boolean
  value?: VideoValue | null
  onChange?: (value: VideoValue | null) => void
  allowedVideoTypes?: VideoType[]
  className?: string
  uploadPath?: string
}

export const Video = (props: VideoProps): React.JSX.Element => {
  const videoValue = props.value ?? null
  const { triggerUpload } = useUploadModal({})

  const { t } = useTranslation()
  const { styles } = useStyles()

  const handleChange = (value: VideoValue | null): void => {
    props.onChange?.(value)
  }

  const clearValue = (): void => {
    props?.onChange?.(null)
  }

  const handleUploadedAsset = (asset: Asset): void => {
    handleChange({
      type: 'asset',
      data: {
        type: 'asset',
        id: asset.id,
        fullPath: asset.fullPath,
        subtype: asset.type
      }
    })
  }

  const handleUpload = useCallback(() => {
    triggerUpload({
      targetFolderPath: props.uploadPath ?? '',
      accept: 'video/*',
      multiple: false,
      maxItems: 1,
      onSuccess: async (assets: Asset[]) => {
        if (assets.length > 0) {
          handleUploadedAsset(assets[0])
        }
      }
    })
  }, [triggerUpload])

  const handleFileSystemUpload = async (asset: Asset): Promise<void> => {
    handleUploadedAsset(asset)
  }

  // uploading creates a video asset, so it is only offered when asset videos are allowed
  const allowsAssetVideos = props.allowedVideoTypes === undefined || props.allowedVideoTypes.length === 0 || props.allowedVideoTypes.includes('asset')
  const canUpload = props.disabled !== true && allowsAssetVideos

  const getEmptyTargetTitleKey = (): string => {
    if (props.disabled === true) {
      return 'empty'
    }

    return allowsAssetVideos ? 'video.dnd-target' : 'video.add-target'
  }

  const width = toCssDimension(props.width, 300)
  const height = toCssDimension(props.height, 245)
  return (
    <Card
      className={ cn('max-w-full', styles.video, props.className) }
      fitContent
      footer={ (
        <VideoFooter
          allowedVideoTypes={ props.allowedVideoTypes }
          disabled={ props.disabled }
          emptyValue={ clearValue }
          key="video-footer"
          onSave={ handleChange }
          onUpload={ canUpload ? handleUpload : undefined }
          value={ videoValue }
        />)
     }
    >
      <InlineUpload
        accept="video/*"
        assetType="video"
        disabled={ !canUpload }
        onSuccess={ handleFileSystemUpload }
        targetFolderPath={ props.uploadPath ?? '' }
      >
        <Droppable
          isValidContext={ (info: DragAndDropInfo) => props.disabled !== true }
          isValidData={ (info: DragAndDropInfo) => info.type === 'asset' && info.data.type === 'video' }
          onDrop={ (info: DragAndDropInfo) => {
            handleChange({
              type: 'asset',
              data: {
                type: 'asset',
                id: info.data.id as number,
                fullPath: `${info.data.path}${info.data.filename ?? info.data.key}`,
                subtype: info.data.type
              }
            })
          } }
          variant="outline"
        >

          { videoValue !== null && videoValue?.data !== null
            ? (
              <VideoPreview
                height={ height! }
                value={ videoValue }
                width={ width! }
              />
              )
            : (
              <AssetTarget
                dndIcon={ props.disabled !== true && allowsAssetVideos }
                height={ height }
                onUpload={ canUpload ? handleUpload : undefined }
                title={ t(getEmptyTargetTitleKey()) }
                width={ width }
              />
              ) }
        </Droppable>
      </InlineUpload>
    </Card>
  )
}
