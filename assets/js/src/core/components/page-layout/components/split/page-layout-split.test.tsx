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
import {
  getContainerOf,
  getDivider,
  getPaneSizing,
  getPaneWidth,
  getSplitLayoutParts,
  moveMouse,
  pressDividerKey
} from '@test-utils/page-layout-queries'
import { PageLayout } from '../../page-layout'

jest.mock('@Pimcore/modules/ant-design/styles/create-styles', () => jest.requireActual('@test-utils/mocks/create-styles-mock'))
jest.mock('@Pimcore/components/icon/icon', () => ({ Icon: () => null }))

const left = { size: 25, minSize: 415, children: <p>left</p> }
const right = { size: 75, children: <p>right</p> }

describe('PageLayout split variant', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('renders both items at their sizes without a divider by default', () => {
    const { container } = render(
      <PageLayout
        leftItem={ left }
        rightItem={ right }
        variant="split"
      />
    )

    const layout = container.firstElementChild!
    expect(container.children).toHaveLength(1)
    expect(layout).toHaveClass('split-layout', 'style-splitLayout', 'ant-flex')
    expect(getSplitLayoutParts(layout)).toEqual(['pane: left', 'pane: right'])
    expect(getContainerOf('left')).toHaveClass('style-splitLayoutItem', { exact: true })
    expect(getPaneSizing(getContainerOf('left'))).toEqual(['25%', '415px', 'auto'])
    expect(getPaneSizing(getContainerOf('right'))).toEqual(['75%', 'auto', 'auto'])
  })

  it('adds a custom class name to the layout', () => {
    const { container } = render(
      <PageLayout
        className="custom-split"
        leftItem={ left }
        rightItem={ right }
        variant="split"
      />
    )

    expect(container.firstElementChild).toHaveClass('split-layout', 'style-splitLayout', 'custom-split', 'ant-flex')
  })

  it('renders a resizable divider between the items', () => {
    const { container } = render(
      <PageLayout
        leftItem={ { minSize: 450, size: 50, children: <p>left</p> } }
        resizable
        rightItem={ { minSize: 450, size: 50, children: <p>right</p> } }
        variant="split"
        withDivider
      />
    )

    expect(getSplitLayoutParts(container.firstElementChild!)).toEqual(['pane: left', 'divider', 'pane: right'])
    expect(getDivider()).toHaveClass('style-dividerContainer style-resizable', { exact: true })
    expect(screen.getByRole('button')).toHaveClass('style-divider', { exact: true })
    expect(screen.getByRole('button')).toHaveAttribute('tabindex', '0')
    expect(getPaneSizing(getContainerOf('left'))).toEqual(['50%', '450px', 'auto'])
  })

  it('renders a fixed divider for a toolbar layout and a default size of 50%', () => {
    mockSplitLayoutGeometry(1000)
    render(
      <PageLayout
        leftItem={ { minSize: 180, maxSize: 300, size: 20, children: <p>left</p> } }
        rightItem={ { children: <p>right</p> } }
        variant="split"
        withDivider
        withToolbar
      />
    )

    expect(getDivider()).toHaveClass('style-dividerContainer style-withToolbar', { exact: true })
    expect(getPaneSizing(getContainerOf('left'))).toEqual(['20%', '180px', '300px'])
    expect(getPaneSizing(getContainerOf('right'))).toEqual(['50%', 'auto', 'auto'])

    pressDividerKey('ArrowLeft', 3)
    fireEvent.mouseDown(getDivider())
    moveMouse(-50)
    expect(getPaneSizing(getContainerOf('left'))).toEqual(['20%', '180px', '300px'])
  })

  it.each([
    ['left', 'right', ['100%', '415px', 'auto']],
    ['right', 'left', ['100%', 'auto', 'auto']]
  ] as Array<['left' | 'right', string, string[]]>)('shows only the %s item at full width, without a divider', (shown, hidden, sizing) => {
    const { container } = render(
      <PageLayout
        fullWidth={ shown }
        leftItem={ left }
        rightItem={ right }
        variant="split"
        withDivider
      />
    )

    expect(getSplitLayoutParts(container.firstElementChild!)).toEqual([`pane: ${shown}`])
    expect(getPaneSizing(getContainerOf(shown))).toEqual(sizing)
    expect(screen.queryByText(hidden)).not.toBeInTheDocument()
  })

  it('keeps the item sizes of the first render but updates the children', () => {
    const { rerender } = render(
      <PageLayout
        leftItem={ left }
        rightItem={ right }
        variant="split"
      />
    )

    rerender(
      <PageLayout
        leftItem={ { size: 60, minSize: 100, maxSize: 900, children: <p>new left</p> } }
        rightItem={ { ...right, size: 40 } }
        variant="split"
      />
    )

    expect(getPaneSizing(getContainerOf('new left'))).toEqual(['25%', '415px', 'auto'])
    expect(getPaneSizing(getContainerOf('right'))).toEqual(['75%', 'auto', 'auto'])
  })

  it('keeps the resized sizes while an item is shown at full width, and resizes again afterwards', () => {
    mockSplitLayoutGeometry(2000)
    const renderLayout = (fullWidth?: 'left' | 'right'): React.JSX.Element => (
      <PageLayout
        fullWidth={ fullWidth }
        leftItem={ left }
        resizable
        rightItem={ right }
        variant="split"
        withDivider
      />
    )
    const { container, rerender } = render(renderLayout())

    pressDividerKey('ArrowLeft')
    rerender(renderLayout('right'))
    expect(getSplitLayoutParts(container.firstElementChild!)).toEqual(['pane: right'])
    expect(getContainerOf('right').style.width).toBe('100%')

    rerender(renderLayout())
    expect(getSplitLayoutParts(container.firstElementChild!)).toEqual(['pane: left', 'divider', 'pane: right'])
    expect(getPaneWidth('left')).toBeCloseTo(24.75)

    pressDividerKey('ArrowLeft')
    expect(getPaneWidth('left')).toBeCloseTo(24.5)
    expect(getPaneWidth('right')).toBeCloseTo(75.5)
  })

  it('resizes by mouse only while the divider is held, down to the minimum size of the left item', () => {
    mockSplitLayoutGeometry(2000)
    render(
      <PageLayout
        leftItem={ left }
        resizable
        rightItem={ right }
        variant="split"
        withDivider
      />
    )

    moveMouse(-10)
    expect(getPaneWidth('left')).toBeCloseTo(25)

    fireEvent.mouseDown(getDivider())
    moveMouse(-10)
    expect(getPaneWidth('left')).toBeCloseTo(24.5)
    expect(getPaneWidth('right')).toBeCloseTo(75.5)

    moveMouse(-200)
    expect(getPaneWidth('left')).toBeCloseTo(20.75)

    fireEvent.mouseUp(document)
    moveMouse(100)
    expect(getPaneWidth('left')).toBeCloseTo(20.75)
  })

  it('resizes by keyboard in steps of 5px down to the minimum size of the left item', () => {
    mockSplitLayoutGeometry(2000)
    render(
      <PageLayout
        leftItem={ left }
        resizable
        rightItem={ right }
        variant="split"
        withDivider
      />
    )

    pressDividerKey('ArrowLeft')
    expect(getPaneWidth('left')).toBeCloseTo(24.75)
    expect(getPaneWidth('right')).toBeCloseTo(75.25)

    pressDividerKey('ArrowLeft', 20)
    expect(getPaneWidth('left')).toBeCloseTo(20.75)
    expect(getPaneWidth('right')).toBeCloseTo(79.25)
  })

  it.each([
    ['the maximum size of the left item', 'ArrowRight', { size: 30, maxSize: 320 }, { size: 70 }, 32, 68],
    ['the minimum size of the right item', 'ArrowRight', { size: 30 }, { size: 70, minSize: 690 }, 31, 69],
    ['the maximum size of the right item', 'ArrowLeft', { size: 30 }, { size: 60, maxSize: 650 }, 25, 65]
  ] as Array<[string, 'ArrowLeft' | 'ArrowRight', object, object, number, number]>)('resizes by keyboard up to %s', (_name, key, leftSizing, rightSizing, leftWidth, rightWidth) => {
    mockSplitLayoutGeometry(1000)
    render(
      <PageLayout
        leftItem={ { ...leftSizing, children: <p>left</p> } }
        resizable
        rightItem={ { ...rightSizing, children: <p>right</p> } }
        variant="split"
        withDivider
      />
    )

    pressDividerKey(key, 20)
    expect(getPaneWidth('left')).toBeCloseTo(leftWidth)
    expect(getPaneWidth('right')).toBeCloseTo(rightWidth)
  })
})
