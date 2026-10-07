/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

/* eslint-disable max-lines */

/**
 * Restoring fields of an object brick. The brick holds its values in a keyed list
 * and encodes inherited fields as null in the payload it emits, so what matters is
 * that payload and the value the fields read after a restore.
 */

import React, { useEffect, useMemo, useState } from 'react'
import { act, render, screen, within } from '@testing-library/react'
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
import { ObjectBrick, type ObjectBrickProps } from './object-brick'
import { ObjectBlock, type ObjectBlockProps } from '../block/object-block'
import { RestoreInheritanceLabelExtra } from '@Pimcore/modules/data-object/components/restore-inheritance-label-extra'

const objectId = 42
const parentId = 7

let mockDataObject: { objectData: Record<string, unknown>, inheritanceData: { metaData: Record<string, unknown> } }

const inherited = (): object => ({ objectId: parentId, inherited: true, inheritable: true, inheritedValue: null })
const overridden = (inheritedValue: unknown): object => ({ objectId, inherited: false, inheritable: true, inheritedValue })
const own = (): object => ({ objectId, inherited: false, inheritable: true, inheritedValue: null })

jest.mock('@Pimcore/modules/data-object/data-object-provider', () => ({
  DataObjectContext: jest.requireActual<typeof React>('react').createContext({ id: 42 })
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

// the form barrel imports antd-style; the brick only needs the keyed list from it
jest.mock('@Pimcore/components/form/form', () => ({
  Form: {
    Group: jest.requireActual('@Pimcore/components/form/group/group').Group,
    // resolved on use: the lists import this barrel themselves
    get KeyedList () {
      return jest.requireActual('@Pimcore/components/form/controls/keyed-list/keyed-list').KeyedList
    },
    get NumberedList () {
      return jest.requireActual('@Pimcore/components/form/controls/numbered-list/numbered-list').NumberedList
    }
  }
}))

// The block layout is replaced by its header, the items the numbered list holds and
// a way to add one, as the block's add button does.
jest.mock('../block/object-block-content', () => {
  const {
    useNumberedListContext,
    useNumberedListSelector
  } = jest.requireActual('@Pimcore/components/form/controls/numbered-list/provider/numbered-list/use-numbered-list-value')
  const selectItems = (items: unknown[]): unknown[] => items

  return {
    ObjectBlockContent: ({ title }: { title: React.ReactNode }) => {
      const { operations } = useNumberedListContext()
      const items = useNumberedListSelector(selectItems)

      return (
        <>
          <div data-testid="block-header">{title}</div>
          <span
            data-testid="block-items"
            data-value={ JSON.stringify(items) }
          />
          <button
            onClick={ () => { operations.add({ type: 'block', data: { text: 'own item' } }) } }
            type="button"
          >
            add block item
          </button>
        </>
      )
    }
  }
})

// the restore action in the block header, reduced to what the test reads
jest.mock('react-i18next', () => ({ useTranslation: () => ({ t: (key: string) => key }) }))
jest.mock('@Pimcore/modules/data-object/components/restore-inheritance-button.styles', () => ({ useStyles: () => ({ styles: {} }) }))
jest.mock('@Pimcore/modules/data-object/components/restore-inheritance-label-extra.styles', () => ({ useStyles: () => ({ styles: {} }) }))
jest.mock('@Pimcore/components/divider/divider', () => ({ Divider: () => null }))
jest.mock('@Pimcore/components/flex/flex', () => ({
  Flex: ({ children }: { children: React.ReactNode }) => <span>{children}</span>
}))
jest.mock('@Pimcore/components/icon-text-button/icon-text-button', () => ({
  IconTextButton: ({ children, onClick }: { children: React.ReactNode, onClick: React.MouseEventHandler }) => (
    <button
      onClick={ onClick }
      type="button"
    >
      {children}
    </button>
  )
}))

// the brick layout is replaced by the fields the test hands in
jest.mock('./object-brick-content', () => ({
  ObjectBrickContent: ({ children }: { children: React.ReactNode }) => <>{children}</>
}))

/** A brick field as KeyedFormItemControl wires it, with a change and a restore action. */
const BrickField = ({ name }: { name: string[] }): React.JSX.Element => {
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

/** A block in the brick: its value lives in the keyed list, its Restore in its own header. */
const BrickBlock = ({ name }: { name: string[] }): React.JSX.Element => {
  const { operations } = useKeyedListContext()
  const value = useKeyedListValue(name)
  const state = useInheritanceState()?.getInheritanceState(name)
  const item = useMemo(() => ({ name }), [name])

  useEffect(() => {
    if (value === undefined) {
      operations.update(name, null, true)
    }
  }, [value])

  const blockProps = {
    name,
    value,
    onChange: (newValue: unknown) => { operations.update(name, newValue, false) },
    title: <RestoreInheritanceLabelExtra />
  } as unknown as ObjectBlockProps

  return (
    <ItemProvider item={ item }>
      <span data-testid={ `state-${name.join('.')}` }>{ String(state?.inherited) }</span>
      <ObjectBlock { ...blockProps } />
    </ItemProvider>
  )
}

const brickName = ['bricks']
const nameField = ['bricks', 'MyBrick', 'name']
const colorField = ['bricks', 'MyBrick', 'color']

const onChange = jest.fn()

/** Holds the value like the Ant form item does: what the brick emits comes back as its value. */
const Host = ({ children }: { children?: React.ReactNode }): React.JSX.Element => {
  const [value, setValue] = useState(mockDataObject.objectData.bricks)
  const props = {
    name: brickName,
    value,
    onChange: (newValue: unknown) => { onChange(newValue); setValue(newValue) },
    allowedTypes: ['MyBrick']
  } as unknown as ObjectBrickProps

  return (
    <ObjectBrick { ...props }>
      { children ?? (
        <>
          <BrickField name={ nameField } />
          <BrickField name={ colorField } />
        </>
      ) }
    </ObjectBrick>
  )
}

const renderBrick = (children?: React.ReactNode): void => {
  render(
    <InheritanceStateProvider>
      <ItemProvider item={ { name: brickName } }>
        <Host>{ children }</Host>
      </ItemProvider>
    </InheritanceStateProvider>
  )
}

const blockField = ['bricks', 'MyBrick', 'block']
const parentItem = { type: 'block', data: { text: 'parent item' } }
const ownItem = { type: 'block', data: { text: 'own item' } }
const blockItems = (): unknown => JSON.parse(screen.getByTestId('block-items').getAttribute('data-value') ?? 'null')
const blockRestore = (): HTMLElement | null =>
  within(screen.getByTestId('block-header')).queryByRole('button', { name: 'inheritance-restore' })
const clickBlockRestore = (): void => {
  const restore = blockRestore()
  if (restore === null) throw new Error('no Restore in the block header')
  act(() => { restore.click() })
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

beforeEach(() => {
  jest.useFakeTimers()
  jest.clearAllMocks()
  mockDataObject = {
    objectData: { bricks: { MyBrick: { name: 'Parent name', color: 'red' } } },
    inheritanceData: { metaData: { bricks: { MyBrick: { name: inherited(), color: inherited() } } } }
  }
})

afterEach(() => { jest.useRealTimers() })

describe('ObjectBrick', () => {
  describe('a field inherited when the object was opened', () => {
    it('sends the own value on a change and the field as empty again on a restore', () => {
      renderBrick()

      change(nameField)
      flushChanges()
      expect(valueOf(nameField)).toBe('Own')
      expect(stateOf(nameField)).toBe('broken')
      // inherited fields travel as null, so the backend keeps them inherited
      expect(lastPayload()).toEqual({ MyBrick: { name: 'Own', color: null } })

      restore(nameField)

      expect(valueOf(nameField)).toBe('Parent name')
      expect(stateOf(nameField)).toBe('true')
      expect(lastPayload()).toEqual({ MyBrick: { name: null, color: null } })
    })

    it('breaks the field again when it is changed after a restore', () => {
      renderBrick()

      change(nameField)
      flushChanges()
      restore(nameField)
      change(nameField)
      flushChanges()

      expect(valueOf(nameField)).toBe('Own')
      expect(stateOf(nameField)).toBe('broken')
      expect(lastPayload()).toEqual({ MyBrick: { name: 'Own', color: null } })
    })
  })

  describe('a field overridden in an earlier session', () => {
    beforeEach(() => {
      mockDataObject.objectData = { bricks: { MyBrick: { name: 'Own name', color: 'red' } } }
      mockDataObject.inheritanceData.metaData = { bricks: { MyBrick: { name: overridden('Parent name'), color: inherited() } } }
    })

    it('is broken on opening and shows the parent value once restored', () => {
      renderBrick()

      expect(valueOf(nameField)).toBe('Own name')
      expect(stateOf(nameField)).toBe('broken')

      restore(nameField)

      expect(valueOf(nameField)).toBe('Parent name')
      expect(stateOf(nameField)).toBe('true')
      expect(lastPayload()).toEqual({ MyBrick: { name: null, color: null } })
    })

    it('keeps showing the parent value when another field of the brick changes', () => {
      renderBrick()

      restore(nameField)
      change(colorField)
      flushChanges()

      expect(valueOf(nameField)).toBe('Parent name')
      expect(valueOf(colorField)).toBe('Own')
      expect(lastPayload()).toEqual({ MyBrick: { name: null, color: 'Own' } })
    })
  })

  describe('a block in the brick', () => {
    it('gives the parent items back on Restore in its header once it was changed, and sends the block as empty', () => {
      mockDataObject.objectData = { bricks: { MyBrick: { block: [parentItem] } } }
      mockDataObject.inheritanceData.metaData = { bricks: { MyBrick: { block: inherited() } } }
      renderBrick(<BrickBlock name={ blockField } />)

      expect(blockItems()).toEqual([parentItem])
      expect(blockRestore()).not.toBeInTheDocument()

      act(() => { screen.getByRole('button', { name: 'add block item' }).click() })
      // the numbered list reports to the keyed list, which reports to the brick
      flushChanges()
      flushChanges()

      expect(stateOf(blockField)).toBe('broken')
      expect(lastPayload()).toEqual({ MyBrick: { block: [parentItem, ownItem] } })

      clickBlockRestore()

      expect(blockItems()).toEqual([parentItem])
      expect(stateOf(blockField)).toBe('true')
      expect(lastPayload()).toEqual({ MyBrick: { block: null } })
    })

    it('shows the parent items of a block overridden in an earlier session on Restore, and sends it as empty', () => {
      mockDataObject.objectData = { bricks: { MyBrick: { block: [ownItem] } } }
      mockDataObject.inheritanceData.metaData = { bricks: { MyBrick: { block: overridden([parentItem]) } } }
      renderBrick(<BrickBlock name={ blockField } />)

      expect(blockItems()).toEqual([ownItem])
      expect(stateOf(blockField)).toBe('broken')

      clickBlockRestore()

      expect(blockItems()).toEqual([parentItem])
      expect(stateOf(blockField)).toBe('true')
      expect(lastPayload()).toEqual({ MyBrick: { block: null } })
    })
  })

  it('leaves the other own values of the brick untouched by a restore', () => {
    mockDataObject.objectData = { bricks: { MyBrick: { name: 'Own name', color: 'blue' } } }
    mockDataObject.inheritanceData.metaData = { bricks: { MyBrick: { name: overridden('Parent name'), color: own() } } }
    renderBrick()

    restore(nameField)

    expect(valueOf(colorField)).toBe('blue')
    expect(stateOf(colorField)).toBe('false')
    expect(lastPayload()).toEqual({ MyBrick: { name: null, color: 'blue' } })
  })
})
