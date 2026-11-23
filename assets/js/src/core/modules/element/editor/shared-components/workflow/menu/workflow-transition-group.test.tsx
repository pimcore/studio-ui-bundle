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
import { type WorkflowDetails } from '../../../shared-tab-manager/tabs/workflow/workflow-api-slice.gen'
import { WorkflowTransitionGroup } from './workflow-transition-group'

jest.mock('@Pimcore/components/button/button', () => ({
  Button: ({ icon, children }: { icon?: React.ReactNode, children?: React.ReactNode }) => <button>{icon}{children}</button>
}))
jest.mock('@Pimcore/components/workflow-state/workflow-state-dot/workflow-state-dot', () => ({
  WorkflowStateDot: ({ color }: { color: string }) => (
    <span
      data-color={ color }
      data-testid="workflow-state-dot"
    />
  )
}))
jest.mock('./workflow-transition-group.styles', () => ({ useStyles: () => ({ styles: {} }) }))
jest.mock('../hooks/use-workflow-action', () => ({
  useWorkflowAction: () => ({ triggerAction: jest.fn(), submissionLoading: false })
}))
jest.mock('react-i18next', () => ({ useTranslation: () => ({ t: (key: string) => key }) }))

const status = (title: string, color: string): object => ({
  color, colorInverted: false, title, label: title, layoutId: null, visibleInDetail: true
})

const workflow = (workflowStatus: object[]): WorkflowDetails => ({
  workflowName: 'enrichment',
  workflowStatus,
  allowedTransitions: [
    { name: 'mark_text_done', label: 'Mark Text Done', iconCls: '', objectLayout: false, unsavedChangesBehaviour: 'warn', notes: [] }
  ],
  globalActions: [
    { name: 'log_time', label: 'Log Time', iconCls: '', objectLayout: false, unsavedChangesBehaviour: 'warn', notes: [] }
  ]
} as unknown as WorkflowDetails)

describe('WorkflowTransitionGroup', () => {
  it('marks every action with the colour of the current state, the first one when there are several', () => {
    render(<WorkflowTransitionGroup workflow={ workflow([status('edit_text', '#ffa500'), status('done_images', '#008000')]) } />)

    const buttons = screen.getAllByRole('button')
    expect(buttons.map((button) => button.textContent)).toEqual(['Mark Text Done', 'Log Time'])
    expect(screen.getAllByTestId('workflow-state-dot').map((dot) => dot.getAttribute('data-color')))
      .toEqual(['#ffa500', '#ffa500'])
  })

  it('shows the actions without a dot when the element has no current state', () => {
    render(<WorkflowTransitionGroup workflow={ workflow([]) } />)

    expect(screen.getAllByRole('button')).toHaveLength(2)
    expect(screen.queryByTestId('workflow-state-dot')).not.toBeInTheDocument()
  })
})
