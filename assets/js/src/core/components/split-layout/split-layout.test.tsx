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
import { render, screen } from '@testing-library/react'
import { mockSplitLayoutGeometry } from '@test-utils/mocks/split-layout-geometry'
import {
  getContainerOf,
  getDivider,
  getPaneSizing,
  getPaneWidth,
  getSplitLayoutParts,
  pressDividerKey
} from '@test-utils/page-layout-queries'
import { SplitLayout } from './split-layout'
import { SplitLayoutItem } from './components/item/split-layout-item'

jest.mock('@Pimcore/modules/ant-design/styles/create-styles', () => jest.requireActual('@test-utils/mocks/create-styles-mock'))

const left = { size: 25, minSize: 415, children: <p>left</p> }
const right = { size: 75, children: <p>right</p> }

describe('SplitLayout (deprecated wrapper)', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('renders the split variant of PageLayout with the items, divider and toolbar', () => {
    const { container } = render(
      <SplitLayout
        leftItem={ left }
        rightItem={ right }
        withDivider
        withToolbar
      />
    )

    const layout = container.firstElementChild!
    expect(layout).toHaveClass('split-layout', 'style-splitLayout', 'ant-flex')
    expect(getSplitLayoutParts(layout)).toEqual(['pane: left', 'divider', 'pane: right'])
    expect(getPaneSizing(getContainerOf('left'))).toEqual(['25%', '415px', 'auto'])
    expect(getPaneSizing(getContainerOf('right'))).toEqual(['75%', 'auto', 'auto'])
    expect(getDivider()).toHaveClass('style-dividerContainer style-withToolbar', { exact: true })
  })

  it('resizes by keyboard when resizeAble is set', () => {
    mockSplitLayoutGeometry(2000)
    render(
      <SplitLayout
        leftItem={ left }
        resizeAble
        rightItem={ right }
        withDivider
      />
    )

    expect(getDivider()).toHaveClass('style-dividerContainer style-resizable', { exact: true })
    pressDividerKey('ArrowLeft')
    expect(getPaneWidth('left')).toBeCloseTo(24.75)
  })

  it.each([
    ['left', { leftItemFullWidth: true }, 'right'],
    ['right', { rightItemFullWidth: true }, 'left']
  ])('shows only the %s item at full width for its full-width flag', (shown, flag, hidden) => {
    const { container } = render(
      <SplitLayout
        leftItem={ left }
        rightItem={ right }
        withDivider
        { ...flag }
      />
    )

    expect(getSplitLayoutParts(container.firstElementChild!)).toEqual([`pane: ${shown}`])
    expect(getContainerOf(shown).style.width).toBe('100%')
    expect(screen.queryByText(hidden)).not.toBeInTheDocument()
  })

  it('shows both items at their own sizes when both full-width flags are set', () => {
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
    expect(getPaneSizing(getContainerOf('left'))).toEqual(['25%', '415px', 'auto'])
    expect(getPaneSizing(getContainerOf('right'))).toEqual(['75%', 'auto', 'auto'])
  })
})

describe('SplitLayoutItem (deprecated)', () => {
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
