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

// Renders the state of a single field and offers the two transitions on it.
const FieldHarness = ({ name }: { name: string | string[] }): React.JSX.Element => {
  const inheritanceState = useInheritanceState()
  const state = inheritanceState?.getInheritanceState(name)

  return (
    <>
      <span data-testid="state">{ String(state?.inherited) }</span>
      <span data-testid="origin">{ String(state?.objectId) }</span>
      <button
        data-testid="break"
        onClick={ () => { inheritanceState?.breakInheritance(name) } }
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

describe('InheritanceStateProvider', () => {
  it('restores an inherited field that was broken during the session', async () => {
    const user = userEvent.setup()
    renderField('manufacturer')

    expect(state()).toBe('true')

    await user.click(screen.getByTestId('break'))
    expect(state()).toBe('broken')

    await user.click(screen.getByTestId('restore'))
    expect(state()).toBe('true')
    expect(origin()).toBe(String(parentId))
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
