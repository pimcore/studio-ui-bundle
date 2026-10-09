/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { act, renderHook, waitFor } from '@testing-library/react'
import { useSubmitWorkflow } from './use-submit-workflow'
import { type WorkflowAction } from '../types/workflow-types'
import { useWorkflowActionSubmitMutation } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/workflow/workflow-api-slice-enhanced'
import { useWorkflowActionSubject } from '../provider/workflow-provider'
import { useWorkflowModalState } from './use-workflow-modal-state'
import { useAlertModal } from '@sdk/components'
import { useMessage } from '@Pimcore/components/message/useMessage'

// Factories, so the real modules — and the SDK barrel they pull in — are never loaded.
jest.mock('@Pimcore/modules/element/editor/shared-tab-manager/tabs/workflow/workflow-api-slice-enhanced', () => ({
  useWorkflowActionSubmitMutation: jest.fn()
}))
jest.mock('../provider/workflow-provider', () => ({ useWorkflowActionSubject: jest.fn() }))
jest.mock('./use-workflow-modal-state', () => ({ useWorkflowModalState: jest.fn() }))
jest.mock('@sdk/components', () => ({ useAlertModal: jest.fn() }))
jest.mock('@Pimcore/components/message/useMessage', () => ({ useMessage: jest.fn() }))
jest.mock('i18next', () => ({ t: (key: string) => key }))

const submitMutation = jest.fn()
const closeModal = jest.fn()
const onApplied = jest.fn()

const action: WorkflowAction = { actionType: 'transition', workflowId: 'wf', transitionId: 'ready', label: 'Ready' }

const deferred = <T, >(): { promise: Promise<T>, resolve: (value: T) => void } => {
  let settle!: (value: T) => void
  const promise = new Promise<T>((resolve) => { settle = resolve })

  return { promise, resolve: settle }
}

const setUp = (beforeSubmit?: (action: WorkflowAction) => Promise<boolean>): void => {
  (useWorkflowActionSubject as jest.Mock).mockReturnValue({ elementId: 7, elementType: 'data-object', onApplied, beforeSubmit })
}

beforeEach(() => {
  jest.clearAllMocks();
  (useWorkflowActionSubmitMutation as jest.Mock).mockReturnValue([submitMutation, { isLoading: false, isSuccess: false, isError: false }]);
  (useWorkflowModalState as jest.Mock).mockReturnValue({ closeModal });
  (useAlertModal as jest.Mock).mockReturnValue({ error: jest.fn() });
  (useMessage as jest.Mock).mockReturnValue({ success: jest.fn() })
  submitMutation.mockReturnValue({ unwrap: async () => await Promise.resolve({}) })
})

describe('useSubmitWorkflow', () => {
  it('submits once the guard allows it', async () => {
    setUp(async () => true)
    const { result } = renderHook(() => useSubmitWorkflow())

    act(() => { result.current.submitWorkflowAction(action) })

    await waitFor(() => { expect(onApplied).toHaveBeenCalledWith(action) })
    expect(submitMutation).toHaveBeenCalledTimes(1)
  })

  it('does not submit when the guard cancels', async () => {
    setUp(async () => false)
    const { result } = renderHook(() => useSubmitWorkflow())

    act(() => { result.current.submitWorkflowAction(action) })

    await waitFor(() => { expect(closeModal).toHaveBeenCalled() })
    expect(submitMutation).not.toHaveBeenCalled()
  })

  it('reports loading while the guard is pending and ignores repeated clicks', async () => {
    const guard = deferred<boolean>()
    const beforeSubmit = jest.fn(async () => await guard.promise)
    setUp(beforeSubmit)
    const { result } = renderHook(() => useSubmitWorkflow())

    act(() => { result.current.submitWorkflowAction(action) })
    expect(result.current.submissionLoading).toBe(true)

    act(() => { result.current.submitWorkflowAction(action) })
    expect(beforeSubmit).toHaveBeenCalledTimes(1)

    await act(async () => { guard.resolve(true) })

    await waitFor(() => { expect(result.current.submissionLoading).toBe(false) })
    expect(submitMutation).toHaveBeenCalledTimes(1)
  })
})
