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
import { Menu } from '@Pimcore/components/menu/menu'
import { createContextMenuContainerTestId } from '@Pimcore/utils/test-id-generator'
import { useTreeContextMenuItems } from '@Pimcore/modules/element/tree/context-menu/use-tree-context-menu-items'

export interface DataObjectTreeContextMenuProps {
  node: TreeNodeProps
}

export const DataObjectTreeContextMenu = (props: DataObjectTreeContextMenuProps): React.JSX.Element => {
  const node = props.node ?? defaultProps
  const items = useTreeContextMenuItems('data-object.tree', node)

  return (
    <Menu
      dataTestId={ createContextMenuContainerTestId('data-object', node.id) }
      items={ items }
    />
  )
}
