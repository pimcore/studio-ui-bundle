/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type ElementPermissions } from '@Pimcore/modules/element/permissions/permission-helper'
import { canDeleteAllChildren, isDeleteAllHidden, type DeleteAllChild, type DeleteAllFolder } from './get-delete-all-state'

const permissions = (canDelete: boolean): ElementPermissions => ({ delete: canDelete }) as unknown as ElementPermissions

const folder = (overrides: Partial<DeleteAllFolder> = {}): DeleteAllFolder => ({
  id: 42,
  type: 'folder',
  ...overrides
})

const child = (overrides: Partial<DeleteAllChild> = {}): DeleteAllChild => ({
  id: 100,
  permissions: permissions(true),
  isLocked: false,
  ...overrides
})

describe('isDeleteAllHidden', () => {
  it('offers the action for a folder without selection', () => {
    expect(isDeleteAllHidden(folder(), false)).toBe(false)
  })

  it('offers the action regardless of the stale hasChildren flag of the draft', () => {
    // Adding the first object to an open empty folder does not update its draft
    const staleDraft: DeleteAllFolder & { hasChildren: boolean } = { ...folder(), hasChildren: false }
    expect(isDeleteAllHidden(staleDraft, false)).toBe(false)
  })

  it('is hidden while rows are selected', () => {
    expect(isDeleteAllHidden(folder(), true)).toBe(true)
  })

  it('is hidden when the listing does not belong to a folder', () => {
    expect(isDeleteAllHidden(folder({ type: 'object' }), false)).toBe(true)
  })

  it('is hidden for the root folder', () => {
    expect(isDeleteAllHidden(folder({ id: 1 }), false)).toBe(true)
  })

  it('is hidden while the folder is not loaded yet', () => {
    expect(isDeleteAllHidden(undefined, false)).toBe(true)
  })
})

describe('canDeleteAllChildren', () => {
  it('allows deleting when every child is deletable', () => {
    expect(canDeleteAllChildren([child({ id: 1 }), child({ id: 2 })])).toBe(true)
  })

  it('refuses when one child lacks the delete permission', () => {
    expect(canDeleteAllChildren([child({ id: 1 }), child({ id: 2, permissions: permissions(false) })])).toBe(false)
  })

  it('refuses when one child is locked', () => {
    expect(canDeleteAllChildren([child({ id: 1 }), child({ id: 2, isLocked: true })])).toBe(false)
  })

  it('refuses when the permissions of a child are unknown', () => {
    expect(canDeleteAllChildren([child({ permissions: undefined })])).toBe(false)
  })
})
