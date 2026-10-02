/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { render, waitFor } from '@testing-library/react'
import { useScrollToLastAdded } from './use-scroll-to-last-added'

interface Item {
  id: string
  label: string
}

/** Minimal stand-in for a `StackList`-rendered list: one `.stack-list__item` row per item. */
function Harness ({ items }: { items: Item[] }): React.JSX.Element {
  const containerRef = useScrollToLastAdded<Item>({ items, getItemId: (item) => item.id })

  return (
    <div ref={ containerRef }>
      { items.map((item) => (
        <div
          className='stack-list__item'
          data-testid={ `row-${item.id}` }
          key={ item.id }
        >
          { item.label }
        </div>
      )) }
    </div>
  )
}

/** Gives any (incorrectly) scheduled scroll a chance to fire before a "not called" assertion. */
async function letScrollSettle (): Promise<void> {
  await new Promise((resolve) => { setTimeout(resolve, 100) })
}

describe('useScrollToLastAdded', () => {
  let scrollIntoViewMock: jest.Mock

  beforeEach(() => {
    scrollIntoViewMock = jest.fn()
    Element.prototype.scrollIntoView = scrollIntoViewMock
  })

  it('does not scroll on the initial render', async () => {
    render(
      <Harness items={ [{ id: 'a', label: 'A' }, { id: 'b', label: 'B' }] } />
    )

    await letScrollSettle()

    expect(scrollIntoViewMock).not.toHaveBeenCalled()
  })

  it('scrolls the newly appended row into view', async () => {
    const { rerender } = render(<Harness items={ [{ id: 'a', label: 'A' }] } />)

    rerender(<Harness items={ [{ id: 'a', label: 'A' }, { id: 'b', label: 'B' }] } />)

    await waitFor(() => { expect(scrollIntoViewMock).toHaveBeenCalledTimes(1) })
    expect(scrollIntoViewMock).toHaveBeenCalledWith({ block: 'nearest', behavior: 'smooth' })
    expect(scrollIntoViewMock.mock.instances[0]).toHaveAttribute('data-testid', 'row-b')
  })

  it('scrolls to only the last row when several are appended at once', async () => {
    const { rerender } = render(<Harness items={ [{ id: 'a', label: 'A' }] } />)

    rerender(
      <Harness items={ [{ id: 'a', label: 'A' }, { id: 'b', label: 'B' }, { id: 'c', label: 'C' }] } />
    )

    await waitFor(() => { expect(scrollIntoViewMock).toHaveBeenCalledTimes(1) })
    expect(scrollIntoViewMock.mock.instances[0]).toHaveAttribute('data-testid', 'row-c')
  })

  it('does not scroll when a row is removed', async () => {
    const { rerender } = render(
      <Harness items={ [{ id: 'a', label: 'A' }, { id: 'b', label: 'B' }] } />
    )

    rerender(<Harness items={ [{ id: 'a', label: 'A' }] } />)

    await letScrollSettle()

    expect(scrollIntoViewMock).not.toHaveBeenCalled()
  })

  it('does not scroll when rows are reordered', async () => {
    const { rerender } = render(
      <Harness items={ [{ id: 'a', label: 'A' }, { id: 'b', label: 'B' }] } />
    )

    rerender(<Harness items={ [{ id: 'b', label: 'B' }, { id: 'a', label: 'A' }] } />)

    await letScrollSettle()

    expect(scrollIntoViewMock).not.toHaveBeenCalled()
  })

  it('does not scroll on an in-place edit that keeps the same ids and order', async () => {
    const { rerender } = render(
      <Harness items={ [{ id: 'a', label: 'A' }, { id: 'b', label: 'B' }] } />
    )

    rerender(<Harness items={ [{ id: 'a', label: 'A (edited)' }, { id: 'b', label: 'B' }] } />)

    await letScrollSettle()

    expect(scrollIntoViewMock).not.toHaveBeenCalled()
  })

  it('does not scroll on a wholesale re-seed with entirely different ids', async () => {
    const { rerender } = render(<Harness items={ [{ id: 'a', label: 'A' }] } />)

    // A re-seed (e.g. BaseColumnEditor re-deriving its draft from a new `columns` prop) mints
    // fresh ids rather than extending the previous ones, even when the new list is longer.
    rerender(<Harness items={ [{ id: 'x', label: 'X' }, { id: 'y', label: 'Y' }] } />)

    await letScrollSettle()

    expect(scrollIntoViewMock).not.toHaveBeenCalled()
  })
})
