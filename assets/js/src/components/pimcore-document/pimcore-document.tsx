import { Image, type ImageProps, Spin } from 'antd'
import React, { useContext } from 'react'
import { useStyle } from '@Pimcore/components/pimcore-document/pimcore-document.styles'

interface PimcoreDocumentProps {
    src: string
}

export const PimcoreDocument = ({src}: PimcoreDocumentProps): React.JSX.Element => {

  return (
    <iframe src={src}/>
  )
}
