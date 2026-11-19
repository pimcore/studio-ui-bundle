/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { type ReactElement } from 'react'
import { type TreeContextMenuProps } from '@Pimcore/components/element-tree/element-tree'
import { defaultProps } from '@Pimcore/components/element-tree/node/tree-node'
import { Menu } from '@Pimcore/components/menu/menu'
import { createContextMenuContainerTestId } from '@Pimcore/utils/test-id-generator'
import { useTreeContextMenuItems } from '@Pimcore/modules/element/tree/context-menu/use-tree-context-menu-items'

export const AssetTreeContextMenu = (props: TreeContextMenuProps): ReactElement => {
  const node = props.node ?? defaultProps
  const items = useTreeContextMenuItems('asset.tree', node)

  return (
    <Menu
      dataTestId={ createContextMenuContainerTestId('asset', node.id) }
      items={ items }
    />
  )
}
