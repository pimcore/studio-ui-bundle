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

import React, { useEffect, useState } from 'react'
import { PimcoreImage } from '@Pimcore/components/pimcore-image/pimcore-image'
import { useStyle } from './preview-view.styles'
import { ImageZoom } from '@Pimcore/components/image-zoom/image-zoom'
import { ZoomContext } from '@Pimcore/modules/asset/editor/types/image/tab-manager/tabs/preview/preview-container'
import { Flex } from '@Pimcore/components/flex/flex'
import { FocalPoint } from '@Pimcore/components/focal-point/focal-point'

interface PreviewViewProps {
  src: string
}

interface IPostMessageEvent {
  data: {
    type: string
    status: 'success'
    message: string
  }
}

const POST_MESSAGE_SUCCESS = {
  type: 'MiniPaint',
  message: 'Image successfully saved!'
}

const PreviewView = (props: PreviewViewProps): React.JSX.Element => {
  const { src } = props

  const [imageSrc, setImageSrc] = useState(src)

  const { styles } = useStyle()
  const { zoom, setZoom } = React.useContext(ZoomContext)

  useEffect(() => {
    const handleMessage = (event: IPostMessageEvent): void => {
      const { type, message } = event.data

      if (type === POST_MESSAGE_SUCCESS.type && message === POST_MESSAGE_SUCCESS.message) {
        // Update the image to force a reload
        setImageSrc(`${src}?hash=${new Date().getTime()}`)
      }
    }

    window.addEventListener('message', handleMessage)

    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [])

  return (
    <div className={ styles.preview }>

      <Flex className={ styles.imageContainer }>
        <FocalPoint>
          <PimcoreImage src={ imageSrc } />
        </FocalPoint>
      </Flex>

      <div className={ styles.floatingContainer }>
        <div className={ styles.flexContainer }>
          <ImageZoom
            setZoom={ setZoom }
            zoom={ zoom }
          />
        </div>
      </div>
    </div>
  )
}

export { PreviewView }
