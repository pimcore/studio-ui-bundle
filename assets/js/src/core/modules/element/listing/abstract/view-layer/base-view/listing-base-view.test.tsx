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
import { ListingBaseView } from './listing-base-view'

jest.mock('../../data-layer/provider/data/use-data', () => ({
  useData: () => ({ dataQueryResult: {} })
}))
jest.mock('../components/grid/grid-container', () => ({ GridContainer: () => <div data-testid="grid" /> }))
jest.mock('../components/sidebar/sidebar', () => ({ Sidebar: () => <div data-testid="sidebar" /> }))
jest.mock('@Pimcore/components/content/content', () => ({ Content: () => null }))
jest.mock('@Pimcore/components/content-layout/content-layout', () => ({
  ContentLayout: (props: any) => <div data-testid="layout">{props.renderSidebar}{props.children}</div>
}))

describe('ListingBaseView', () => {
  it('AC4: renders the grid unchanged without wrapGrid', () => {
    render(<ListingBaseView />)
    expect(screen.getByTestId('layout')).toContainElement(screen.getByTestId('grid'))
    expect(screen.queryByTestId('wrapper')).not.toBeInTheDocument()
  })

  it('AC4: renders the grid inside wrapGrid when it is passed', () => {
    render(<ListingBaseView wrapGrid={ (grid) => <div data-testid="wrapper">{grid}</div> } />)
    expect(screen.getByTestId('wrapper')).toContainElement(screen.getByTestId('grid'))
  })
})
