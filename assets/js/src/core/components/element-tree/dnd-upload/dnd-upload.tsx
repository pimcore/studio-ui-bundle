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
import { Upload, type UploadProps } from 'antd'
import { useFileUploader } from '@Pimcore/modules/element/upload/hook/use-file-uploader'
import { type ElementType } from '@Pimcore/types/enums/element/element-type'
import { useStyles } from '@Pimcore/components/element-tree/dnd-upload/dnd-upload.styles'

interface DndUploadProps {
  nodeId: string
  nodeType: ElementType
  children: React.ReactNode
}

export const DndUpload = ({ nodeId, nodeType, children }: DndUploadProps): React.JSX.Element => {
  const { styles } = useStyles()
  const { uploadFile: uploadFileProcessor } = useFileUploader({ nodeId })
  const { Dragger } = Upload

  const uploadProps: UploadProps = {
    action: `/pimcore-studio/api/assets/add-d/${nodeId}`,
    name: 'file',
    multiple: true,
    openFileDialogOnClick: false,
    showUploadList: false,
    onChange: uploadFileProcessor
  }

  if (nodeType !== 'asset') {
    return <>{children}</>
  }

  return (
    <Dragger
      className={ styles.dragger }
      { ...uploadProps }
    >
      {children}
    </Dragger>
  )
}
