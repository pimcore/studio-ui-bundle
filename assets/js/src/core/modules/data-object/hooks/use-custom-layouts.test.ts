/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

const mockTrackError = jest.fn()
const mockCustomLayoutsQueryResult: { data: unknown, error: unknown, isLoading: boolean } = {
  data: undefined,
  error: undefined,
  isLoading: false
}

jest.mock('@Pimcore/modules/app/error-handler', () => ({
  __esModule: true,
  default: (...args: unknown[]) => mockTrackError(...args),
  ApiError: class {
    constructor (public payload: unknown) {}
  }
}))

jest.mock('@Pimcore/modules/class-definition/class-definition-slice-enhanced', () => ({
  useClassCustomLayoutEditorCollectionQuery: () => mockCustomLayoutsQueryResult
}))

jest.mock('@Pimcore/modules/data-object/hooks/use-data-object-draft', () => ({
  useDataObjectDraft: () => ({ dataObject: { id: 42, type: 'object' }, isLoading: false })
}))

jest.mock('@Pimcore/modules/element/editor/shared-tab-manager/tabs/workflow/workflow-api-slice-enhanced', () => ({
  useWorkflowGetDetailsQuery: () => ({ data: undefined, isLoading: false })
}))

jest.mock('@Pimcore/modules/element/utils/workflow-availability', () => ({
  isWorkflowAvailable: () => false
}))

// eslint-disable-next-line import/first
import { renderHook } from '@testing-library/react'
// eslint-disable-next-line import/first
import { useCustomLayouts } from './use-custom-layouts'

describe('useCustomLayouts', () => {
  beforeEach(() => {
    mockTrackError.mockClear()
    mockCustomLayoutsQueryResult.data = undefined
    mockCustomLayoutsQueryResult.error = undefined
  })

  it('reports a failed custom layout request once, not on every render', () => {
    mockCustomLayoutsQueryResult.error = { status: 403, data: { message: 'Forbidden' } }

    const { rerender } = renderHook(() => useCustomLayouts(42))
    rerender()
    rerender()

    expect(mockTrackError).toHaveBeenCalledTimes(1)
  })

  it('does not report anything when the request succeeds', () => {
    mockCustomLayoutsQueryResult.data = { items: [{ id: '0', name: 'Main', default: false }] }

    const { result, rerender } = renderHook(() => useCustomLayouts(42))
    rerender()

    expect(mockTrackError).not.toHaveBeenCalled()
    expect(result.current.getDefaultLayoutId()).toBe('0')
  })
})
