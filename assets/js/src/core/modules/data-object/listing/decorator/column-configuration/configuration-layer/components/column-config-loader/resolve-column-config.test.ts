/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { hasClassificationStoreKey, resolveColumnConfig } from './resolve-column-config'

const csColumn = { type: 'dataobject.classificationstore', config: { fromApi: true } }

describe('resolveColumnConfig', () => {
  it.each([
    ['missing config', {}],
    ['empty object', { config: {} }],
    ['empty array', { config: [] }],
    ['false', { config: false }],
    ['string', { config: 'config' }],
    ['only groupId', { config: { groupId: 1 } }]
  ])('drops a keyless classification store column (%s)', (_label, persisted) => {
    expect(resolveColumnConfig(csColumn, persisted)).toBeUndefined()
  })

  it('keeps the persisted groupId and keyId of a classification store column', () => {
    const config = { groupId: 1, keyId: 2 }
    expect(resolveColumnConfig(csColumn, { config })).toBe(config)
  })

  it('uses the available column config for other column types', () => {
    const config = { some: 'value' }
    expect(resolveColumnConfig({ type: 'input', config }, { config: { other: 1 } })).toBe(config)
  })
})

describe('hasClassificationStoreKey', () => {
  it('requires numeric groupId and keyId', () => {
    expect(hasClassificationStoreKey({ groupId: 1, keyId: 2 })).toBe(true)
    expect(hasClassificationStoreKey({ groupId: 1 })).toBe(false)
    expect(hasClassificationStoreKey(undefined)).toBe(false)
  })
})
