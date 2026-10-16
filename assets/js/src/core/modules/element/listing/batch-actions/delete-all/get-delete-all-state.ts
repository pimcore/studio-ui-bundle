/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { checkElementPermission, type ElementPermissions } from '@Pimcore/modules/element/permissions/permission-helper'

export const ROOT_FOLDER_ID = 1

export interface DeleteAllTarget {
  id: number
  type?: string
  permissions?: ElementPermissions
  isLocked?: boolean
}

export interface DeleteAllState {
  hidden: boolean
  disabled: boolean
}

// "Delete all" deletes the listed folder together with its whole subtree, so it is only offered
// when nothing is selected and the listing belongs to a folder (not e.g. the variants listing of
// an object), and never for the root folder.
export const getDeleteAllState = (target: DeleteAllTarget | undefined, hasSelectedItems: boolean): DeleteAllState => {
  const hidden = hasSelectedItems || target?.type !== 'folder' || target.id === ROOT_FOLDER_ID
  const disabled = !checkElementPermission(target?.permissions, 'delete') || target?.isLocked === true

  return { hidden, disabled }
}
