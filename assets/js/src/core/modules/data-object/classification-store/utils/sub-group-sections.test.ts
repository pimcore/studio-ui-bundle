/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

/**
 * Sub groups are never reordered on the client: without an order they follow the first item
 * carrying them, with one they follow it, and the items without a sub group always come last.
 */

import { buildSubGroupSections } from './sub-group-sections'

interface Key {
  id: number
  subGroup?: string | null
}

const sectionsOf = (items: Key[], order?: string[]): Array<[string | null, number[]]> =>
  buildSubGroupSections<Key>({ items, getSubGroup: (key) => key.subGroup, order })
    .map((section) => [section.identifier, section.items.map((key) => key.id)])

describe('buildSubGroupSections', () => {
  it('orders the sub groups by their first key and puts the unassigned keys last', () => {
    const sections = sectionsOf([
      { id: 1, subGroup: null },
      { id: 2, subGroup: 'dimensions' },
      { id: 3, subGroup: 'weights' },
      { id: 4, subGroup: 'dimensions' }
    ])

    expect(sections).toEqual([
      ['dimensions', [2, 4]],
      ['weights', [3]],
      [null, [1]]
    ])
  })

  it('follows a given order instead of the first key', () => {
    const sections = sectionsOf([
      { id: 1, subGroup: 'dimensions' },
      { id: 2, subGroup: 'weights' }
    ], ['weights', 'dimensions'])

    expect(sections).toEqual([
      ['weights', [2]],
      ['dimensions', [1]]
    ])
  })

  it('keeps a sub group the given order does not list, after the listed ones', () => {
    const sections = sectionsOf([
      { id: 1, subGroup: 'gone' },
      { id: 2, subGroup: 'weights' },
      { id: 3 }
    ], ['weights'])

    expect(sections).toEqual([
      ['weights', [2]],
      ['gone', [1]],
      [null, [3]]
    ])
  })

  it('leaves out a sub group none of the items carry', () => {
    expect(sectionsOf([{ id: 1, subGroup: 'weights' }], ['dimensions', 'weights'])).toEqual([
      ['weights', [1]]
    ])
  })
})
