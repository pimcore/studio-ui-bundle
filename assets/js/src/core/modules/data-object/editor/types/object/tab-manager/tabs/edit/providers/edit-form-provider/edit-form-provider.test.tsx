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
 * The regression this guards: a Save/Publish click reads the modified-attributes map
 * synchronously and clears it once the save comes back - but that save can run much
 * later (queued behind another one, or just network latency), during which the user
 * keeps editing. An unconditional clear on completion silently drops whatever was
 * typed in that window, since nothing else carries it to the backend. See
 * save-buttons.tsx's handleSaveClick, the only caller that passes a snapshot.
 */

import React from 'react'
import { act, render, screen } from '@testing-library/react'
import { EditFormProvider, useEditFormContext } from './edit-form-provider'

jest.mock('@sdk/components', () => ({
  Form: { useForm: () => [{ isFieldTouched: () => true }] }
}))

jest.mock('@Pimcore/modules/element/hooks/use-element-context', () => ({
  useElementContext: () => ({ id: 42 })
}))

jest.mock('@Pimcore/modules/data-object/hooks/use-data-object-draft', () => ({
  useDataObjectDraft: () => ({ dataObject: { permissions: { save: true, publish: true } }, markObjectDataAsModified: jest.fn() })
}))

jest.mock('@Pimcore/modules/data-object/actions/save/use-save', () => ({
  SaveTaskType: { AutoSave: 'autoSave' },
  useSave: () => ({ save: jest.fn(async () => {}), isError: false })
}))

jest.mock('@Pimcore/components/message/useMessage', () => ({ useMessage: () => ({ error: jest.fn() }) }))
jest.mock('react-i18next', () => ({ useTranslation: () => ({ t: (key: string) => key }) }))
jest.mock('@Pimcore/app/depency-injection', () => ({
  container: { get: () => ({ hasDynamicType: () => false, getDynamicType: () => undefined }) }
}))
jest.mock('@Pimcore/app/config/services/service-ids', () => ({ serviceIds: {} }))

// Reads and mutates the ref through the same functions the app uses; the ref itself
// triggers no re-render, so a tick forces one after every action to display the
// current value.
const Probe = (): React.JSX.Element => {
  const { updateModifiedDataObjectAttributes, resetModifiedDataObjectAttributes, getModifiedDataObjectAttributes } = useEditFormContext()
  const [, setTick] = React.useState(0)
  const rerender = (): void => { setTick(t => t + 1) }
  // Mirrors save-buttons.tsx: the snapshot is captured once, synchronously, well
  // before the reset that (much later, in the real flow) closes over it runs.
  const capturedSnapshotRef = React.useRef<Record<string, any>>()

  return (
    <>
      <span data-testid="value">{ JSON.stringify(getModifiedDataObjectAttributes()) }</span>
      <button
        onClick={ () => { updateModifiedDataObjectAttributes({ name: 'edited' }); rerender() } }
        type="button"
      >
        edit
      </button>
      <button
        onClick={ () => { capturedSnapshotRef.current = getModifiedDataObjectAttributes() } }
        type="button"
      >
        capture snapshot
      </button>
      <button
        onClick={ () => { resetModifiedDataObjectAttributes(capturedSnapshotRef.current); rerender() } }
        type="button"
      >
        reset with captured snapshot
      </button>
      <button
        onClick={ () => { resetModifiedDataObjectAttributes(); rerender() } }
        type="button"
      >
        reset unconditionally
      </button>
    </>
  )
}

const renderProbe = (): void => {
  render(
    <EditFormProvider>
      <Probe />
    </EditFormProvider>
  )
}

const value = (): unknown => JSON.parse(screen.getByTestId('value').textContent ?? 'null')
const click = (name: string): void => { act(() => { screen.getByRole('button', { name }).click() }) }

describe('EditFormProvider resetModifiedDataObjectAttributes', () => {
  it('clears the map when nothing changed since the given snapshot', () => {
    renderProbe()

    click('edit')
    expect(value()).toEqual({ name: 'edited' })

    click('capture snapshot')
    click('reset with captured snapshot')
    expect(value()).toEqual({})
  })

  it('keeps a later edit instead of discarding it when the snapshot has gone stale', () => {
    renderProbe()

    // this is the snapshot a save is about to send, taken before the save runs
    click('edit')
    click('capture snapshot')

    // a further edit lands while that save is in flight or queued
    click('edit')
    expect(value()).toEqual({ name: 'edited' })

    // the save's completion now resets against the (by then stale) captured snapshot
    click('reset with captured snapshot')

    // the later edit is still there - it was not silently dropped
    expect(value()).toEqual({ name: 'edited' })
  })

  it('clears unconditionally when called without a snapshot', () => {
    renderProbe()

    click('edit')
    click('reset unconditionally')

    expect(value()).toEqual({})
  })
})
