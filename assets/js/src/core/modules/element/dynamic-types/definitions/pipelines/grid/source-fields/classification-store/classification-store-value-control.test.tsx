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
import { renderHook } from '@testing-library/react'
import { ClassificationStoreFieldPickerProvider } from './classification-store-field-picker-provider'
import { useClassificationStoreFieldActions } from './classification-store-value-control'

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

// Presentational imports of the value control pull in antd-style's ESM build and the app shell,
// which jest cannot load; only the hook is exercised here.
jest.mock('@Pimcore/components/box/box', () => ({ Box: () => null }))
jest.mock('@Pimcore/components/flex/flex', () => ({ Flex: () => null }))
jest.mock('@Pimcore/components/form/form', () => ({ Form: { useWatch: () => undefined } }))
jest.mock('@Pimcore/components/icon-button/icon-button', () => ({ IconButton: () => null }))
jest.mock('@Pimcore/components/text/text', () => ({ Text: () => null }))

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

const resolveField = (fieldKey: string): { storeId: number } | undefined =>
  fieldKey === 'cs' ? { storeId: 1 } : undefined

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
    const wrapper = ({ children }: { children: React.ReactNode }): React.JSX.Element => (
      <ClassificationStoreFieldPickerProvider defaultClassId="CAR">{children}</ClassificationStoreFieldPickerProvider>
    )

    const { result } = renderHook(() => useClassificationStoreFieldActions({ resolveField }), { wrapper })

    expect(result.current.isPickerAvailable).toBe(true)

    result.current.openFor('cs')

    expect(mockOpenModal).toHaveBeenCalledWith(expect.objectContaining({ storeId: 1, classId: 'CAR', fieldName: 'cs' }))
  })
})
