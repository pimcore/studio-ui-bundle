import { PimcoreImage } from '@Pimcore/components/pimcore-image/pimcore-image'
import React from 'react'
import { useStyle } from './preview-view.styles'

interface PreviewViewProps {
  src: string
}

const PreviewView = (props: PreviewViewProps): React.JSX.Element => {
  const { styles } = useStyle()
  const { src } = props

  return (
    <div className={ styles.preview }>
      <PimcoreImage src={ src } />
    </div>
  )
}

export { PreviewView }
