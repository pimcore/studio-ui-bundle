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

import React, { useEffect } from 'react'
import type { TreeNodeProps } from '@Pimcore/components/tree/node/tree-node'
import {
  AssetTreeContextMenu as ContextMenu
} from '@Pimcore/components/tree/components/context-menu/asset-tree-context-menu'
import { useFileUploader } from '@Pimcore/modules/asset/tree/context-menu/hooks/upload-files'
import { UploadContext } from '@Pimcore/modules/element/upload/upload-provider'

export interface TreeContextMenuProps {
  children: React.ReactNode
  node?: TreeNodeProps
}

export const AssetTreeContextMenu = ({ children, node }: TreeContextMenuProps): React.JSX.Element => {
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const archiveInputRef = React.useRef<HTMLInputElement>(null)
  const uploadContext = React.useContext(UploadContext)!
  const { uploadFiles, uploadArchive } = useFileUploader({ parentId: node?.id ?? undefined })

  useEffect(() => {
    if (node !== undefined) {
      uploadContext.setUploadingNode(node.id)
    }
  }, [node])

  return (
    <ContextMenu
      archiveInputRef={ archiveInputRef }
      fileInputRef={ fileInputRef }
      uploadArchive={ uploadArchive }
      uploadFiles={ uploadFiles }
    >
      {children}
    </ContextMenu>
  )
}
