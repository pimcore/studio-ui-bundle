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

export interface DeleteAllFolder {
  id: number
  type?: string
}

export interface DeleteAllChild {
  id: number
  permissions?: ElementPermissions
  isLocked?: boolean
}

// "Delete all" empties the listed folder (the folder itself stays), so it is only offered when
// nothing is selected and the listing belongs to a folder (not e.g. the variants listing of an
// object). The root folder is excluded, emptying it would wipe every data object at once.
// It is never disabled for an empty folder: the draft's hasChildren is not updated when children
// are added, the children are loaded on click instead.
export const isDeleteAllHidden = (folder: DeleteAllFolder | undefined, hasSelectedItems: boolean): boolean =>
  hasSelectedItems || folder?.type !== 'folder' || folder.id === ROOT_FOLDER_ID

// Same rule as for a batch delete of selected rows: every item must grant delete and must not be locked.
export const canDeleteAllChildren = (children: DeleteAllChild[]): boolean =>
  children.every((child) => checkElementPermission(child.permissions, 'delete') && child.isLocked !== true)
