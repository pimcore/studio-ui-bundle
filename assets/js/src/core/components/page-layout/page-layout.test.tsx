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
import { PageLayout } from './page-layout'

jest.mock('@Pimcore/modules/ant-design/styles/create-styles', () => jest.requireActual('@test-utils/mocks/create-styles-mock'))

const left = { size: 25, minSize: 415, children: <p>left</p> }
const right = { size: 75, children: <p>right</p> }
const tree = <p>tree</p>
const form = <p>form</p>

describe('PageLayout', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe('split variant', () => {
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
      expect(getPaneSizing(getContainerOf('right'))).toEqual(['50%', '450px', 'auto'])
    })

    it('renders a fixed divider for a toolbar layout and a default size of 50%', () => {
      mockSplitLayoutGeometry(1000)
      render(
        <PageLayout
          leftItem={ { minSize: 180, maxSize: 300, size: 180, children: <p>left</p> } }
          rightItem={ { children: <p>right</p> } }
          variant="split"
          withDivider
          withToolbar
        />
      )

      expect(getDivider()).toHaveClass('style-dividerContainer style-withToolbar', { exact: true })
      expect(getPaneSizing(getContainerOf('left'))).toEqual(['180%', '180px', '300px'])
      expect(getPaneSizing(getContainerOf('right'))).toEqual(['50%', 'auto', 'auto'])

      pressDividerKey('ArrowLeft', 3)
      expect(getPaneSizing(getContainerOf('right'))).toEqual(['50%', 'auto', 'auto'])
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

    it('resizes by keyboard up to the maximum size of the left item and the minimum size of the right item', () => {
      mockSplitLayoutGeometry(1000)
      const { unmount } = render(
        <PageLayout
          leftItem={ { size: 30, maxSize: 320, children: <p>left</p> } }
          resizable
          rightItem={ { size: 70, children: <p>right</p> } }
          variant="split"
          withDivider
        />
      )

      pressDividerKey('ArrowRight', 10)
      expect(getPaneWidth('left')).toBeCloseTo(32)
      unmount()

      render(
        <PageLayout
          leftItem={ { size: 30, children: <p>left</p> } }
          resizable
          rightItem={ { size: 70, minSize: 690, children: <p>right</p> } }
          variant="split"
          withDivider
        />
      )

      pressDividerKey('ArrowRight', 10)
      expect(getPaneWidth('left')).toBeCloseTo(31)
      expect(getPaneWidth('right')).toBeCloseTo(69)
    })
  })

  describe('config variant', () => {
    it('defaults to a 20/80 split with a 170px minimum, a fixed divider and toolbar alignment', () => {
      const { container } = render(
        <PageLayout
          leftItem={ { children: tree } }
          rightItem={ { children: form } }
          variant="config"
        />
      )

      expect(getSplitLayoutParts(container.firstElementChild!)).toEqual(['pane: tree', 'divider', 'pane: form'])
      expect(getPaneSizing(getContainerOf('tree'))).toEqual(['20%', '170px', 'auto'])
      expect(getPaneSizing(getContainerOf('form'))).toEqual(['80%', 'auto', 'auto'])
      expect(getDivider()).toHaveClass('style-dividerContainer style-withToolbar', { exact: true })
    })

    it('lets the items and flags override the defaults', () => {
      render(
        <PageLayout
          leftItem={ { size: 25, minSize: 200, maxSize: 600, children: tree } }
          resizable
          rightItem={ { size: 75, children: form } }
          variant="config"
          withToolbar={ false }
        />
      )

      expect(getPaneSizing(getContainerOf('tree'))).toEqual(['25%', '200px', '600px'])
      expect(getPaneSizing(getContainerOf('form'))).toEqual(['75%', 'auto', 'auto'])
      expect(getDivider()).toHaveClass('style-dividerContainer style-resizable', { exact: true })
    })

    it('lets an explicitly undefined size replace the default', () => {
      render(
        <PageLayout
          leftItem={ { size: undefined, children: tree } }
          rightItem={ { children: form } }
          variant="config"
        />
      )

      expect(getPaneSizing(getContainerOf('tree'))).toEqual(['50%', '170px', 'auto'])
    })

    it('renders without a divider when it is switched off', () => {
      const { container } = render(
        <PageLayout
          leftItem={ { children: tree } }
          rightItem={ { children: form } }
          variant="config"
          withDivider={ false }
        />
      )

      expect(getSplitLayoutParts(container.firstElementChild!)).toEqual(['pane: tree', 'pane: form'])
    })

    it('shows only one item at full width', () => {
      render(
        <PageLayout
          fullWidth="right"
          leftItem={ { children: tree } }
          rightItem={ { children: form } }
          variant="config"
        />
      )

      expect(getPaneSizing(getContainerOf('form'))).toEqual(['100%', 'auto', 'auto'])
      expect(screen.queryByText('tree')).not.toBeInTheDocument()
    })
  })
})
