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
import { Upload, type UploadProps } from 'antd'
import { type ElementType } from '@Pimcore/types/enums/element/element-type'
import { useStyles } from '@Pimcore/components/element-tree/dnd-upload/dnd-upload.styles'
import { useUploadContext } from '@Pimcore/modules/element/upload/upload-provider'

interface DndUploadProps {
  nodeId: string
  nodeType: ElementType
  children: React.ReactNode
}

export const DndUpload = ({ nodeId, nodeType, children }: DndUploadProps): React.JSX.Element => {
  const { styles } = useStyles()
  const { Dragger } = Upload
  const { fileList, setUploadContext } = useUploadContext()

  const uploadProps: UploadProps = {
    action: `/pimcore-studio/api/assets/add/${nodeId}`,
    name: 'file',
    multiple: true,
    openFileDialogOnClick: false,
    showUploadList: false,
    fileList,
    onChange: ({ fileList: currentFileList }) => {
      setUploadContext(
        'file',
        currentFileList
      )
    }
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
