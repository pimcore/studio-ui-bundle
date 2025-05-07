/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type TreeNodeWrapperProps } from '@Pimcore/components/element-tree/node/tree-node'
import { ModalUploadDragger } from '@Pimcore/components/modal-upload/components/modal-upload-dragger/modal-upload-dragger'
import { useRefreshTree } from '@Pimcore/modules/element/actions/refresh-tree/use-refresh-tree'
import React from 'react'

interface DndUploadProps extends TreeNodeWrapperProps {
  children: React.ReactNode
}

export const DndUpload = ({ nodeId, children }: DndUploadProps): React.JSX.Element => {
  const { refreshTree } = useRefreshTree('asset')
  return (
    <ModalUploadDragger
      onSuccess={ async (result) => {
        console.log(result)
        refreshTree(parseInt(nodeId))
      } }
      skipAssetFetch
      targetFolderId={ parseInt(nodeId) }
    >
      {children}
    </ModalUploadDragger>
  )
}
