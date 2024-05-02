/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*/

import { PimcoreImage } from '@Pimcore/components/pimcore-image/pimcore-image'
import React from 'react'
import { useStyle } from './preview-view.styles'
import { ImageZoom } from '@Pimcore/components/image-zoom/image-zoom'
import { ZoomContext } from '@Pimcore/modules/asset/editor/image/tab-manager/tabs/preview/preview-container'

interface PreviewViewProps {
  src: string
}

const PreviewView = (props: PreviewViewProps): React.JSX.Element => {
  const { styles } = useStyle()
  const { src } = props
  const { zoom, setZoom } = React.useContext(ZoomContext)

  return (
    <div className={ styles.preview }>
      <PimcoreImage src={ src } />

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
