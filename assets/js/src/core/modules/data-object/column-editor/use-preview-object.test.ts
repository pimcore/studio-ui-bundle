/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

const gridQueryMock = jest.fn((_arg?: unknown): { currentData?: { items: Array<{ id: number }> } } => ({}))
let onFinish: ((event: { items: Array<{ data: { id: number } }> }) => void) | undefined

jest.mock('@Pimcore/modules/data-object/data-object-api-slice-enhanced', () => ({
  api: { endpoints: { dataObjectGetGrid: { useQuery: (arg?: unknown) => gridQueryMock(arg) } } }
}))

jest.mock('@Pimcore/modules/element/element-selector/provider/element-selector/use-element-selector', () => ({
  useElementSelector: (config: { onFinish: typeof onFinish }) => {
    onFinish = config.onFinish

    return { open: jest.fn() }
  }
}))

jest.mock('@Pimcore/modules/element/element-selector/provider/element-selector/element-selector-provider', () => ({
  SelectionType: { Single: 'single' }
}))

// eslint-disable-next-line import/first
import { act, renderHook } from '@testing-library/react'
// eslint-disable-next-line import/first
import { usePreviewObject } from './use-preview-object'

describe('usePreviewObject', () => {
  it('drops a manual selection and the previous object when the class changes', () => {
    gridQueryMock.mockImplementation(() => ({ currentData: { items: [{ id: 12 }] } }))
    const { result, rerender } = renderHook(
      (props: { classId: string }) => usePreviewObject(props.classId, props.classId),
      { initialProps: { classId: 'CAR' } }
    )
    expect(result.current.objectId).toBe(12)

    act(() => { onFinish?.({ items: [{ data: { id: 99 } }] }) })
    expect(result.current.objectId).toBe(99)

    // The new class is still loading: no object of the previous class may be kept.
    gridQueryMock.mockImplementation(() => ({ currentData: undefined }))
    rerender({ classId: 'AP' })
    expect(result.current.objectId).toBeNull()

    gridQueryMock.mockImplementation(() => ({ currentData: { items: [{ id: 373 }] } }))
    rerender({ classId: 'AP' })
    expect(result.current.objectId).toBe(373)
  })
})
