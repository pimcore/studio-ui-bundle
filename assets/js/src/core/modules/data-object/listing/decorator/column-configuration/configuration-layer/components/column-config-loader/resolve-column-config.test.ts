/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { filterRequestableColumns, isKeylessClassificationStoreColumn, resolveColumnConfig } from './resolve-column-config'

const CS = 'dataobject.classificationstore'

describe('isKeylessClassificationStoreColumn', () => {
  it.each([
    ['missing config', {}],
    ['empty object', { config: {} }],
    ['empty array', { config: [] }],
    ['false', { config: false }],
    ['string', { config: 'config' }],
    ['only groupId', { config: { groupId: 1 } }]
  ])('is true for a classification store column (%s)', (_label, column) => {
    expect(isKeylessClassificationStoreColumn({ type: CS, ...column })).toBe(true)
  })

  it('is false for a classification store column with groupId and keyId', () => {
    expect(isKeylessClassificationStoreColumn({ type: CS, config: { groupId: 1, keyId: 2 } })).toBe(false)
  })

  it('is false for other column types', () => {
    expect(isKeylessClassificationStoreColumn({ type: 'input' })).toBe(false)
  })
})

describe('resolveColumnConfig', () => {
  it('uses the persisted config for classification store columns', () => {
    const config = { groupId: 1, keyId: 2 }
    expect(resolveColumnConfig({ type: CS, config: { fromApi: true } }, { config })).toBe(config)
  })

  it('uses the available column config for other column types', () => {
    const config = { some: 'value' }
    expect(resolveColumnConfig({ type: 'input', config }, { config: { other: 1 } })).toBe(config)
  })
})

describe('filterRequestableColumns', () => {
  const keyless = { key: 'a', type: CS, config: {} }
  const keyed = { key: 'b', type: CS, config: { groupId: 1, keyId: 2 } }
  const input = { key: 'c', type: 'input', config: false }
  const advanced = { key: 'advanced', type: 'dataobject.advanced', config: undefined }

  it('removes keyless classification store columns and keeps all others', () => {
    expect(filterRequestableColumns([keyless, keyed, input, advanced])).toEqual([keyed, input, advanced])
  })
})
