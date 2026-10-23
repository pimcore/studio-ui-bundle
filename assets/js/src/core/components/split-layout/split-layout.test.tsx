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
import { fireEvent, render, screen } from '@testing-library/react'
import { mockSplitLayoutGeometry } from '@test-utils/mocks/split-layout-geometry'
import { getPaneSizing, getSplitLayoutParts } from '@test-utils/split-layout-queries'
import { SplitLayout } from './split-layout'
import { SplitLayoutItem } from './components/item/split-layout-item'

jest.mock('@Pimcore/modules/ant-design/styles/create-styles', () => jest.requireActual('@test-utils/mocks/create-styles-mock'))

const left = { size: 25, minSize: 415, children: <p>left</p> }
const right = { size: 75, children: <p>right</p> }

const getPane = (text: string): HTMLElement => screen.getByText(text).parentElement!

const getDivider = (): HTMLElement => screen.getByRole('button').parentElement!

// Pins the SplitLayout behaviour of 2026.x, before it became a PageLayout wrapper.
describe('SplitLayout (deprecated wrapper, parity with 2026.x)', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('renders both items at their sizes without a divider by default', () => {
    const { container } = render(
      <SplitLayout
        leftItem={ left }
        rightItem={ right }
      />
    )

    const layout = container.firstElementChild!
    expect(container.children).toHaveLength(1)
    expect(layout).toHaveClass('split-layout', 'style-splitLayout', 'ant-flex')
    expect(getSplitLayoutParts(layout)).toEqual(['pane: left', 'pane: right'])
    expect(getPane('left')).toHaveClass('style-splitLayoutItem', { exact: true })
    expect(getPaneSizing(getPane('left'))).toEqual(['25%', '415px', 'auto'])
    expect(getPaneSizing(getPane('right'))).toEqual(['75%', 'auto', 'auto'])
  })

  it('renders a resizable divider between the items', () => {
    const { container } = render(
      <SplitLayout
        leftItem={ { minSize: 450, size: 50, children: <p>left</p> } }
        resizeAble
        rightItem={ { minSize: 450, size: 50, children: <p>right</p> } }
        withDivider
      />
    )

    expect(getSplitLayoutParts(container.firstElementChild!)).toEqual(['pane: left', 'divider', 'pane: right'])
    expect(getDivider()).toHaveClass('style-dividerContainer style-resizable', { exact: true })
    expect(screen.getByRole('button')).toHaveClass('style-divider', { exact: true })
    expect(screen.getByRole('button')).toHaveAttribute('tabindex', '0')
    expect(getPaneSizing(getPane('left'))).toEqual(['50%', '450px', 'auto'])
    expect(getPaneSizing(getPane('right'))).toEqual(['50%', '450px', 'auto'])
  })

  it('renders a fixed divider for a toolbar layout and a default size of 50%', () => {
    render(
      <SplitLayout
        leftItem={ { minSize: 180, maxSize: 300, size: 180, children: <p>left</p> } }
        rightItem={ { children: <p>right</p> } }
        withDivider
        withToolbar
      />
    )

    expect(getDivider()).toHaveClass('style-dividerContainer style-withToolbar', { exact: true })
    expect(getPaneSizing(getPane('left'))).toEqual(['180%', '180px', '300px'])
    expect(getPaneSizing(getPane('right'))).toEqual(['50%', 'auto', 'auto'])
  })

  it('shows only the left item at full width, without a divider', () => {
    const { container } = render(
      <SplitLayout
        leftItem={ left }
        leftItemFullWidth
        rightItem={ right }
        withDivider
      />
    )

    expect(getSplitLayoutParts(container.firstElementChild!)).toEqual(['pane: left'])
    expect(getPaneSizing(getPane('left'))).toEqual(['100%', '415px', 'auto'])
  })

  it('shows only the right item at full width, without a divider', () => {
    const { container } = render(
      <SplitLayout
        leftItem={ left }
        rightItem={ right }
        rightItemFullWidth
        withDivider
      />
    )

    expect(getSplitLayoutParts(container.firstElementChild!)).toEqual(['pane: right'])
    expect(getPaneSizing(getPane('right'))).toEqual(['100%', 'auto', 'auto'])
  })

  it('keeps both items and the divider, each at full width, when both flags are set', () => {
    const { container } = render(
      <SplitLayout
        leftItem={ left }
        leftItemFullWidth
        rightItem={ right }
        rightItemFullWidth
        withDivider
      />
    )

    expect(getSplitLayoutParts(container.firstElementChild!)).toEqual(['pane: left', 'divider', 'pane: right'])
    expect(getPaneSizing(getPane('left'))).toEqual(['100%', '415px', 'auto'])
    expect(getPaneSizing(getPane('right'))).toEqual(['100%', 'auto', 'auto'])
  })

  it('keeps the item sizes of the first render but updates the children', () => {
    const { rerender } = render(
      <SplitLayout
        leftItem={ left }
        rightItem={ right }
      />
    )

    rerender(
      <SplitLayout
        leftItem={ { size: 60, minSize: 100, maxSize: 900, children: <p>new left</p> } }
        rightItem={ { ...right, size: 40 } }
      />
    )

    expect(getPaneSizing(getPane('new left'))).toEqual(['25%', '415px', 'auto'])
    expect(getPaneSizing(getPane('right'))).toEqual(['75%', 'auto', 'auto'])
  })

  it('resizes by keyboard in steps of 5px down to the minimum size', () => {
    mockSplitLayoutGeometry(2000)
    render(
      <SplitLayout
        leftItem={ left }
        resizeAble
        rightItem={ right }
        withDivider
      />
    )

    fireEvent.keyDown(screen.getByRole('button'), { key: 'ArrowLeft' })
    expect(parseFloat(getPane('left').style.width)).toBeCloseTo(24.75)
    expect(parseFloat(getPane('right').style.width)).toBeCloseTo(75.25)

    for (let i = 0; i < 20; i++) {
      fireEvent.keyDown(screen.getByRole('button'), { key: 'ArrowLeft' })
    }

    expect(parseFloat(getPane('left').style.width)).toBeCloseTo(20.75)
    expect(parseFloat(getPane('right').style.width)).toBeCloseTo(79.25)
    expect(getPane('left').style.minWidth).toBe('415px')
  })
})

describe('SplitLayoutItem (deprecated, parity with 2026.x)', () => {
  it('renders a pane with the default size of 50% and forwards its ref', () => {
    const ref = React.createRef<HTMLDivElement>()
    const { container } = render(
      <SplitLayoutItem
        maxSize={ 300 }
        ref={ ref }
      >
        <p>pane</p>
      </SplitLayoutItem>
    )

    expect(ref.current).toBe(container.firstChild)
    expect(ref.current).toHaveClass('style-splitLayoutItem', { exact: true })
    expect(getPaneSizing(ref.current!)).toEqual(['50%', 'auto', '300px'])
    expect(ref.current).toHaveTextContent('pane')
  })
})
