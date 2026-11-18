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
import { fireEvent, render, screen } from '@testing-library/react'
import { type WorkflowDetails } from '../../../../../shared-tab-manager/tabs/workflow/workflow-api-slice.gen'
import { type WorkflowAction } from '../../../types/workflow-types'
import { useWorkflowAction } from '../../../hooks/use-workflow-action'
import { DropdownButton } from './dropdown-button'

// Factories, so the real components — and the antd ESM they pull in — are never loaded.
jest.mock('@Pimcore/components/dropdown/dropdown', () => ({
  Dropdown: ({ menu, children }: { menu: { items: Array<{ key: string, label: string, onClick: () => void }> }, children: React.ReactNode }) => (
    <div>
      {menu.items.map((item) => (
        <button
          key={ item.key }
          onClick={ item.onClick }
        >{item.label}</button>
      ))}
      {children}
    </div>
  )
}))
jest.mock('@Pimcore/components/button/button', () => ({
  Button: ({ children }: { children?: React.ReactNode }) => <span>{children}</span>
}))
jest.mock('../../../hooks/use-workflow-action', () => ({ useWorkflowAction: jest.fn() }))
jest.mock('react-i18next', () => ({ useTranslation: () => ({ t: (key: string) => key }) }))

const workflow = (transitions: string[]): WorkflowDetails => ({
  workflowName: 'wf',
  allowedTransitions: transitions.map((name) => ({ name, label: name, iconCls: '', unsavedChangesBehaviour: 'warn', notes: [] })),
  globalActions: []
} as unknown as WorkflowDetails)

const mockTrigger = (): jest.Mock<undefined, [WorkflowAction]> => {
  const triggerAction = jest.fn<undefined, [WorkflowAction]>()
  ;(useWorkflowAction as jest.Mock).mockReturnValue({ triggerAction, submissionLoading: false })
  return triggerAction
}

describe('DropdownButton', () => {
  it('runs the triggerAction of the current render, not the one from mount', () => {
    const initialTrigger = mockTrigger()
    const { rerender } = render(<DropdownButton workflow={ workflow(['start']) } />)

    // the element changed: the workflow hooks hand out a new triggerAction (with a new guard)
    const currentTrigger = mockTrigger()
    rerender(<DropdownButton workflow={ workflow(['start']) } />)

    fireEvent.click(screen.getByText('start'))

    expect(currentTrigger).toHaveBeenCalledWith(expect.objectContaining({ transitionId: 'start' }))
    expect(initialTrigger).not.toHaveBeenCalled()
  })

  it('offers the transitions of the current workflow details', () => {
    mockTrigger()
    const { rerender } = render(<DropdownButton workflow={ workflow(['start']) } />)

    rerender(<DropdownButton workflow={ workflow(['finish']) } />)

    expect(screen.queryByText('start')).toBeNull()
    expect(screen.getByText('finish')).toBeTruthy()
  })
})
