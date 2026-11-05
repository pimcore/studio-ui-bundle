/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

const mockDispatch = jest.fn()
const mockRunJob = jest.fn(async () => {})
let mockJobOptions: { onFinish?: () => Promise<void>, items: Array<{ id: number, parentId: number, index?: number }> } | undefined

jest.mock('@sdk/app', () => ({ useAppDispatch: () => mockDispatch }))
jest.mock('react-i18next', () => ({ useTranslation: () => ({ t: (key: string) => key }) }))
jest.mock('@Pimcore/components/modal/alert-modal/hooks/use-alert-modal', () => ({ useAlertModal: () => ({ warn: jest.fn() }) }))
jest.mock('@Pimcore/modules/execution-engine/hooks/use-execution-engine', () => ({ useExecutionEngine: () => ({ runJob: mockRunJob }) }))
jest.mock('./use-move-element', () => ({ useMoveElement: () => ({ move: jest.fn(async () => {}) }) }))
jest.mock('@Pimcore/modules/execution-engine/jobs/move/element-move-job', () => ({
  ElementMoveJob: jest.fn().mockImplementation((options: typeof mockJobOptions) => {
    mockJobOptions = options
    return {}
  })
}))
jest.mock('@Pimcore/modules/element/element-api-slice-enhanced', () => ({
  api: { util: { invalidateTags: (tags: unknown) => ({ type: 'invalidateTags', payload: tags }) } }
}))
jest.mock('@Pimcore/components/element-tree/element-tree-slice', () => ({
  markNodesDeleting: (payload: unknown) => ({ type: 'markNodesDeleting', payload }),
  refreshSourceNode: (payload: unknown) => ({ type: 'refreshSourceNode', payload }),
  refreshTargetNode: (payload: unknown) => ({ type: 'refreshTargetNode', payload })
}))

// eslint-disable-next-line import/first
import { renderHook } from '@testing-library/react'
// eslint-disable-next-line import/first
import { type ElementType } from '@Pimcore/types/enums/element/element-type'
// eslint-disable-next-line import/first
import { useMoveElements } from './use-move-elements'

const dispatched = (type: string): unknown[] => mockDispatch.mock.calls.map(([action]) => action).filter(action => action.type === type)

const moveAndFinish = async (elementType: ElementType): Promise<void> => {
  const { result } = renderHook(() => useMoveElements(elementType))

  // two elements from folders 10 and 11 into folder 20
  await result.current.moveMultiple({
    currentElements: [{ id: 1, parentId: 10 }, { id: 2, parentId: 11 }],
    targetElement: { id: 20 }
  })

  mockDispatch.mockClear()
  await mockJobOptions!.onFinish!()
}

describe('useMoveElements: once a multi element move job is done', () => {
  beforeEach(() => {
    mockDispatch.mockClear()
    mockJobOptions = undefined
  })

  it('refreshes the source folders and the target in the tree', async () => {
    await moveAndFinish('data-object')

    expect(dispatched('refreshSourceNode')).toEqual([
      { type: 'refreshSourceNode', payload: { nodeId: '10', elementType: 'data-object' } },
      { type: 'refreshSourceNode', payload: { nodeId: '11', elementType: 'data-object' } }
    ])
    expect(dispatched('refreshTargetNode')).toEqual([
      { type: 'refreshTargetNode', payload: { nodeId: '20', elementType: 'data-object' } }
    ])
  })

  it('reloads open data object listings', async () => {
    await moveAndFinish('data-object')

    expect(dispatched('invalidateTags')).toEqual([{ type: 'invalidateTags', payload: ['DATA_OBJECT_GRID'] }])
  })

  it('reloads the asset listings of the source folders and the target', async () => {
    await moveAndFinish('asset')

    expect(dispatched('invalidateTags')).toEqual([{
      type: 'invalidateTags',
      payload: [
        { type: 'ASSET_GRID', id: 10 },
        { type: 'ASSET_GRID', id: 11 },
        { type: 'ASSET_GRID', id: 20 }
      ]
    }])
  })

  it('has no listing to reload for documents', async () => {
    await moveAndFinish('document')

    expect(dispatched('invalidateTags')).toEqual([])
  })

  it('does the same after a multi element sort', async () => {
    const { result } = renderHook(() => useMoveElements('data-object'))

    await result.current.sortMultiple({
      currentElements: [{ id: 1, parentId: 20, index: 0 }, { id: 2, parentId: 20, index: 0 }],
      targetElement: { id: 20 }
    })
    mockDispatch.mockClear()
    await mockJobOptions!.onFinish!()

    expect(dispatched('refreshTargetNode')).toHaveLength(1)
    expect(dispatched('invalidateTags')).toEqual([{ type: 'invalidateTags', payload: ['DATA_OBJECT_GRID'] }])
  })
})
