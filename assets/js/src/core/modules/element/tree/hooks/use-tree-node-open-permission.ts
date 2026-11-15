/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useTranslation } from 'react-i18next'
import { useMessage } from '@Pimcore/components/message/useMessage'
import { type TreeNode } from '@Pimcore/components/element-tree/element-tree-slice'
import { checkElementPermission } from '@Pimcore/modules/element/permissions/permission-helper'

/**
 * The tree also lists parent folders of the user's workspaces, which the user may not view.
 * Returns whether a tree node can be opened and tells the user when it cannot.
 */
export const useTreeNodeOpenPermission = (): ((node: TreeNode) => boolean) => {
  const { t } = useTranslation()
  const messageApi = useMessage()

  return (node: TreeNode): boolean => {
    if (checkElementPermission(node.permissions, 'view')) {
      return true
    }

    // A fixed key replaces the previous message instead of stacking one per click.
    void messageApi.info({ content: t('element.tree.open-no-permission'), key: 'element-tree-open-no-permission' })

    return false
  }
}
