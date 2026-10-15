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
import { act, render } from '@testing-library/react'
import { type WorkflowDetails } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/workflow/workflow-api-slice.gen'
import {
  getWorkflowActions,
  type WorkflowActionSubject
} from '@Pimcore/modules/element/editor/shared-components/workflow/types/workflow-types'
import { EditorContainer } from './editor-container'

const mockLayoutState: { defaultLayoutId: string | null } = { defaultLayoutId: null }
const mockRefreshElement = jest.fn()
const captured: { subject?: WorkflowActionSubject | null, currentLayout?: string | null } = {}

jest.mock('@Pimcore/modules/data-object/hooks/use-custom-layouts', () => ({
  useCustomLayouts: () => ({
    layouts: [],
    isLoading: false,
    getDefaultLayoutId: () => mockLayoutState.defaultLayoutId
  })
}))

jest.mock('@Pimcore/components/content/content', () => ({
  Content: () => null
}))

jest.mock('@Pimcore/modules/element/hooks/use-element-context', () => ({
  useOptionalElementContext: () => ({ id: 42, elementType: 'data-object' })
}))

jest.mock('@sdk/modules/element', () => ({
  useElementRefresh: () => ({ refreshElement: mockRefreshElement })
}))

// the real editor content is irrelevant here: render the real workflow bridge and read the real layout selection
jest.mock('@Pimcore/modules/data-object/editor/editor-container/editor-container-inner', () => {
  const { EditorWorkflowSubjectBridge } = jest.requireActual('@Pimcore/modules/element/editor/shared-components/workflow/provider/editor-workflow-subject-bridge')
  const { useWorkflowActionSubject } = jest.requireActual('@Pimcore/modules/element/editor/shared-components/workflow/provider/workflow-provider')
  const { useLayoutSelection } = jest.requireActual('@Pimcore/modules/data-object/editor/toolbar/context-menu/provider/use-layout-selection')

  const Probe = (): null => {
    captured.subject = useWorkflowActionSubject()
    captured.currentLayout = useLayoutSelection().currentLayout
    return null
  }

  return {
    EditorContainerInner: () => (
      <EditorWorkflowSubjectBridge>
        <Probe />
      </EditorWorkflowSubjectBridge>
    )
  }
})

const createWorkflow = (objectLayout: unknown): WorkflowDetails => ({
  workflowName: 'product_workflow',
  allowedTransitions: [
    { name: 'start', label: 'Start', iconCls: '', objectLayout, unsavedChangesBehaviour: 'warn', notes: [] } as any
  ],
  globalActions: []
} as unknown as WorkflowDetails)

const applyTransitionThenRefresh = (objectLayout: unknown, newDefaultLayoutId: string): void => {
  mockLayoutState.defaultLayoutId = '1'
  const { rerender } = render(<EditorContainer id={ 42 } />)
  expect(captured.currentLayout).toBe('1')

  const [action] = getWorkflowActions(createWorkflow(objectLayout))
  act(() => {
    captured.subject!.onApplied!(action)
  })

  // the refresh reloads the workflow details: the derived default layout is now the new place's layout
  mockLayoutState.defaultLayoutId = newDefaultLayoutId
  rerender(<EditorContainer id={ 42 } />)
}

describe('EditorContainer workflow transition layout', () => {
  beforeEach(() => {
    mockRefreshElement.mockClear()
    delete captured.subject
    delete captured.currentLayout
  })

  it('keeps the transition layout when the derived default layout changes after the refresh', () => {
    applyTransitionThenRefresh('2', '5')

    expect(mockRefreshElement).toHaveBeenCalledWith(42)
    expect(captured.currentLayout).toBe('2')
  })

  it('follows the new derived default layout when the transition has no object layout', () => {
    applyTransitionThenRefresh(false, '5')

    expect(mockRefreshElement).toHaveBeenCalledWith(42)
    expect(captured.currentLayout).toBe('5')
  })
})
