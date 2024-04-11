import { PimcoreImage } from '@Pimcore/components/pimcore-image/pimcore-image'
import React, { useContext } from 'react'
import { useStyle } from './preview-view.styles'
import { ScaleContext } from '@Pimcore/modules/asset/editor/image/tab-manager/tabs/preview/preview-container'

interface PreviewViewProps {
  src: string
}

const PreviewView = (props: PreviewViewProps): React.JSX.Element => {
  const { styles } = useStyle()
  const { src } = props
  const scale = useContext(ScaleContext)

  function getScaleClass (scale: string): string {
    switch (scale) {
      case 'scale-by-width':
        return styles['scale-by-width']
      case 'scale-to-original-size':
        return styles['scale-to-original-size']
      default:
        return ''
    }
  }

  return (
    <div className={ [styles.preview, getScaleClass(scale)].join(' ') }>
      <PimcoreImage src={ src } />
    </div>
  )
}

export { PreviewView }
