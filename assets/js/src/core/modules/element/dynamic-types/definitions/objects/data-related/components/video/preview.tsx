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

import React from 'react'
import { type VideoValue } from './video'
import { ImagePreview } from '@Pimcore/components/image-preview/image-preview'

interface VideoPreviewProps {
  value: VideoValue
  width: string | number
  height: string | number
}

const getVideoSrc = (type: string, data: string): string => {
  if (type === 'youtube') {
    return data.startsWith('PL')
      ? `https://www.youtube-nocookie.com/embed/videoseries?list=${data}`
      : `https://www.youtube-nocookie.com/embed/${data}`
  } else if (type === 'vimeo') {
    return `https://player.vimeo.com/video/${data}?title=0&amp;byline=0&amp;portrait=0`
  } else if (type === 'dailymotion') {
    return `https://www.dailymotion.com/embed/video/${data}`
  }
  return ''
}

export const VideoPreview = (props: VideoPreviewProps): React.JSX.Element => {
  if (props.value.data === null) {
    return <></>
  }

  if (props.value.type === 'asset') {
    return (
      <ImagePreview
        assetId={ props.value.data.id }
        assetType="video"
        height={ props.height }
        width={ props.width }
      />
    )
  }

  return (
    <iframe
      allowFullScreen
      height={ props.height }
      src={ getVideoSrc(props.value.type, props.value.data) }
      style={ { border: 'none' } }
      title="Video Preview"
      width={ props.width }
    ></iframe>
  )
}
