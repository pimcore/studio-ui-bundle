/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useRef } from 'react'
import { Upload } from 'antd'
import { useStyles } from './modal-upload-dragger.styles'
import useElementVisible from '@Pimcore/utils/hooks/use-element-visible'
import { ModalUpload, type ModalUploadProps } from '../../modal-upload'

export const ModalUploadDragger = (props: ModalUploadProps): React.JSX.Element => {
  const { styles } = useStyles()
  const { Dragger } = Upload
  const ref = useRef<HTMLDivElement>(null)
  const visible = useElementVisible(ref, true)

  return (
    <div ref={ ref }>
      {visible
        ? (
          <ModalUpload
            { ...props }
            openFileDialogOnClick={ false }
            uploadComponent={ Dragger }
            uploadComponentClassName={ styles.dragger }
          />
          )
        : props.children}
    </div>
  )
}
