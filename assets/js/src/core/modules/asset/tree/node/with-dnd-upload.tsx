/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { type ReactElement, type Ref, type ComponentProps, forwardRef } from 'react'
import { type TreeNode } from '@Pimcore/components/element-tree/node/tree-node'
import { DndUpload } from '../dnd-upload/dnd-upload'

export const withDndUpload = (Component: typeof TreeNode): typeof TreeNode => {
  const DndUploadNodeContent = (props: ComponentProps<typeof TreeNode>, ref: Ref<HTMLDivElement>): ReactElement => {
    return (
      <Component
        { ...props }
        WrapperComponent={ props.type === 'folder' ? DndUpload : undefined }
        ref={ ref }
      />
    )
  }

  return forwardRef(DndUploadNodeContent)
}
