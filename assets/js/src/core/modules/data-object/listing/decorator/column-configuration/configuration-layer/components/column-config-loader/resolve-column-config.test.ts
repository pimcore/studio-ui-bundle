/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { resolveColumnConfig } from './resolve-column-config'

const csColumn = { type: 'dataobject.classificationstore', config: { fromApi: true } }

describe('resolveColumnConfig', () => {
  it('returns an empty object for a classification store column without persisted config', () => {
    expect(resolveColumnConfig(csColumn, {})).toEqual({})
  })

  it('never returns a boolean for a classification store column', () => {
    expect(resolveColumnConfig(csColumn, { config: false })).toEqual({})
    expect(resolveColumnConfig(csColumn, { config: null })).toEqual({})
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
