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
import { defaultProps, type TreeNodeProps } from '@Pimcore/components/element-tree/node/tree-node'
import { type IMenuProps, Menu } from '@Pimcore/components/menu/menu'
import { createContextMenuContainerTestId } from '@Pimcore/utils/test-id-generator'
import { useTreeContextMenuItems } from '@Pimcore/modules/element/tree/context-menu/use-tree-context-menu-items'
import { contextMenuConfig } from '@Pimcore/modules/app/context-menu-registry/context-menu-config'

export interface DocumentTreeContextMenuProps {
  node: TreeNodeProps
}

export const DocumentTreeContextMenu = (props: DocumentTreeContextMenuProps): React.JSX.Element => {
  const node = props.node ?? defaultProps


  // Get all context menu items from registry
  const items: IMenuProps['items'] = useTreeContextMenuItems(contextMenuConfig.documentTree.name, node)

  return (
    <Menu
      dataTestId={ createContextMenuContainerTestId('document', node.id) }
      items={ items }
    />
  )
}
