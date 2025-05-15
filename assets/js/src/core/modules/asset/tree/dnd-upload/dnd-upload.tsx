/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { ModalUploadDragger } from '@Pimcore/components/modal-upload/components/modal-upload-dragger/modal-upload-dragger'
import { useRefreshTree } from '@Pimcore/modules/element/actions/refresh-tree/use-refresh-tree'
import React from 'react'

interface DndUploadProps {
  children: React.ReactNode
  nodeId: string
}

export const DndUpload = ({ nodeId, children }: DndUploadProps): React.JSX.Element => {
  const { refreshTree } = useRefreshTree('asset')
  return (
    <ModalUploadDragger
      onSuccess={ async (result) => {
        refreshTree(parseInt(nodeId))
      } }
      skipAssetFetch
      targetFolderId={ parseInt(nodeId) }
    >
      {children}
    </ModalUploadDragger>
  )
}
