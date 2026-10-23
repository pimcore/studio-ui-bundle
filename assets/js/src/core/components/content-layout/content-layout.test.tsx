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
import { ContentLayout } from './content-layout'

jest.mock('@Pimcore/modules/ant-design/styles/create-styles', () => jest.requireActual('@test-utils/mocks/create-styles-mock'))

const SLOT_PREFIX = 'content-toolbar-sidebar-layout__'

// The slot of each child in render order, e.g. ['top-bar', 'content'].
const getSlots = (layout: Element): string[] => Array.from(layout.children).map((child) =>
  Array.from(child.classList).find((className) => className.startsWith(SLOT_PREFIX))?.slice(SLOT_PREFIX.length) ?? child.className
)

const getSlot = (text: string): HTMLElement => screen.getByText(text).parentElement!

// Pins the ContentLayout behaviour of 2026.x, before it became a PageLayout wrapper.
describe('ContentLayout (deprecated wrapper, parity with 2026.x)', () => {
  it('stays a memoized component', () => {
    expect(ContentLayout).toHaveProperty('$$typeof', Symbol.for('react.memo'))
  })

  it('renders all slots in grid order with a custom class name', () => {
    const { container } = render(
      <ContentLayout
        className="custom-layout"
        renderSidebar={ <aside>sidebar</aside> }
        renderToolbar={ <nav>toolbar</nav> }
        renderTopBar={ <header>top bar</header> }
      >
        <p>content</p>
      </ContentLayout>
    )

    const layout = container.firstElementChild!
    expect(container.children).toHaveLength(1)
    expect(layout).toHaveClass(
      'content-toolbar-sidebar-layout style-ContentLayout custom-layout content-toolbar-sidebar-layout--with-toolbar',
      { exact: true }
    )
    expect(getSlots(layout)).toEqual(['top-bar', 'content', 'toolbar', 'sidebar'])
    expect(getSlot('top bar')).toHaveClass('content-toolbar-sidebar-layout__top-bar', { exact: true })
    expect(getSlot('content')).toHaveClass('content-toolbar-sidebar-layout__content', 'relative', 'content')
    expect(getSlot('toolbar')).toHaveClass('content-toolbar-sidebar-layout__toolbar', { exact: true })
    expect(getSlot('sidebar')).toHaveClass('content-toolbar-sidebar-layout__sidebar', { exact: true })
  })

  it('renders only the content when no slot is given', () => {
    const { container } = render(
      <ContentLayout>
        <p>content</p>
      </ContentLayout>
    )

    const layout = container.firstElementChild!
    expect(layout).toHaveClass('content-toolbar-sidebar-layout style-ContentLayout', { exact: true })
    expect(getSlots(layout)).toEqual(['content'])
    expect(getSlot('content').parentElement).toBe(layout)
  })

  it('renders a top bar without a toolbar', () => {
    const { container } = render(
      <ContentLayout renderTopBar={ <header>top bar</header> }>
        <p>content</p>
      </ContentLayout>
    )

    const layout = container.firstElementChild!
    expect(layout).not.toHaveClass('content-toolbar-sidebar-layout--with-toolbar')
    expect(getSlots(layout)).toEqual(['top-bar', 'content'])
  })

  it('renders a toolbar without a top bar', () => {
    const { container } = render(
      <ContentLayout renderToolbar={ <nav>toolbar</nav> }>
        <p>content</p>
      </ContentLayout>
    )

    const layout = container.firstElementChild!
    expect(layout).toHaveClass('content-toolbar-sidebar-layout--with-toolbar')
    expect(getSlots(layout)).toEqual(['content', 'toolbar'])
  })

  it('renders a sidebar after the content', () => {
    const { container } = render(
      <ContentLayout renderSidebar={ <aside>sidebar</aside> }>
        <p>content</p>
      </ContentLayout>
    )

    const layout = container.firstElementChild!
    expect(layout).not.toHaveClass('content-toolbar-sidebar-layout--with-toolbar')
    expect(getSlots(layout)).toEqual(['content', 'sidebar'])
  })

  it('keeps an empty slot wrapper for a slot that is set to null', () => {
    const { container } = render(
      <ContentLayout
        renderToolbar={ null }
        renderTopBar={ null }
      >
        <p>content</p>
      </ContentLayout>
    )

    const layout = container.firstElementChild!
    expect(layout).toHaveClass('content-toolbar-sidebar-layout--with-toolbar')
    expect(getSlots(layout)).toEqual(['top-bar', 'content', 'toolbar'])
    expect(layout.firstElementChild).toBeEmptyDOMElement()
    expect(layout.lastElementChild).toBeEmptyDOMElement()
  })
})
