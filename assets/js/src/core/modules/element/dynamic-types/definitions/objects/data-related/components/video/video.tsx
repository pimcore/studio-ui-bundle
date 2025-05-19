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
import { Card } from '@Pimcore/components/card/card'
import {
  VideoFooter
} from './footer'
import { AssetTarget } from '@Pimcore/components/asset-target/asset-target'
import { useTranslation } from 'react-i18next'
import { Droppable } from '@Pimcore/components/drag-and-drop/droppable'
import type { DragAndDropInfo } from '@Pimcore/components/drag-and-drop/context-provider'
import {
  VideoPreview
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/video/preview'
import { toCssDimension } from '@Pimcore/utils/css'
import cn from 'classnames'
import { useStyles } from './video.styles'

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
}

export const Video = (props: VideoProps): React.JSX.Element => {
  const videoValue = props.value ?? null

  const { t } = useTranslation()
  const { styles } = useStyles()

  const handleChange = (value: VideoValue | null): void => {
    props.onChange?.(value)
  }

  const clearValue = (): void => {
    props?.onChange?.(null)
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
          value={ videoValue }
        />)
     }
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

        { /* eslint-disable-next-line @typescript-eslint/prefer-optional-chain */
          videoValue !== null && videoValue?.data !== null
            ? (
              <VideoPreview
                height={ height! }
                value={ videoValue }
                width={ width! }
              />
              )
            : (
              <AssetTarget
                dndIcon={ props.disabled !== true }
                height={ height }
                title={ t(props.disabled !== true ? 'video.dnd-target' : 'empty') }
                width={ width }
              />
              ) }
      </Droppable>
    </Card>
  )
}
