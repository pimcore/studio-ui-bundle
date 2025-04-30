/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
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
