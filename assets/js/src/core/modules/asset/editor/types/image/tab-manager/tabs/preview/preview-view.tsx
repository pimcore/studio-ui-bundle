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

import { PimcoreImage } from '@Pimcore/components/pimcore-image/pimcore-image'
import React from 'react'
import { useStyle } from './preview-view.styles'
import { ImageZoom } from '@Pimcore/components/image-zoom/image-zoom'
import { ZoomContext } from '@Pimcore/modules/asset/editor/types/image/tab-manager/tabs/preview/preview-container'
import { FocalPoint } from '@Pimcore/components/focal-point/focal-point'

interface PreviewViewProps {
  src: string
}

const PreviewView = (props: PreviewViewProps): React.JSX.Element => {
  const { styles } = useStyle()
  const { src } = props
  const { zoom, setZoom } = React.useContext(ZoomContext)

  return (
    <div className={ styles.preview }>
      <FocalPoint>
        <PimcoreImage src={ src } />
      </FocalPoint>

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
