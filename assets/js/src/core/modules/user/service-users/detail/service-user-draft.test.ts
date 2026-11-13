/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */


import { toDraft, toStringList } from './service-user-draft'

describe('toStringList', () => {
  it('keeps a list of names as it is, dropping empty entries', () => {
    expect(toStringList(['default', '', 'layout-b'])).toEqual(['default', 'layout-b'])
  })

  it('splits the comma-separated classic spelling instead of spreading it into characters', () => {
    expect(toStringList('de, en,')).toEqual(['de', 'en'])
  })

  it('reads null, undefined and other scalars as an empty list', () => {
    expect(toStringList(null)).toEqual([])
    expect(toStringList(undefined)).toEqual([])
    expect(toStringList(42)).toEqual([])
  })

  it('drops non-string entries of a list', () => {
    expect(toStringList(['de', 7, null])).toEqual(['de'])
  })
})

describe('toDraft', () => {
  const base = {
    id: 1,
    name: 'svc',
    email: null,
    active: true,
    permissions: [],
    roles: [],
    classes: [],
    docTypes: [],
    assetWorkspaces: [],
    dataObjectWorkspaces: [],
    documentWorkspaces: [],
    clientId: null,
    lastLogin: null,
    clientCredentialsEnabled: false,
    mcpTokens: { active: 0, latestExpiresAt: null }
  }

  it('carries the responsible users and roles', () => {
    const draft = toDraft({ ...base, responsibleUsers: [3], responsibleRoles: [9] })

    expect(draft.responsibleUsers).toEqual([3])
    expect(draft.responsibleRoles).toEqual([9])
  })

  it('orders the responsibles by id like core returns them', () => {
    const draft = toDraft({ ...base, responsibleUsers: [5, 3], responsibleRoles: [9, 2] })

    expect(draft.responsibleUsers).toEqual([3, 5])
    expect(draft.responsibleRoles).toEqual([2, 9])
  })

  it('reads absent responsibles as empty lists', () => {
    const draft = toDraft(base as unknown as Parameters<typeof toDraft>[0])

    expect(draft.responsibleUsers).toEqual([])
    expect(draft.responsibleRoles).toEqual([])
  })
})
