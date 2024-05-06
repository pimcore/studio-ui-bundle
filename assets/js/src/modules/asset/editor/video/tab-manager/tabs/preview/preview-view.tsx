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
