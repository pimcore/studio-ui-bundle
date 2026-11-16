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
import { WorkflowStateDot } from './workflow-state-dot'

jest.mock('./workflow-state-dot.styles', () => ({
  useStyles: () => ({ styles: new Proxy({}, { get: (_, key) => String(key) }) })
}))
jest.mock('@Pimcore/components/tooltip/tooltip', () => ({
  Tooltip: ({ title, children }: { title: string, children: React.ReactNode }) => <span data-tooltip={ title }>{children}</span>
}))

describe('WorkflowStateDot', () => {
  it('names the state for assistive technology and in the tooltip', () => {
    render(<WorkflowStateDot
      color="#3572b0"
      label="ToDo"
           />)

    const dot = screen.getByRole('img', { name: 'ToDo' })

    expect(dot.style.getPropertyValue('--workflow-state-color')).toBe('#3572b0')
    expect(dot.parentElement).toHaveAttribute('data-tooltip', 'ToDo')
  })
})
