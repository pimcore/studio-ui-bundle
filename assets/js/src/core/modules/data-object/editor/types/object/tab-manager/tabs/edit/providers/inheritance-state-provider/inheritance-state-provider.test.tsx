/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useRef } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { InheritanceStateProvider } from './inheritance-state-provider'
import { useInheritanceState } from './use-inheritance-state'

const objectId = 42
const parentId = 7

// jest.mock factories are hoisted, so anything they read has to be inlined there.
jest.mock('@Pimcore/modules/data-object/data-object-provider', () => ({
  DataObjectContext: jest.requireActual<typeof React>('react').createContext({ id: 42 })
}))

const mockDataObject = {
  inheritanceData: {
    metaData: {
      manufacturer: { objectId: parentId, inherited: true },
      name: { objectId, inherited: false },
      sku: { objectId, inherited: false, inheritable: true, inheritedValue: 'SKU-PARENT' },
      ean: { objectId, inherited: false, inheritable: true, inheritedValue: null },
      slug: { objectId, inherited: false, inheritable: false, inheritedValue: null },
      localizedfields: {
        description: {
          de: { objectId: parentId, inherited: true }
        }
      }
    }
  }
}

jest.mock('@Pimcore/modules/data-object/hooks/use-data-object-draft', () => ({
  useDataObjectDraft: () => ({ dataObject: mockDataObject })
}))

// Renders the state of a single field and offers the two transitions on it. Break
// goes through the context of the first render, as the object editor form does: it
// keeps the change handler it was created with.
const FieldHarness = ({ name }: { name: string | string[] }): React.JSX.Element => {
  const inheritanceState = useInheritanceState()
  const firstRenderContext = useRef(inheritanceState)
  const state = inheritanceState?.getInheritanceState(name)

  return (
    <>
      <span data-testid="state">{ String(state?.inherited) }</span>
      <span data-testid="origin">{ String(state?.objectId) }</span>
      <span data-testid="can-restore">{ String(inheritanceState?.canRestoreInheritance(name)) }</span>
      <span data-testid="inherited-value">{ String(inheritanceState?.getInheritedValue(name)) }</span>
      <button
        data-testid="break"
        onClick={ () => { firstRenderContext.current?.breakInheritance(name) } }
      >
        break
      </button>
      <button
        data-testid="restore"
        onClick={ () => { inheritanceState?.restoreInheritance(name) } }
      >
        restore
      </button>
    </>
  )
}

const renderField = (name: string | string[]): void => {
  render(
    <InheritanceStateProvider>
      <FieldHarness name={ name } />
    </InheritanceStateProvider>
  )
}

const state = (): string => screen.getByTestId('state').textContent ?? ''
const origin = (): string => screen.getByTestId('origin').textContent ?? ''
const canRestore = (): string => screen.getByTestId('can-restore').textContent ?? ''
const inheritedValue = (): string => screen.getByTestId('inherited-value').textContent ?? ''

describe('InheritanceStateProvider', () => {
  it('restores an inherited field that was broken during the session', async () => {
    const user = userEvent.setup()
    renderField('manufacturer')

    expect(state()).toBe('true')

    await user.click(screen.getByTestId('break'))
    expect(state()).toBe('broken')

    expect(canRestore()).toBe('true')
    // restored through the value it was loaded with
    expect(inheritedValue()).toBe('undefined')

    await user.click(screen.getByTestId('restore'))
    expect(state()).toBe('true')
    expect(origin()).toBe(String(parentId))
    expect(canRestore()).toBe('false')
  })

  it('marks a field overridden in an earlier session and restores it to the ancestor value', async () => {
    const user = userEvent.setup()
    renderField('sku')

    expect(state()).toBe('broken')
    expect(canRestore()).toBe('true')
    expect(inheritedValue()).toBe('SKU-PARENT')

    await user.click(screen.getByTestId('restore'))
    expect(state()).toBe('true')
    // the backend reports the ancestor value, not the object holding it
    expect(origin()).toBe('undefined')
    expect(canRestore()).toBe('false')

    await user.click(screen.getByTestId('break'))
    expect(state()).toBe('broken')
    expect(canRestore()).toBe('true')
  })

  it('only breaks a field that reads as inherited', async () => {
    const user = userEvent.setup()
    renderField('name')

    await user.click(screen.getByTestId('break'))
    expect(state()).toBe('false')
  })

  it('ignores a break for a field without inheritance data', async () => {
    const user = userEvent.setup()
    renderField('unknown')

    await user.click(screen.getByTestId('break'))
    expect(state()).toBe('undefined')
    expect(canRestore()).toBe('false')
  })

  it.each([
    ['no ancestor holds a value', 'ean'],
    ['the field cannot inherit', 'slug']
  ])('treats an own value as not overridden when %s', async (_label, fieldName) => {
    const user = userEvent.setup()
    renderField(fieldName)

    expect(state()).toBe('false')
    expect(canRestore()).toBe('false')

    await user.click(screen.getByTestId('restore'))
    expect(state()).toBe('false')
  })

  it('restores a localized field by its full form path', async () => {
    const user = userEvent.setup()
    renderField(['localizedfields', 'description', 'de'])

    await user.click(screen.getByTestId('break'))
    expect(state()).toBe('broken')

    await user.click(screen.getByTestId('restore'))
    expect(state()).toBe('true')
  })

  it('leaves a field that already had an own value untouched', async () => {
    const user = userEvent.setup()
    renderField('name')

    expect(state()).toBe('false')

    await user.click(screen.getByTestId('restore'))
    expect(state()).toBe('false')
  })

  it('ignores a restore for a field without inheritance data', async () => {
    const user = userEvent.setup()
    renderField('unknown')

    await user.click(screen.getByTestId('restore'))
    expect(state()).toBe('undefined')
  })
})
