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

  if (props.value.type === 'youtube') {
    let src = `https://www.youtube-nocookie.com/embed/${props.value.data}`
    if (props.value.data.indexOf('PL') === 0) {
      src = `https://www.youtube-nocookie.com/embed/videoseries?list=${props.value.data}`
    }

    return (
      // eslint-disable-next-line jsx-a11y/iframe-has-title
      <iframe
        allowFullScreen
        frameBorder="0"
        height={ props.height }
        src={ src }
        width={ props.width }
      ></iframe>
    )
  }

  if (props.value.type === 'vimeo') {
    const src = `https://player.vimeo.com/video/${props.value.data}?title=0&amp;byline=0&amp;portrait=0`

    return (
    // eslint-disable-next-line jsx-a11y/iframe-has-title
      <iframe
        allowFullScreen
        frameBorder="0"
        height={ props.height }
        src={ src }
        width={ props.width }
      ></iframe>
    )
  }

  if (props.value.type === 'dailymotion') {
    const src = `https://www.dailymotion.com/embed/video/${props.value.data}`

    return (
    // eslint-disable-next-line jsx-a11y/iframe-has-title
      <iframe
        allowFullScreen
        frameBorder="0"
        height={ props.height }
        src={ src }
        width={ props.width }
      ></iframe>
    )
  }

  return <></>
}
