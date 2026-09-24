/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { buildCreatedRelationItem } from './utils'

describe('buildCreatedRelationItem', () => {
  const created = { id: 42, key: 'My Car', className: 'Car', parentPath: '/Products/Cars' }

  it('builds a row the relation grid can render', () => {
    expect(buildCreatedRelationItem(created)).toEqual({
      id: 42,
      type: 'object',
      subtype: 'Car',
      fullPath: '/Products/Cars/My Car',
      isPublished: false
    })
  })

  it('does not double the separator when the parent is the root folder', () => {
    expect(buildCreatedRelationItem({ ...created, parentPath: '/' }).fullPath).toBe('/My Car')
  })

  it('marks the new object as unpublished', () => {
    expect(buildCreatedRelationItem(created).isPublished).toBe(false)
  })

  it('carries the class name as the subtype, matching the element selector rows', () => {
    expect(buildCreatedRelationItem({ ...created, className: 'AccessoryPart' }).subtype).toBe('AccessoryPart')
  })
})
