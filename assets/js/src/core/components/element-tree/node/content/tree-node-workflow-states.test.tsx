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
import { type TreeNodeProps } from '../tree-node'
import { TreeNodeWorkflowStates } from './tree-node-workflow-states'

jest.mock('@Pimcore/components/flex/flex', () => ({
  Flex: ({ children }: { children?: React.ReactNode }) => <div>{children}</div>
}))
jest.mock('@Pimcore/components/workflow-state/workflow-state-dot/workflow-state-dot', () => ({
  WorkflowStateDot: ({ label, color }: { label: string, color: string }) => <span data-color={ color }>{label}</span>
}))
jest.mock('./tree-node-content.styles', () => ({ useStyles: () => ({ styles: {} }) }))
jest.mock('react-i18next', () => ({ useTranslation: () => ({ t: (key: string) => `t:${key}` }) }))

const node = (workflowStates?: TreeNodeProps['workflowStates']): TreeNodeProps => ({ id: '7', workflowStates } as unknown as TreeNodeProps)

describe('TreeNodeWorkflowStates', () => {
  it('renders one translated dot per workflow state', () => {
    render(<TreeNodeWorkflowStates node={ node([
      { title: 'edit_text', label: 'Edit Text', color: '#ffa500' },
      { title: 'done_images', label: 'Done Images', color: '#008000' }
    ]) }
           />)

    expect(screen.getByText('t:Edit Text')).toHaveAttribute('data-color', '#ffa500')
    expect(screen.getByText('t:Done Images')).toHaveAttribute('data-color', '#008000')
  })

  it('renders nothing without workflow states', () => {
    const { container } = render(<TreeNodeWorkflowStates node={ node() } />)

    expect(container).toBeEmptyDOMElement()
  })
})
