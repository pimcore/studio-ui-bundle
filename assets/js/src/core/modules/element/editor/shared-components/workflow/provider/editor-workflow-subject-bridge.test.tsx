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
import { type WorkflowDetails } from '../../../shared-tab-manager/tabs/workflow/workflow-api-slice.gen'
import { getWorkflowActions, type WorkflowActionSubject } from '../types/workflow-types'
import { EditorWorkflowSubjectBridge } from './editor-workflow-subject-bridge'
import { useWorkflowActionSubject } from './workflow-provider'

const mockRefreshElement = jest.fn()
const mockSetCurrentLayout = jest.fn()

jest.mock('@Pimcore/modules/element/hooks/use-element-context', () => ({
  useOptionalElementContext: () => ({ id: 42, elementType: 'data-object' })
}))

jest.mock('@Pimcore/modules/data-object/editor/toolbar/context-menu/provider/use-layout-selection', () => ({
  useLayoutSelection: () => ({ currentLayout: 'current', setCurrentLayout: mockSetCurrentLayout })
}))

jest.mock('@sdk/modules/element', () => ({
  useElementRefresh: () => ({ refreshElement: mockRefreshElement })
}))

const createWorkflow = (objectLayout: unknown): WorkflowDetails => ({
  workflowName: 'product_workflow',
  allowedTransitions: [
    // the backend sends the configured layout id (string|int) or false, despite the generated boolean type
    { name: 'start', label: 'Start', iconCls: '', objectLayout, unsavedChangesBehaviour: 'warn', notes: [] } as any
  ],
  globalActions: []
} as unknown as WorkflowDetails)

const applyTransition = (objectLayout: unknown): jest.Mock => {
  const captured: { subject?: WorkflowActionSubject | null } = {}

  const Probe = (): null => {
    captured.subject = useWorkflowActionSubject()
    return null
  }

  render(
    <EditorWorkflowSubjectBridge>
      <Probe />
    </EditorWorkflowSubjectBridge>
  )

  const [action] = getWorkflowActions(createWorkflow(objectLayout))
  captured.subject!.onApplied!(action)

  return mockSetCurrentLayout
}

describe('EditorWorkflowSubjectBridge', () => {
  beforeEach(() => {
    mockRefreshElement.mockClear()
    mockSetCurrentLayout.mockClear()
  })

  it('switches to the custom layout configured on the applied transition', () => {
    const setCurrentLayout = applyTransition('2')

    expect(setCurrentLayout).toHaveBeenCalledWith('2')
    expect(mockRefreshElement).toHaveBeenCalledWith(42)
  })

  it('accepts a numeric layout id', () => {
    expect(applyTransition(3)).toHaveBeenCalledWith('3')
  })

  it('resets the layout when the transition has no object layout', () => {
    const setCurrentLayout = applyTransition(false)

    expect(setCurrentLayout).toHaveBeenCalledWith(null)
    expect(mockRefreshElement).toHaveBeenCalledWith(42)
  })
})
