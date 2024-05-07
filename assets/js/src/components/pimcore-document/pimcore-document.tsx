import { Spin } from 'antd'
import React, { useState } from 'react'
import { useStyle } from '@Pimcore/components/pimcore-document/pimcore-document.styles'

interface PimcoreDocumentProps {
  src: string
  className?: string
}

export const PimcoreDocument = ({ src, className }: PimcoreDocumentProps): React.JSX.Element => {
  const { styles } = useStyle()
  const [isLoading, setIsLoading] = useState(true)

  const classNameLoading = isLoading ? 'loading-div' : 'display-none'
  const classNameFrame = isLoading ? 'display-none' : ''

  return (
    <div className={ [styles['document-container'], className].join(' ') }>
      <iframe
        className={ classNameFrame }
        onLoad={ () => { setIsLoading(false) } }
        src={ src }
        title={ src }
      />
      <div className={ classNameLoading }>
        <Spin size="small" />
      </div>
    </div>
  )
}
