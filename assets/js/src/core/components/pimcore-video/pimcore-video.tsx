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
import { useTranslation } from 'react-i18next'

interface VideoSourceType {
  src: string
  type?: string
}

interface TrackType {
  kind: string
  label: string
  src: string
  srcLang: string
}

interface PimcoreVideoProps {
  sources: VideoSourceType[]
  tracks?: TrackType[]
  width?: number
  height?: number
  className?: string
}

export const PimcoreVideo = ({
  sources,
  tracks,
  width,
  height,
  className
}: PimcoreVideoProps): React.JSX.Element => {
  const { t } = useTranslation()

  return (
    // eslint-disable-next-line jsx-a11y/media-has-caption
    <video
      className={ className }
      controls
      height={ height }
      width={ width }
    >
      {sources.map((source, index) => (
        <source
          key={ index }
          src={ source.src }
          type={ source.type }
        />
      ))}

      {tracks?.map((track, index) => (
        <track
          key={ index }
          kind={ track.kind }
          label={ track.label }
          src={ track.src }
          srcLang={ track.srcLang }
        />
      ))}

      { t('asset.preview.no-video-support') }
    </video>
  )
}
