/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

/**
 * A configuration refresh replaces the group layout of a mounted field and leaves what the user
 * entered alone: the values survive keys arriving and being reordered, and the field reports no change.
 */

import React, { useEffect } from 'react'
import { act, render, screen } from '@testing-library/react'
import { ItemProvider } from '@Pimcore/components/form/item/provider/item/item-provider'
import {
  useKeyedListContext,
  useKeyedListValue
} from '@Pimcore/components/form/controls/keyed-list/provider/keyed-list/use-keyed-list-value'
import {
  InheritanceStateProvider
} from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/inheritance-state-provider/inheritance-state-provider'
import { emitClassificationStoreConfigurationChange } from '@Pimcore/modules/data-object/classification-store/classification-store-configuration-change'
import { ClassificationStore, type ClassificationStoreProps } from './classification-store'
import { type ClassificationStoreGroupLayout2 } from '@Pimcore/modules/data-object/classification-store/classification-store-api-slice.gen'
import { useClassificationStore } from './provider'
import { LAYOUT_REFRESH_DEBOUNCE_MS, useLayoutRefresh } from './hooks/use-layout-refresh'

const objectId = 42
const group = '2'
const mockFetch = jest.fn()

let mockDataObject: { id: number, className: string, objectData: Record<string, unknown>, inheritanceData: { metaData: Record<string, unknown> } }

jest.mock('@Pimcore/modules/data-object/data-object-provider', () => ({
  DataObjectContext: jest.requireActual<typeof React>('react').createContext({ id: 42 })
}))

jest.mock('@Pimcore/modules/element/hooks/use-element-context', () => ({
  useElementContext: () => ({ id: 42, elementType: 'data-object' })
}))

jest.mock('@Pimcore/modules/data-object/hooks/use-data-object-draft', () => ({
  useDataObjectDraft: () => ({ dataObject: mockDataObject })
}))

// a keyed list restores through its owner, not the edit form; the form provider carries antd-style
jest.mock('@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/edit-form-provider/edit-form-provider', () => ({
  useEditFormContextOptional: () => undefined
}))

// the object permissions as the store holds them, read by the locale check of the restore
jest.mock('@sdk/app', () => ({ useAppSelector: (selector: () => unknown) => selector() }))
jest.mock('@Pimcore/modules/data-object/data-object-draft-slice', () => ({
  selectDataObjectById: () => ({ permissions: { localizedEdit: null } })
}))

jest.mock('@Pimcore/modules/data-object/utils/provider/class-defintions/use-class-definitions', () => ({
  useClassDefinitions: () => ({ getByName: () => ({ id: 1 }) })
}))

jest.mock('@Pimcore/components/language-selection', () => ({
  useLanguageSelection: () => ({ hasLocalizedFields: false, setHasLocalizedFields: jest.fn() })
}))

// the form barrel imports antd-style; the store only needs the keyed list from it
jest.mock('@Pimcore/components/form/form', () => ({
  Form: {
    Group: jest.requireActual('@Pimcore/components/form/group/group').Group,
    // resolved on use: the keyed list imports this barrel itself
    get KeyedList () {
      return jest.requireActual('@Pimcore/components/form/controls/keyed-list/keyed-list').KeyedList
    }
  }
}))

jest.mock('@Pimcore/modules/data-object/classification-store/classification-store-api-slice-enhanced', () => ({
  useLazyClassificationStoreGetLayoutByGroupQuery: () => [mockFetch]
}))
jest.mock('./classification-store-content', () => ({
  ClassificationStoreContent: ({ children }: { children: React.ReactNode }) => <>{children}</>
}))
jest.mock('./components/classification-store-modal/classification-store-modal', () => ({
  ClassificationStoreModal: () => null
}))

const layout = (keyIds: number[]): object => ({
  id: Number(group),
  name: 'Dimensions',
  description: null,
  keys: keyIds.map((id) => ({ id, name: `key${id}`, definition: {} }))
})

const StoreKey = ({ keyId }: { keyId: number }): React.JSX.Element => {
  const name = ['store', group, 'default', String(keyId)]
  const { operations } = useKeyedListContext()
  const value = useKeyedListValue(name)

  useEffect(() => {
    if (value === undefined) operations.update(name, null, true)
  }, [value])

  return (
    <>
      <span data-testid={ `value-${keyId}` }>{ JSON.stringify(value ?? null) }</span>
      <button
        onClick={ () => { operations.update(name, `typed ${keyId}`, false) } }
        type='button'
      >
        type {keyId}
      </button>
    </>
  )
}

/** The content of the field in miniature: the keys of the current layout, refreshed through the real hook. */
const Content = (): React.JSX.Element => {
  const { currentLayoutData, updateCurrentLayoutData } = useClassificationStore()
  useEffect(() => { updateCurrentLayoutData([layout([4, 5]) as unknown as ClassificationStoreGroupLayout2]) }, [])
  useLayoutRefresh({ objectId, fieldName: 'store' })

  return (
    <div data-testid='order'>
      {currentLayoutData.flatMap((entry: any) => entry.keys.map((key: any) => (
        <StoreKey
          key={ key.id }
          keyId={ key.id }
        />
      )))}
    </div>
  )
}

const onChange = jest.fn()

const Host = (): React.JSX.Element => {
  const props = {
    name: ['store'],
    value: mockDataObject.objectData.store,
    onChange,
    storeId: 1,
    allowedGroupIds: [],
    localized: false
  } as unknown as ClassificationStoreProps

  return (
    <ClassificationStore { ...props }>
      <Content />
    </ClassificationStore>
  )
}

beforeEach(() => {
  jest.useFakeTimers()
  jest.clearAllMocks()
  mockDataObject = {
    id: objectId,
    className: 'Product',
    objectData: { store: { activeGroups: { [group]: true }, groupCollectionMapping: { [group]: 1 }, [group]: { default: { 4: 'Parent 4', 5: 'Parent 5' } } } },
    inheritanceData: { metaData: {} }
  }
})

afterEach(() => { jest.useRealTimers() })

describe('ClassificationStore layout refresh', () => {
  it('keeps the entered values and reports no change when the refresh adds and reorders keys', async () => {
    render(
      <InheritanceStateProvider>
        <ItemProvider item={ { name: ['store'] } }>
          <Host />
        </ItemProvider>
      </InheritanceStateProvider>
    )

    act(() => {
      screen.getByRole('button', { name: 'type 4' }).click()
      screen.getByRole('button', { name: 'type 5' }).click()
    })
    // the keyed list reports changes through a debounce; those belong to the typing, not to the refresh
    await act(async () => { await jest.advanceTimersByTimeAsync(50) })
    expect(onChange).toHaveBeenCalled()
    onChange.mockClear()

    mockFetch.mockImplementation(() => ({ unwrap: async () => layout([6, 5, 4]) }))
    await act(async () => {
      emitClassificationStoreConfigurationChange()
      await jest.advanceTimersByTimeAsync(LAYOUT_REFRESH_DEBOUNCE_MS + 50)
    })

    expect(mockFetch).toHaveBeenCalledTimes(1)
    expect(screen.getByTestId('order').textContent).toMatch(/^null.*typed 5.*typed 4/)
    expect(screen.getByTestId('value-4')).toHaveTextContent('"typed 4"')
    expect(screen.getByTestId('value-5')).toHaveTextContent('"typed 5"')
    expect(screen.getByTestId('value-6')).toHaveTextContent('null')
    expect(onChange).not.toHaveBeenCalled()
  })
})
