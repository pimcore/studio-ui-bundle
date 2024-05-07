import React from 'react'
import { useStyle } from './preview-view.styles'
import { PimcoreDocument } from '@Pimcore/components/pimcore-document/pimcore-document'

interface PreviewViewProps {
  src: string
}

const PreviewView = (props: PreviewViewProps): React.JSX.Element => {
  const { styles } = useStyle()
  const { src } = props

  return (
    <div className={ styles.preview }>
      <PimcoreDocument
        src={ src }
      />
    </div>
  )
}

export { PreviewView }
