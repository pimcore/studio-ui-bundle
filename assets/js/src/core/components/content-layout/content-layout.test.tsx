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
import { ContentLayout } from './content-layout'

jest.mock('@Pimcore/modules/ant-design/styles/create-styles', () => jest.requireActual('@test-utils/mocks/create-styles-mock'))

describe('ContentLayout (deprecated wrapper)', () => {
  it('stays a memoized component', () => {
    expect(ContentLayout).toHaveProperty('$$typeof', Symbol.for('react.memo'))
  })

  it('renders the content variant of PageLayout with the slots and class name', () => {
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
    expect(layout).toHaveClass(
      'content-toolbar-sidebar-layout style-ContentLayout custom-layout content-toolbar-sidebar-layout--with-toolbar',
      { exact: true }
    )
    expect(getContentLayoutSlots(layout)).toEqual(['top-bar', 'content', 'toolbar', 'sidebar'])
    expect(getContainerOf('content')).toHaveClass('content-toolbar-sidebar-layout__content')
  })
})
