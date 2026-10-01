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
 * Restoring keys of a classification store. The store holds its values in a keyed
 * list and only writes the keys the backend receives, so a restored key has to be
 * sent as null for the backend to let it inherit again. What matters is that
 * payload and the value the keys read after a restore.
 */

import React, { useEffect, useState } from 'react'
import { act, render, screen } from '@testing-library/react'
import { ItemProvider } from '@Pimcore/components/form/item/provider/item/item-provider'
import {
  useRestoreInheritance
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/label/hooks/use-restore-inheritance'
import {
  useKeyedListContext,
  useKeyedListValue
} from '@Pimcore/components/form/controls/keyed-list/provider/keyed-list/use-keyed-list-value'
import {
  InheritanceStateProvider
} from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/inheritance-state-provider/inheritance-state-provider'
import {
  useInheritanceState
} from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/inheritance-state-provider/use-inheritance-state'
import { ClassificationStore, type ClassificationStoreProps } from './classification-store'

const objectId = 42
const parentId = 7
const group = '2'

let mockDataObject: {
  id: number
  className: string
  objectData: Record<string, unknown>
  inheritanceData: { metaData: Record<string, unknown> }
}

const inherited = (): object => ({ objectId: parentId, inherited: true, inheritable: true, inheritedValue: null })
const overridden = (inheritedValue: unknown): object => ({ objectId, inherited: false, inheritable: true, inheritedValue })

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

// the group layout is replaced by the keys the test hands in; the modal is not involved
jest.mock('./classification-store-content', () => ({
  ClassificationStoreContent: ({ children }: { children: React.ReactNode }) => <>{children}</>
}))
jest.mock('./components/classification-store-modal/classification-store-modal', () => ({
  ClassificationStoreModal: () => null
}))
jest.mock('./provider', () => ({
  ClassificationStoreProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>
}))

/** A store key as KeyedFormItemControl wires it, with a change and a restore action. */
const StoreKey = ({ name }: { name: string[] }): React.JSX.Element => {
  const { operations } = useKeyedListContext()
  const { canRestore, restore } = useRestoreInheritance(name)
  const value = useKeyedListValue(name)
  const state = useInheritanceState()?.getInheritanceState(name)
  const key = name.join('.')

  useEffect(() => {
    if (value === undefined) {
      operations.update(name, null, true)
    }
  }, [value])

  return (
    <>
      <span data-testid={ `value-${key}` }>{ JSON.stringify(value ?? null) }</span>
      <span data-testid={ `state-${key}` }>{ String(state?.inherited) }</span>
      <button
        onClick={ () => { operations.update(name, 'Own', false) } }
        type="button"
      >
        change {key}
      </button>
      <button
        disabled={ !canRestore }
        onClick={ restore }
        type="button"
      >
        restore {key}
      </button>
    </>
  )
}

const storeName = ['store']
const key4 = ['store', group, 'default', '4']
const key5 = ['store', group, 'default', '5']
const key4de = ['store', group, 'de', '4']

const onChange = jest.fn()

/** Holds the value like the Ant form item does: what the store emits comes back as its value. */
const Host = ({ keys }: { keys: string[][] }): React.JSX.Element => {
  const [value, setValue] = useState(mockDataObject.objectData.store)
  const props = {
    name: storeName,
    value,
    onChange: (newValue: unknown) => { onChange(newValue); setValue(newValue) },
    storeId: 1,
    allowedGroupIds: [],
    localized: false
  } as unknown as ClassificationStoreProps

  return (
    <ClassificationStore { ...props }>
      { keys.map((name) => (
        <StoreKey
          key={ name.join('.') }
          name={ name }
        />
      )) }
    </ClassificationStore>
  )
}

const renderStore = (keys: string[][]): void => {
  render(
    <InheritanceStateProvider>
      <ItemProvider item={ { name: storeName } }>
        <Host keys={ keys } />
      </ItemProvider>
    </InheritanceStateProvider>
  )
}

const valueOf = (name: string[]): unknown => JSON.parse(screen.getByTestId(`value-${name.join('.')}`).textContent ?? 'null')
const stateOf = (name: string[]): string => screen.getByTestId(`state-${name.join('.')}`).textContent ?? ''
const change = (name: string[]): void => { act(() => { screen.getByRole('button', { name: `change ${name.join('.')}` }).click() }) }
const restore = (name: string[]): void => {
  const button = screen.getByRole('button', { name: `restore ${name.join('.')}` })
  expect(button).toBeEnabled()
  act(() => { button.click() })
}

// the keyed list reports changes through a 10ms debounce
const flushChanges = (): void => { act(() => { jest.advanceTimersByTime(20) }) }

const lastPayload = (): unknown => {
  if (onChange.mock.calls.length === 0) throw new Error('nothing was emitted')

  return onChange.mock.calls[onChange.mock.calls.length - 1][0]
}

const groupMeta = { activeGroups: { [group]: true }, groupCollectionMapping: { [group]: 1 } }

beforeEach(() => {
  jest.useFakeTimers()
  jest.clearAllMocks()
  mockDataObject = {
    id: objectId,
    className: 'Product',
    objectData: { store: { ...groupMeta, [group]: { default: { 4: 'Parent 4', 5: 'Parent 5' } } } },
    inheritanceData: { metaData: { store: { [group]: { default: { 4: inherited(), 5: inherited() } } } } }
  }
})

afterEach(() => { jest.useRealTimers() })

describe('ClassificationStore', () => {
  it('sends a key changed in this session as empty once it is restored, so an auto save of it is undone', () => {
    renderStore([key4, key5])

    change(key4)
    flushChanges()
    expect(stateOf(key4)).toBe('broken')
    expect(lastPayload()).toEqual({ ...groupMeta, [group]: { default: { 4: 'Own' } } })

    restore(key4)

    expect(valueOf(key4)).toBe('Parent 4')
    expect(stateOf(key4)).toBe('true')
    // left out, the key would keep the value the auto save wrote
    expect(lastPayload()).toEqual({ ...groupMeta, [group]: { default: { 4: null } } })
  })

  it('shows the parent value of a key overridden in an earlier session once restored, and sends it as empty', () => {
    mockDataObject.objectData = { store: { ...groupMeta, [group]: { default: { 4: 'Own 4', 5: 'Parent 5' } } } }
    mockDataObject.inheritanceData.metaData = { store: { [group]: { default: { 4: overridden('Parent 4'), 5: inherited() } } } }
    renderStore([key4, key5])

    expect(valueOf(key4)).toBe('Own 4')
    expect(stateOf(key4)).toBe('broken')

    restore(key4)

    expect(valueOf(key4)).toBe('Parent 4')
    expect(stateOf(key4)).toBe('true')
    expect(lastPayload()).toEqual({ ...groupMeta, [group]: { default: { 4: null } } })
  })

  it('keeps the group and the inherited values of its other keys when the last own key is restored', () => {
    mockDataObject.objectData = { store: { ...groupMeta, [group]: { default: { 4: 'Own 4', 5: 'Parent 5' } } } }
    mockDataObject.inheritanceData.metaData = { store: { [group]: { default: { 4: overridden('Parent 4'), 5: inherited() } } } }
    renderStore([key4, key5])

    restore(key4)
    flushChanges()

    expect(valueOf(key4)).toBe('Parent 4')
    expect(valueOf(key5)).toBe('Parent 5')
    const payload = lastPayload() as Record<string, unknown>
    expect(payload[group]).toEqual({ default: { 4: null } })
    expect(payload.activeGroups).toEqual({ [group]: true })
  })

  it('breaks a restored key again when it is changed', () => {
    renderStore([key4, key5])

    change(key4)
    flushChanges()
    restore(key4)
    change(key4)
    flushChanges()

    expect(valueOf(key4)).toBe('Own')
    expect(stateOf(key4)).toBe('broken')
    expect(lastPayload()).toEqual({ ...groupMeta, [group]: { default: { 4: 'Own' } } })
  })

  it('restores a key of a localized store for its language only', () => {
    mockDataObject.objectData = {
      store: { ...groupMeta, [group]: { default: { 4: 'Parent 4' }, de: { 4: 'Eigen 4' } } }
    }
    mockDataObject.inheritanceData.metaData = {
      store: { [group]: { default: { 4: inherited() }, de: { 4: overridden('Eltern 4') } } }
    }
    renderStore([key4, key4de])

    restore(key4de)

    expect(valueOf(key4de)).toBe('Eltern 4')
    expect(valueOf(key4)).toBe('Parent 4')
    expect(lastPayload()).toEqual({ ...groupMeta, [group]: { de: { 4: null } } })
  })
})
