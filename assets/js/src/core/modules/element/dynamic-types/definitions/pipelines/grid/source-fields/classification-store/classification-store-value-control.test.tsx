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
import { fireEvent, render, renderHook, screen } from '@testing-library/react'
import { ClassificationStoreFieldPickerProvider } from './classification-store-field-picker-provider'
import { ClassificationStoreValueControl, useClassificationStoreFieldActions } from './classification-store-value-control'

const mockOpenModal = jest.fn()
const mockUpdate = jest.fn()

// The shared classification store modal is Redux/antd-backed and not what is under test here:
// only whether the picker hook reaches it, so stub it down to the `openModal` call.
jest.mock('@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/provider/classifcation-store-modal-provider', () => ({
  ClassificationStoreModalProvider: ({ children }: { children: React.ReactNode }) => children,
  useClassificationStoreModal: () => ({ openModal: mockOpenModal })
}))

jest.mock('@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/types', () => ({
  TabId: { GroupByKey: 'group-by-key' }
}))

jest.mock('@Pimcore/components/form/item/provider/item/use-item', () => ({
  useItem: () => ({ name: ['config', 'fields', 0] })
}))

jest.mock('@Pimcore/components/form/controls/keyed-list/provider/keyed-list/use-keyed-list', () => ({
  useKeyedList: () => ({ operations: { update: mockUpdate } })
}))

// Form values the control watches, keyed by the last segment of the watched name path.
const mockWatchedValues: Record<string, unknown> = {}

// Presentational imports of the value control pull in antd-style's ESM build and the app shell,
// which jest cannot load; stub them down to plain elements so the control's output can be asserted.
jest.mock('@Pimcore/components/box/box', () => ({ Box: ({ children }: { children: React.ReactNode }) => children }))
jest.mock('@Pimcore/components/flex/flex', () => ({ Flex: ({ children }: { children: React.ReactNode }) => children }))
jest.mock('@Pimcore/components/form/form', () => ({
  Form: { useWatch: (path: Array<string | number>) => mockWatchedValues[String(path[path.length - 1])] }
}))
jest.mock('@Pimcore/components/icon-button/icon-button', () => ({
  IconButton: ({ onClick }: { onClick: () => void }) => <button onClick={ onClick }>edit</button>
}))
jest.mock('@Pimcore/components/text/text', () => ({ Text: ({ children }: { children: React.ReactNode }) => <span>{ children }</span> }))
jest.mock('antd', () => ({ Tag: ({ children }: { children: React.ReactNode }) => <span>{ children }</span> }))

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

const resolveField = (fieldKey: string): { storeId: number } | undefined =>
  fieldKey === 'cs' ? { storeId: 1 } : undefined

const PickerProvider = ({ children }: { children: React.ReactNode }): React.JSX.Element => (
  <ClassificationStoreFieldPickerProvider defaultClassId="CAR">{children}</ClassificationStoreFieldPickerProvider>
)

describe('useClassificationStoreFieldActions', () => {
  beforeEach(() => {
    mockOpenModal.mockReset()
    mockUpdate.mockReset()
  })

  // pimcore/platform-version#830: custom Data Hub column editors render the simple/relation field
  // sources without a ClassificationStoreFieldPickerProvider, which crashed the editor on mount.
  it('does not throw when rendered without a ClassificationStoreFieldPickerProvider', () => {
    const { result } = renderHook(() => useClassificationStoreFieldActions({ resolveField }))

    expect(result.current.isPickerAvailable).toBe(false)
    expect(() => { result.current.openFor('cs') }).not.toThrow()
    expect(mockOpenModal).not.toHaveBeenCalled()

    result.current.onFieldSelect()
    expect(mockUpdate).toHaveBeenCalledWith(['config', 'fields', 0, 'keyId'], undefined, false)
  })

  it('opens the picker for a classification store field when the provider is present', () => {
    const { result } = renderHook(() => useClassificationStoreFieldActions({ resolveField }), { wrapper: PickerProvider })

    expect(result.current.isPickerAvailable).toBe(true)

    result.current.openFor('cs')

    expect(mockOpenModal).toHaveBeenCalledWith(expect.objectContaining({ storeId: 1, classId: 'CAR', fieldName: 'cs' }))
  })
})

describe('ClassificationStoreValueControl', () => {
  beforeEach(() => {
    mockOpenModal.mockReset()
    for (const key of Object.keys(mockWatchedValues)) {
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete mockWatchedValues[key]
    }
    mockWatchedValues.field = 'cs'
  })

  // pimcore/platform-version#830: without a provider there is nothing the edit affordance could open.
  it('renders nothing for a classification store field when no provider is mounted', () => {
    const { container } = render(<ClassificationStoreValueControl resolveField={ resolveField } />)

    expect(container).toBeEmptyDOMElement()
  })

  it('renders the edit affordance for a classification store field and opens the picker when the provider is present', () => {
    mockWatchedValues.keyId = 7
    mockWatchedValues.keyName = 'weight'

    render(<ClassificationStoreValueControl resolveField={ resolveField } />, { wrapper: PickerProvider })

    expect(screen.getByText('weight')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'edit' }))

    expect(mockOpenModal).toHaveBeenCalledWith(expect.objectContaining({ storeId: 1, classId: 'CAR', fieldName: 'cs' }))
  })

  it('renders nothing for a field that is not a classification store field', () => {
    mockWatchedValues.field = 'name'

    const { container } = render(<ClassificationStoreValueControl resolveField={ resolveField } />, { wrapper: PickerProvider })

    expect(container).toBeEmptyDOMElement()
  })
})
