/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { orderForSorting } from './sort-order'

describe('orderForSorting', () => {
  it('orders by the position the elements already have', () => {
    const ordered = orderForSorting([{ id: 'c', index: 7 }, { id: 'a', index: 2 }, { id: 'b', index: 4 }])

    expect(ordered.map(element => element.id)).toEqual(['a', 'b', 'c'])
  })

  it('keeps the given order for elements without an index', () => {
    const ordered = orderForSorting<{ id: string, index?: number }>([{ id: 'x' }, { id: 'y' }])

    expect(ordered.map(element => element.id)).toEqual(['x', 'y'])
  })

  it('puts elements without an index last', () => {
    const ordered = orderForSorting([{ id: 'x' }, { id: 'a', index: 3 }])

    expect(ordered.map(element => element.id)).toEqual(['a', 'x'])
  })

  it('is stable for duplicate indexes, which the index column allows', () => {
    const ordered = orderForSorting([{ id: 'first', index: 2 }, { id: 'second', index: 2 }])

    expect(ordered.map(element => element.id)).toEqual(['first', 'second'])
  })

  it('does not mutate the input', () => {
    const elements = [{ id: 'b', index: 5 }, { id: 'a', index: 1 }]

    orderForSorting(elements)

    expect(elements.map(element => element.id)).toEqual(['b', 'a'])
  })
})
