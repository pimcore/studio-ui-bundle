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
import { WorkflowState } from './workflow-state'

jest.mock('./workflow-state.styles', () => ({
  useStyles: () => ({ styles: new Proxy({}, { get: (_, key) => String(key) }) })
}))
jest.mock('./workflow-state-dot/workflow-state-dot.styles', () => ({
  useStyles: () => ({ styles: new Proxy({}, { get: (_, key) => String(key) }) })
}))
jest.mock('@Pimcore/components/tooltip/tooltip', () => ({
  Tooltip: ({ children }: { children: React.ReactNode }) => <>{children}</>
}))

describe('WorkflowState', () => {
  it('renders the label, the title and the state color', () => {
    render(<WorkflowState
      color="#ff0000"
      label="Review License"
      title="review_license"
           />)

    const state = screen.getByTestId('workflow-state')

    expect(state).toHaveTextContent('Review License')
    expect(state).toHaveAttribute('title', 'review_license')
    expect(state.style.getPropertyValue('--workflow-state-color')).toBe('#ff0000')
    expect(state).not.toHaveClass('inverted')
  })

  it('shows the same dot as the tree, hidden from assistive technology next to the visible label', () => {
    render(<WorkflowState
      color="#ff0000"
      label="Review License"
           />)

    const dot = screen.getByTestId('workflow-state-dot')

    expect(dot).toHaveAttribute('aria-hidden', 'true')
    expect(dot.style.getPropertyValue('--workflow-state-color')).toBe('#ff0000')
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
  })

  it('marks the inverted variant', () => {
    render(<WorkflowState
      color="#ff0000"
      inverted
      label="Review License"
           />)

    expect(screen.getByTestId('workflow-state')).toHaveClass('inverted')
  })
})
