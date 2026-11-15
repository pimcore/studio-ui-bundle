/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

/**
 * The expand arrow is one icon that turns. While the children of a first expand are loading,
 * a spinner covers the arrow, which stays mounted and only turns once the spinner is gone.
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
import { TreeExpander } from './tree-expander'
import { type TreeNodeProps } from '../node/tree-node'

jest.mock('../element-tree', () => ({
  TreeContext: jest.requireActual<typeof React>('react').createContext({})
}))

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

// icons resolve through the dependency injection container, which is not set up here
jest.mock('@Pimcore/components/icon/icon', () => ({
  Icon: ({ value, className }: { value: string, className?: string }) => (
    <span
      className={ className }
      data-testid={ `icon-${value}` }
    />
  )
}))

jest.mock('@Pimcore/components/spin/spin', () => ({
  Spin: () => <span data-testid='spinner' />
}))

const node = (isLoading: boolean): TreeNodeProps => ({
  id: '1',
  hasChildren: true,
  isLoading
}) as unknown as TreeNodeProps

const renderExpander = (isLoading: boolean, isExpanded: boolean): ReturnType<typeof render> => render(
  <TreeExpander
    node={ node(isLoading) }
    state={ [isExpanded, jest.fn()] }
  />
)

describe('TreeExpander', () => {
  it('shows a closed arrow for a collapsed node', () => {
    renderExpander(false, false)

    const arrow = screen.getByTestId('icon-chevron-right')
    expect(arrow).not.toHaveClass('tree-expander__arrow--open')
    expect(arrow).not.toHaveClass('tree-expander__arrow--loading')
  })

  it('keeps the arrow mounted but hidden and unturned while the children load', () => {
    renderExpander(true, true)

    const arrow = screen.getByTestId('icon-chevron-right')
    expect(screen.getByTestId('spinner')).toBeInTheDocument()
    expect(arrow).toHaveClass('tree-expander__arrow--loading')
    expect(arrow).not.toHaveClass('tree-expander__arrow--open')
  })

  it('turns the same arrow once the children are loaded', () => {
    const { rerender } = renderExpander(true, true)
    const arrow = screen.getByTestId('icon-chevron-right')

    rerender(
      <TreeExpander
        node={ node(false) }
        state={ [true, jest.fn()] }
      />
    )

    expect(screen.getByTestId('icon-chevron-right')).toBe(arrow)
    expect(arrow).toHaveClass('tree-expander__arrow--open')
    expect(arrow).not.toHaveClass('tree-expander__arrow--loading')
    expect(screen.queryByTestId('spinner')).not.toBeInTheDocument()
  })
})
