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
import { render, screen, within } from '@testing-library/react'
import { useWorkflow } from '../hooks/use-workflow'
import { useSyncTreeWorkflowStates } from '../hooks/use-sync-tree-workflow-states'
import { EditorToolbarWorkflowMenu } from './workflow-menu'

// Factories, so the real components — and the antd ESM they pull in — are never loaded.
jest.mock('@Pimcore/components/dropdown/dropdown', () => ({
  Dropdown: ({ menu }: { menu: { items: Array<{ key: string, label: React.ReactNode }> } }) => (
    <div data-testid="dropdown">
      {menu.items.map((item) => <div key={ item.key }>{item.label}</div>)}
    </div>
  )
}))
jest.mock('@Pimcore/components/dropdown-button/dropdown-button', () => ({ DropdownButton: () => null }))
jest.mock('@Pimcore/components/icon/icon', () => ({ Icon: () => null }))
jest.mock('@Pimcore/components/flex/flex', () => ({
  Flex: ({ children }: { children?: React.ReactNode }) => <div>{children}</div>
}))
jest.mock('@Pimcore/components/workflow-state/workflow-state', () => ({
  WorkflowState: ({ label, inverted }: { label: string, inverted?: boolean }) => (
    <span
      data-inverted={ inverted }
      data-testid="workflow-state"
    >{label}</span>
  )
}))
jest.mock('./workflow-transition-group', () => ({ WorkflowTransitionGroup: () => null }))
jest.mock('./workflow-menu.styles', () => ({ useStyles: () => ({ styles: {} }) }))
jest.mock('../hooks/use-workflow', () => ({ useWorkflow: jest.fn() }))
jest.mock('../hooks/use-sync-tree-workflow-states', () => ({ useSyncTreeWorkflowStates: jest.fn() }))
jest.mock('react-i18next', () => ({ useTranslation: () => ({ t: (key: string) => key }) }))

const status = (label: string, visibleInDetail: boolean, colorInverted = false): object => ({
  color: '#ff0000', colorInverted, title: label, label, layoutId: null, visibleInDetail
})

describe('EditorToolbarWorkflowMenu', () => {
  beforeEach(() => {
    (useWorkflow as jest.Mock).mockReturnValue({
      isFetchingWorkflowDetails: false,
      workflowDetailsData: {
        items: [
          { workflowName: 'wf1', workflowLabel: 'Workflow 1', workflowStatus: [status('visible', true, true)] },
          { workflowName: 'wf2', workflowLabel: 'Workflow 2', workflowStatus: [status('hidden', false)] }
        ]
      }
    })
  })

  it('shows the current state of every workflow in the dropdown', () => {
    render(<EditorToolbarWorkflowMenu />)

    const dropdown = within(screen.getByTestId('dropdown'))

    expect(dropdown.getByText('Workflow 1')).toBeInTheDocument()
    expect(dropdown.getByText('visible')).toHaveAttribute('data-inverted', 'true')
    expect(dropdown.getByText('hidden')).toBeInTheDocument()
  })

  it('shows only the states marked as visible next to the dropdown button', () => {
    render(<EditorToolbarWorkflowMenu />)

    expect(screen.getAllByText('visible')).toHaveLength(2)
    expect(screen.getAllByText('hidden')).toHaveLength(1)
  })

  it('hands the visible states to the tree node', () => {
    render(<EditorToolbarWorkflowMenu />)

    expect(useSyncTreeWorkflowStates).toHaveBeenLastCalledWith([expect.objectContaining({ label: 'visible' })])
  })
})
