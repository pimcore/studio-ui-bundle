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
import ContextMenuWrapper from '@Pimcore/components/context-menu-wrapper/context-menu-wrapper'
import { AssetTreeContextMenu } from '../context-menu/context-menu'
import { isUndefined } from 'lodash'

export const withContextMenu = (Component: typeof TreeNode): typeof TreeNode => {
  const ContextMenuNodeContent = (props: ComponentProps<typeof TreeNode> & { ref?: Ref<HTMLDivElement> }, ref: Ref<HTMLDivElement>): ReactElement => {
    const { ref: propsRef, ...treeNodeProps } = props

    return (

      <Component
        { ...props }
        ref={ ref }
        wrapNode={ (children) => (
          <ContextMenuWrapper renderMenu={ () => (
            <AssetTreeContextMenu node={ treeNodeProps } />
          ) }
          >
            {!isUndefined(props.wrapNode) ? props.wrapNode(children) : children}

          </ContextMenuWrapper>
        ) }
      />
    )
  }

  return forwardRef(ContextMenuNodeContent)
}
