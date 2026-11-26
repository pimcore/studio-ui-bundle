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
import { DndUploadZone } from './dnd-upload-zone'

interface DndUploadProps {
  children: React.ReactNode
  nodeId: string
  nodePath: string
}

export const DndUpload = ({ nodeId, nodePath, children }: DndUploadProps): React.JSX.Element => (
  <DndUploadZone
    targetFolderId={ parseInt(nodeId) }
    targetPath={ nodePath }
  >
    {children}
  </DndUploadZone>
)
