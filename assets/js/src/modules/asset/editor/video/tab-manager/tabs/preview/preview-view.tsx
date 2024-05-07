import React from 'react'
import { useStyle } from './preview-view.styles'
import { PimcoreVideo } from '@Pimcore/components/pimcore-video/pimcore-video'

interface PreviewViewProps {
  src: string
}

const PreviewView = (props: PreviewViewProps): React.JSX.Element => {
  const { styles } = useStyle()
  const { src } = props

  return (
    <div className={ styles.preview }>
      <PimcoreVideo
        sources={ [{ src }] }
      />
    </div>
  )
}

export { PreviewView }
