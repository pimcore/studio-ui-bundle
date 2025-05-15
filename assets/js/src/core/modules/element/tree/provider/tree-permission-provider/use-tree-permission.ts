/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useContext } from 'react'
import { type TreePermission } from '../../../../perspectives/enums/tree-permission'
import { type ITreePermissionContext, TreePermissionContext } from './tree-permission-provider'
import { isNil } from 'lodash'

// used to check if a tree action is allowed in the perspectives tree widget config
export const useTreePermission = (): ITreePermissionContext & { isTreeActionAllowed: (permission: TreePermission) => boolean } => {
  const context = useContext(TreePermissionContext)

  const isTreeActionAllowed = (permission: TreePermission | string): boolean => {
    if (isNil(context)) {
      return true
    }
    return context.permissions[permission] ?? false
  }

  return {
    permissions: context?.permissions ?? {},
    isTreeActionAllowed
  }
}
