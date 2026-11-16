/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { renderHook } from '@testing-library/react'
import { useWorkflowGetDetailsQuery } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/workflow/workflow-api-slice-enhanced'
import { useSyncTreeWorkflowStates } from './use-sync-tree-workflow-states'

const mockDispatch = jest.fn()

jest.mock('@sdk/app', () => ({ useAppDispatch: () => mockDispatch }))
jest.mock('@Pimcore/components/element-tree/element-tree-slice', () => ({
  updateNodeData: (payload: unknown) => ({ type: 'trees/updateNodeData', payload })
}))
jest.mock('@Pimcore/modules/element/hooks/use-element-draft', () => ({
  useElementDraft: () => ({ element: { hasWorkflowAvailable: true, type: 'object' } })
}))
jest.mock('@Pimcore/modules/element/editor/shared-tab-manager/tabs/workflow/workflow-api-slice-enhanced', () => ({
  useWorkflowGetDetailsQuery: jest.fn()
}))

const mockQuery = useWorkflowGetDetailsQuery as jest.Mock

const details = (states: Array<{ title: string, visibleInDetail: boolean }>): object => ({
  items: [{
    workflowName: 'enrichment',
    workflowStatus: states.map(({ title, visibleInDetail }) => ({
      color: '#3572b0', colorInverted: false, title, label: title.toUpperCase(), layoutId: null, visibleInDetail
    }))
  }]
})

describe('useSyncTreeWorkflowStates', () => {
  beforeEach(() => {
    mockDispatch.mockClear()
    mockQuery.mockReset()
  })

  it('does not touch the tree while the workflow details are loading', () => {
    mockQuery.mockReturnValue({ data: undefined })

    renderHook(() => { useSyncTreeWorkflowStates(7, 'data-object', true) })

    expect(mockDispatch).not.toHaveBeenCalled()
  })

  it('writes the visible states to the element\'s tree node once per new data', () => {
    const data = details([{ title: 'todo', visibleInDetail: true }, { title: 'hidden', visibleInDetail: false }])
    mockQuery.mockReturnValue({ data })

    const { rerender } = renderHook(() => { useSyncTreeWorkflowStates(7, 'data-object', true) })
    rerender()

    expect(mockDispatch).toHaveBeenCalledTimes(1)
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'trees/updateNodeData',
      payload: {
        nodeId: '7',
        elementType: 'data-object',
        data: { workflowStates: [{ title: 'todo', label: 'TODO', color: '#3572b0' }] }
      }
    })
  })

  it('writes again when a transition changed the states', () => {
    mockQuery.mockReturnValue({ data: details([{ title: 'todo', visibleInDetail: true }]) })
    const { rerender } = renderHook(() => { useSyncTreeWorkflowStates(7, 'data-object', true) })

    mockQuery.mockReturnValue({ data: details([{ title: 'done', visibleInDetail: true }]) })
    rerender()

    expect(mockDispatch).toHaveBeenCalledTimes(2)
    expect(mockDispatch).toHaveBeenLastCalledWith(expect.objectContaining({
      payload: expect.objectContaining({ data: { workflowStates: [{ title: 'done', label: 'DONE', color: '#3572b0' }] } })
    }))
  })

  it('skips the details query outside an element editor', () => {
    mockQuery.mockReturnValue({ data: undefined })

    renderHook(() => { useSyncTreeWorkflowStates(0, 'asset', false) })

    expect(mockQuery).toHaveBeenCalledWith({ elementType: 'asset', elementId: 0 }, { skip: true })
  })
})
