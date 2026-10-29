/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { buildOrderedNodes, resolveNodeIdRange } from './selection-range'

const nodeRefs = {
  '0-0': { node: { id: '10' } },
  '0-1': { node: { id: '11' } },
  '0-2': { node: { id: '12' } },
  '0-3': { node: { id: '13' } }
}

const orderedNodes = buildOrderedNodes(['0-0', '0-1', '0-2', '0-3'], nodeRefs)

describe('buildOrderedNodes', () => {
  it('maps the internal key order to node ids', () => {
    expect(orderedNodes).toEqual([
      { internalKey: '0-0', id: '10' },
      { internalKey: '0-1', id: '11' },
      { internalKey: '0-2', id: '12' },
      { internalKey: '0-3', id: '13' }
    ])
  })

  it('skips keys without a registered node', () => {
    expect(buildOrderedNodes(['0-0', 'gone', '0-2'], nodeRefs)).toEqual([
      { internalKey: '0-0', id: '10' },
      { internalKey: '0-2', id: '12' }
    ])
  })
})

describe('resolveNodeIdRange', () => {
  it('returns every id between anchor and target, both included', () => {
    expect(resolveNodeIdRange(orderedNodes, '11', '13')).toEqual(['11', '12', '13'])
  })

  it('resolves the same range when selecting upwards', () => {
    expect(resolveNodeIdRange(orderedNodes, '13', '11')).toEqual(['11', '12', '13'])
  })

  it('falls back to the target alone without an anchor', () => {
    expect(resolveNodeIdRange(orderedNodes, undefined, '12')).toEqual(['12'])
  })

  it('falls back to the target alone when the anchor is no longer rendered', () => {
    expect(resolveNodeIdRange(orderedNodes, '999', '12')).toEqual(['12'])
  })

  it('returns a single id when anchor and target are the same node', () => {
    expect(resolveNodeIdRange(orderedNodes, '12', '12')).toEqual(['12'])
  })
})
