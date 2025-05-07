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

import React, { type ReactElement, type Ref, type ComponentProps, forwardRef } from 'react'
import { type TreeNode } from '@Pimcore/components/element-tree/node/tree-node'
import { DndUpload } from '@Pimcore/components/element-tree/dnd-upload/dnd-upload'

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
