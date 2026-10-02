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
const mockUpdate = jest.fn()
const mockTrackError = jest.fn()

jest.mock('@Pimcore/app/store', () => ({ store: { dispatch: (action: unknown) => mockDispatch(action) } }))
jest.mock('@Pimcore/app/public-api/helpers/api-helper', () => ({ getPimcoreStudioApi: jest.fn() }))
jest.mock('../data-object-api-slice.gen', () => ({ useDataObjectUpdateByIdMutation: () => [mockUpdate] }))
jest.mock('../actions/save/use-save', () => ({ SaveTaskType: { Publish: 'publish', Unpublish: 'unpublish' } }))
jest.mock('../data-object-draft-slice', () => ({
  publishDraft: (payload: unknown) => ({ type: 'publishDraft', payload }),
  unpublishDraft: (payload: unknown) => ({ type: 'unpublishDraft', payload })
}))
jest.mock('@Pimcore/components/element-tree/element-tree-slice', () => ({
  setNodeLoadingInAllTree: (payload: unknown) => ({ type: 'setNodeLoadingInAllTree', payload }),
  setNodePublished: (payload: unknown) => ({ type: 'setNodePublished', payload })
}))
jest.mock('@Pimcore/modules/app/error-handler', () => ({
  __esModule: true,
  default: (error: unknown) => mockTrackError(error),
  ApiError: jest.fn(),
  GeneralError: jest.fn()
}))

// eslint-disable-next-line import/first
import { renderHook } from '@testing-library/react'
// eslint-disable-next-line import/first
import { SaveTaskType } from '../actions/save/use-save'
// eslint-disable-next-line import/first
import { useDataObjectHelper } from './use-data-object-helper'

const loadingCleared = { type: 'setNodeLoadingInAllTree', payload: { nodeId: '7', elementType: 'data-object', loading: false } }

const execute = async (onFinish: (isSuccessful: boolean) => void): Promise<void> => {
  const { result } = renderHook(() => useDataObjectHelper())
  await result.current.executeDataObjectTask(7, SaveTaskType.Unpublish, onFinish)
}

describe('useDataObjectHelper.executeDataObjectTask', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('reports success and clears the loading state', async () => {
    mockUpdate.mockResolvedValue({ data: null })
    const onFinish = jest.fn()

    await execute(onFinish)

    expect(onFinish).toHaveBeenCalledTimes(1)
    expect(onFinish).toHaveBeenCalledWith(true)
    expect(mockDispatch).toHaveBeenCalledWith(expect.objectContaining({ type: 'unpublishDraft' }))
    expect(mockDispatch).toHaveBeenLastCalledWith(loadingCleared)
  })

  it('reports failure on an API error', async () => {
    mockUpdate.mockResolvedValue({ error: { status: 500 } })
    const onFinish = jest.fn()

    await execute(onFinish)

    expect(onFinish).toHaveBeenCalledTimes(1)
    expect(onFinish).toHaveBeenCalledWith(false)
    expect(mockTrackError).toHaveBeenCalledTimes(1)
    expect(mockDispatch).not.toHaveBeenCalledWith(expect.objectContaining({ type: 'unpublishDraft' }))
    expect(mockDispatch).toHaveBeenLastCalledWith(loadingCleared)
  })

  it('reports failure when the update rejects', async () => {
    mockUpdate.mockRejectedValue(new Error('network'))
    const onFinish = jest.fn()

    await execute(onFinish)

    expect(onFinish).toHaveBeenCalledTimes(1)
    expect(onFinish).toHaveBeenCalledWith(false)
    expect(mockTrackError).toHaveBeenCalledTimes(1)
    expect(mockDispatch).toHaveBeenLastCalledWith(loadingCleared)
  })

  it('does not report a throwing callback as a failed update', async () => {
    mockUpdate.mockResolvedValue({ data: null })
    const onFinish = jest.fn(() => { throw new Error('callback') })

    await expect(execute(onFinish)).rejects.toThrow('callback')

    expect(onFinish).toHaveBeenCalledTimes(1)
    expect(onFinish).toHaveBeenCalledWith(true)
    expect(mockTrackError).not.toHaveBeenCalled()
  })
})
