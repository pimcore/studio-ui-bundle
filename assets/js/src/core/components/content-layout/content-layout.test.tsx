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
import { ContentLayout } from './content-layout'

jest.mock('@Pimcore/modules/ant-design/styles/create-styles', () => jest.requireActual('@test-utils/mocks/create-styles-mock'))

// The snapshots were taken from the ContentLayout implementation of 2026.x before it became a PageLayout wrapper.
describe('ContentLayout (deprecated wrapper, parity with 2026.x)', () => {
  it('stays a memoized component', () => {
    expect(ContentLayout).toHaveProperty('$$typeof', Symbol.for('react.memo'))
  })

  it('renders all slots with a custom class name', () => {
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

    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders only the content when no slot is given', () => {
    const { container } = render(
      <ContentLayout>
        <p>content</p>
      </ContentLayout>
    )

    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders a top bar without a toolbar', () => {
    const { container } = render(
      <ContentLayout renderTopBar={ <header>top bar</header> }>
        <p>content</p>
      </ContentLayout>
    )

    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders a toolbar without a top bar', () => {
    const { container } = render(
      <ContentLayout renderToolbar={ <nav>toolbar</nav> }>
        <p>content</p>
      </ContentLayout>
    )

    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders a sidebar next to the content', () => {
    const { container } = render(
      <ContentLayout renderSidebar={ <aside>sidebar</aside> }>
        <p>content</p>
      </ContentLayout>
    )

    expect(container.firstChild).toMatchSnapshot()
  })

  it('keeps a slot that is set to null', () => {
    const { container } = render(
      <ContentLayout
        renderToolbar={ null }
        renderTopBar={ null }
      >
        <p>content</p>
      </ContentLayout>
    )

    expect(container.firstChild).toMatchSnapshot()
  })
})
