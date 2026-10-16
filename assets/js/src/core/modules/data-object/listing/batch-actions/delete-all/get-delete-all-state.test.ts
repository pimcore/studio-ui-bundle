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
import { canDeleteAllChildren, getDeleteAllState, type DeleteAllChild, type DeleteAllFolder } from './get-delete-all-state'

const permissions = (canDelete: boolean): ElementPermissions => ({ delete: canDelete }) as unknown as ElementPermissions

const folder = (overrides: Partial<DeleteAllFolder> = {}): DeleteAllFolder => ({
  id: 42,
  type: 'folder',
  hasChildren: true,
  ...overrides
})

const child = (overrides: Partial<DeleteAllChild> = {}): DeleteAllChild => ({
  id: 100,
  permissions: permissions(true),
  isLocked: false,
  ...overrides
})

describe('getDeleteAllState', () => {
  it('offers an enabled action for a folder with children and no selection', () => {
    expect(getDeleteAllState(folder(), false)).toEqual({ hidden: false, disabled: false })
  })

  it('is hidden while rows are selected', () => {
    expect(getDeleteAllState(folder(), true).hidden).toBe(true)
  })

  it('is hidden when the listing does not belong to a folder', () => {
    expect(getDeleteAllState(folder({ type: 'object' }), false).hidden).toBe(true)
  })

  it('is hidden for the root folder', () => {
    expect(getDeleteAllState(folder({ id: 1 }), false).hidden).toBe(true)
  })

  it('is hidden while the folder is not loaded yet', () => {
    expect(getDeleteAllState(undefined, false)).toEqual({ hidden: true, disabled: true })
  })

  it('is disabled for an empty folder', () => {
    expect(getDeleteAllState(folder({ hasChildren: false }), false).disabled).toBe(true)
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
