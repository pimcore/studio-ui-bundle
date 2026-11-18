/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { buildRelationVisibleFieldChunks } from './relation-visible-field-chunks'

const row = (type: string, id: number): any => ({ id, type, subtype: null, fullPath: `/${type}/${id}`, isPublished: true })

describe('buildRelationVisibleFieldChunks', () => {
  it('requests every element type in relation order, a small first page and larger ones after it', () => {
    const value = [row('asset', 1), row('object', 1), row('document', 2), row('asset', 3), row('object', 4)]

    expect(buildRelationVisibleFieldChunks(value, 2, 1)).toEqual([
      [{ type: 'asset', id: 1 }],
      [{ type: 'object', id: 1 }, { type: 'document', id: 2 }],
      [{ type: 'asset', id: 3 }, { type: 'object', id: 4 }]
    ])
  })

  it('requests an element once, also when it is related several times', () => {
    const value = [row('asset', 1), row('data-object', 5), row('asset', 1), row('object', 5)]

    expect(buildRelationVisibleFieldChunks(value, 10)).toEqual([
      [{ type: 'asset', id: 1 }, { type: 'object', id: 5 }]
    ])
  })

  it('requests nothing for an empty relation or rows of unknown types', () => {
    expect(buildRelationVisibleFieldChunks(null, 10)).toEqual([])
    expect(buildRelationVisibleFieldChunks([], 10)).toEqual([])
    expect(buildRelationVisibleFieldChunks([row('', 1)], 10)).toEqual([])
  })
})
