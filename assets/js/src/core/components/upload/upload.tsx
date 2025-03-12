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

import React from 'react'
import { Upload as AntUpload, type UploadProps } from 'antd'
import { useStyles } from './upload.styles'
import { useUploadContext } from '@Pimcore/modules/element/upload/upload-provider'

export const Upload = (props: UploadProps): React.JSX.Element => {
  const { styles } = useStyles()
  const { fileList, uploadingNode, setUploadContext } = useUploadContext()

  const mergedConfig: UploadProps = {
    action: `/pimcore-studio/api/assets/add/${uploadingNode}`,
    name: 'file',
    multiple: true,
    showUploadList: false,
    fileList,
    onChange: ({ fileList }) => {
      setUploadContext(
        'file',
        fileList
      )
    },
    ...props
  }

  return (
    <AntUpload
      className={ styles.upload }
      { ...mergedConfig }
    >
      {props.children}
    </AntUpload>
  )
}
