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
import { render } from '@testing-library/react'
import { getContainerOf, getContentLayoutSlots } from '@test-utils/page-layout-queries'
import { PageLayout } from '../../page-layout'

jest.mock('@Pimcore/modules/ant-design/styles/create-styles', () => jest.requireActual('@test-utils/mocks/create-styles-mock'))

describe('PageLayout content variant', () => {
  it('renders all slots in grid order with a custom class name', () => {
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
    expect(container.children).toHaveLength(1)
    expect(layout).toHaveClass(
      'content-toolbar-sidebar-layout style-ContentLayout custom-layout content-toolbar-sidebar-layout--with-toolbar',
      { exact: true }
    )
    expect(getContentLayoutSlots(layout)).toEqual(['top-bar', 'content', 'toolbar', 'sidebar'])
    expect(getContainerOf('top bar')).toHaveClass('content-toolbar-sidebar-layout__top-bar', { exact: true })
    expect(getContainerOf('content')).toHaveClass('content-toolbar-sidebar-layout__content', 'relative', 'content')
    expect(getContainerOf('toolbar')).toHaveClass('content-toolbar-sidebar-layout__toolbar', { exact: true })
    expect(getContainerOf('sidebar')).toHaveClass('content-toolbar-sidebar-layout__sidebar', { exact: true })
  })

  it('renders only the content when no slot is given', () => {
    const { container } = render(
      <PageLayout variant="content">
        <p>content</p>
      </PageLayout>
    )

    const layout = container.firstElementChild!
    expect(layout).toHaveClass('content-toolbar-sidebar-layout style-ContentLayout', { exact: true })
    expect(getContentLayoutSlots(layout)).toEqual(['content'])
    expect(getContainerOf('content').parentElement).toBe(layout)
  })

  it.each([
    ['a top bar', { renderTopBar: <header>top bar</header> }, ['top-bar', 'content'], false],
    ['a toolbar', { renderToolbar: <nav>toolbar</nav> }, ['content', 'toolbar'], true],
    ['a sidebar', { renderSidebar: <aside>sidebar</aside> }, ['content', 'sidebar'], false]
  ])('renders %s on its own', (_name, slot, expectedSlots, withToolbarClass) => {
    const { container } = render(
      <PageLayout
        variant="content"
        { ...slot }
      >
        <p>content</p>
      </PageLayout>
    )

    const layout = container.firstElementChild!
    expect(getContentLayoutSlots(layout)).toEqual(expectedSlots)
    expect(layout.classList.contains('content-toolbar-sidebar-layout--with-toolbar')).toBe(withToolbarClass)
  })

  it('keeps an empty slot wrapper for a slot that is set to null', () => {
    const { container } = render(
      <PageLayout
        renderToolbar={ null }
        renderTopBar={ null }
        variant="content"
      >
        <p>content</p>
      </PageLayout>
    )

    const layout = container.firstElementChild!
    expect(layout).toHaveClass('content-toolbar-sidebar-layout--with-toolbar')
    expect(getContentLayoutSlots(layout)).toEqual(['top-bar', 'content', 'toolbar'])
    expect(layout.firstElementChild).toBeEmptyDOMElement()
    expect(layout.lastElementChild).toBeEmptyDOMElement()
  })
})
