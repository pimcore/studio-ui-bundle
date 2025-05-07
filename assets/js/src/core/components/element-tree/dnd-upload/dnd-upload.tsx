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

import React, { useRef } from 'react'
import { Upload, type UploadProps } from 'antd'
import { type ElementType } from '@Pimcore/types/enums/element/element-type'
import { useStyles } from '@Pimcore/components/element-tree/dnd-upload/dnd-upload.styles'
import useElementVisible from '@Pimcore/utils/hooks/use-element-visible'

interface DndUploadProps {
  nodeId: string
  nodeType: ElementType
  children: React.ReactNode
}

export const DndUpload = ({ nodeId, nodeType, children }: DndUploadProps): React.JSX.Element => {
  const { styles } = useStyles()
  const { Dragger } = Upload
  const ref = useRef<HTMLDivElement>(null)
  const visible = useElementVisible(ref, true)

  const uploadProps: UploadProps = {
    name: 'file',
    multiple: true,
    openFileDialogOnClick: false,
    showUploadList: false,
    beforeUpload: (file) => {
      console.log('beforeUploadDragged', file)
      return false
    },
    onDrop: (e) => {
      console.log('drop it')
      const targetElement = e.target as HTMLElement
      console.log('onDropped!!!', targetElement.closest('.tree-node__content-wrapper'))
    }
  }

  if (nodeType !== 'asset') {
    return <>{children}</>
  }

  return (
    <div ref={ ref }>
      {visible
        ? (
          <Dragger
            className={ styles.dragger }
            { ...uploadProps }
          >
            {children}
          </Dragger>
          )
        : children}
    </div>
  )
}
