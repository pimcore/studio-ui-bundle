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
import { getDeleteAllState, type DeleteAllTarget } from './get-delete-all-state'

const permissions = (canDelete: boolean): ElementPermissions => ({ delete: canDelete }) as unknown as ElementPermissions

const folder = (overrides: Partial<DeleteAllTarget> = {}): DeleteAllTarget => ({
  id: 42,
  type: 'folder',
  permissions: permissions(true),
  isLocked: false,
  ...overrides
})

describe('getDeleteAllState', () => {
  it('offers an enabled action for a deletable folder without selection', () => {
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

  it('is disabled without delete permission', () => {
    expect(getDeleteAllState(folder({ permissions: permissions(false) }), false).disabled).toBe(true)
  })

  it('is disabled for a locked folder', () => {
    expect(getDeleteAllState(folder({ isLocked: true }), false).disabled).toBe(true)
  })
})
