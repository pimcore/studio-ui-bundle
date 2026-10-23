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
import { PageLayout } from './page-layout'

jest.mock('@Pimcore/modules/ant-design/styles/create-styles', () => jest.requireActual('@test-utils/mocks/create-styles-mock'))

const getPane = (text: string): HTMLElement => screen.getByText(text).parentElement!

const getWidth = (text: string): number => parseFloat(getPane(text).style.width)

const pressDividerKey = (key: string, times: number): void => {
  for (let i = 0; i < times; i++) {
    fireEvent.keyDown(screen.getByRole('button'), { key })
  }
}

describe('PageLayout', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe('content variant', () => {
    it('renders the top bar, content, toolbar and sidebar slots', () => {
      const { container } = render(
        <PageLayout
          className="custom-layout"
          renderSidebar={ <aside>sidebar</aside> }
          renderToolbar={ <nav>toolbar</nav> }
          renderTopBar={ <header>top bar</header> }
          variant="content"
        >
          <p>content</p>
        </PageLayout>
      )

      const layout = container.firstElementChild!
      expect(layout).toHaveClass('content-toolbar-sidebar-layout', 'content-toolbar-sidebar-layout--with-toolbar', 'custom-layout')
      expect(getPane('top bar')).toHaveClass('content-toolbar-sidebar-layout__top-bar')
      expect(getPane('content')).toHaveClass('content-toolbar-sidebar-layout__content')
      expect(getPane('toolbar')).toHaveClass('content-toolbar-sidebar-layout__toolbar')
      expect(getPane('sidebar')).toHaveClass('content-toolbar-sidebar-layout__sidebar')
    })

    it('omits the slots that are not given', () => {
      const { container } = render(
        <PageLayout variant="content">
          <p>content</p>
        </PageLayout>
      )

      const layout = container.firstElementChild!
      expect(layout.children).toHaveLength(1)
      expect(layout).not.toHaveClass('content-toolbar-sidebar-layout--with-toolbar')
      expect(getPane('content')).toHaveClass('content-toolbar-sidebar-layout__content')
    })
  })

  describe('split variant', () => {
    it('renders both items at their sizes without a divider by default', () => {
      const { container } = render(
        <PageLayout
          leftItem={ { size: 30, minSize: 200, children: <p>left</p> } }
          rightItem={ { size: 70, maxSize: 900, children: <p>right</p> } }
          variant="split"
        />
      )

      expect(container.firstElementChild).toHaveClass('split-layout')
      expect(getPane('left')).toHaveStyle({ width: '30%', minWidth: '200px', maxWidth: 'auto' })
      expect(getPane('right')).toHaveStyle({ width: '70%', minWidth: 'auto', maxWidth: '900px' })
      expect(screen.queryByRole('button')).not.toBeInTheDocument()
    })

    it('renders a divider that does not resize unless resizeAble is set', () => {
      mockSplitLayoutGeometry(1000)
      render(
        <PageLayout
          leftItem={ { children: <p>left</p> } }
          rightItem={ { children: <p>right</p> } }
          variant="split"
          withDivider
        />
      )

      expect(screen.getByRole('button').parentElement).not.toHaveClass('style-resizable')
      pressDividerKey('ArrowLeft', 3)
      expect(getPane('left')).toHaveStyle({ width: '50%' })
    })

    it('resizes by keyboard down to the minimum size of the left item', () => {
      mockSplitLayoutGeometry(1000)
      render(
        <PageLayout
          leftItem={ { size: 30, minSize: 250, children: <p>left</p> } }
          resizeAble
          rightItem={ { size: 70, children: <p>right</p> } }
          variant="split"
          withDivider
        />
      )

      pressDividerKey('ArrowLeft', 2)
      expect(getWidth('left')).toBeCloseTo(29)
      expect(getWidth('right')).toBeCloseTo(71)

      pressDividerKey('ArrowLeft', 20)
      expect(getWidth('left')).toBeCloseTo(25)
      expect(getWidth('right')).toBeCloseTo(75)
    })

    it('resizes by keyboard up to the maximum size of the left item and the minimum size of the right item', () => {
      mockSplitLayoutGeometry(1000)
      const { unmount } = render(
        <PageLayout
          leftItem={ { size: 30, maxSize: 320, children: <p>left</p> } }
          resizeAble
          rightItem={ { size: 70, children: <p>right</p> } }
          variant="split"
          withDivider
        />
      )

      pressDividerKey('ArrowRight', 10)
      expect(getWidth('left')).toBeCloseTo(32)
      unmount()

      render(
        <PageLayout
          leftItem={ { size: 30, children: <p>left</p> } }
          resizeAble
          rightItem={ { size: 70, minSize: 690, children: <p>right</p> } }
          variant="split"
          withDivider
        />
      )

      pressDividerKey('ArrowRight', 10)
      expect(getWidth('left')).toBeCloseTo(31)
      expect(getWidth('right')).toBeCloseTo(69)
    })

    it.each([
      ['left', { leftItemFullWidth: true }, 'left', 'right'],
      ['right', { rightItemFullWidth: true }, 'right', 'left']
    ])('shows only the %s item at full width', (_name, flags, shown, hidden) => {
      render(
        <PageLayout
          leftItem={ { size: 30, children: <p>left</p> } }
          rightItem={ { size: 70, children: <p>right</p> } }
          variant="split"
          withDivider
          { ...flags }
        />
      )

      expect(getPane(shown)).toHaveStyle({ width: '100%' })
      expect(screen.queryByText(hidden)).not.toBeInTheDocument()
      expect(screen.queryByRole('button')).not.toBeInTheDocument()
    })
  })

  describe('config variant', () => {
    it('defaults to a 20/80 split with a 170px minimum, a divider and toolbar alignment', () => {
      render(
        <PageLayout
          leftItem={ { children: <p>tree</p> } }
          rightItem={ { children: <p>form</p> } }
          variant="config"
        />
      )

      expect(getPane('tree')).toHaveStyle({ width: '20%', minWidth: '170px', maxWidth: 'auto' })
      expect(getPane('form')).toHaveStyle({ width: '80%', minWidth: 'auto', maxWidth: 'auto' })
      expect(screen.getByRole('button').parentElement).toHaveClass('style-withToolbar')
      expect(screen.getByRole('button').parentElement).not.toHaveClass('style-resizable')
    })

    it('lets the items and flags override the defaults', () => {
      render(
        <PageLayout
          leftItem={ { size: 25, minSize: 200, maxSize: 600, children: <p>tree</p> } }
          resizeAble
          rightItem={ { size: 75, children: <p>form</p> } }
          variant="config"
          withToolbar={ false }
        />
      )

      expect(getPane('tree')).toHaveStyle({ width: '25%', minWidth: '200px', maxWidth: '600px' })
      expect(getPane('form')).toHaveStyle({ width: '75%' })
      expect(screen.getByRole('button').parentElement).toHaveClass('style-resizable')
      expect(screen.getByRole('button').parentElement).not.toHaveClass('style-withToolbar')
    })

    it('supports the full-width flags', () => {
      render(
        <PageLayout
          leftItem={ { children: <p>tree</p> } }
          rightItem={ { children: <p>form</p> } }
          rightItemFullWidth
          variant="config"
        />
      )

      expect(getPane('form')).toHaveStyle({ width: '100%' })
      expect(screen.queryByText('tree')).not.toBeInTheDocument()
    })
  })
})
