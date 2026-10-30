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
import { fireEvent, render, screen } from '@testing-library/react'
import { RenderEditable } from './render-editable'
import { RenderEditableOptionsContext } from './render-editable-options-context'
import { type AbstractDocumentEditableDefinition } from '@Pimcore/modules/element/dynamic-types/definitions/document/editable/dynamic-type-document-editable-abstract'

const editableType = {
  reloadOnChange: jest.fn(() => true),
  canDeferReloadOnChange: jest.fn(() => true),
  isEmpty: () => false,
  getEditableDataComponent: () => <FakeEditable />
}

const FakeEditable = ({ onChange }: { onChange?: (value: string) => void }): React.JSX.Element => (
  <>
    <button onClick={ () => onChange?.('changed') }>change</button>
    <button onClick={ () => onChange?.('initial') }>keep</button>
  </>
)

jest.mock('@sdk/components', () => ({
  Alert: () => <div />
}))

jest.mock('@sdk/app', () => ({
  serviceIds: { 'DynamicTypes/DocumentEditableRegistry': 'documentEditableRegistry' },
  useInjection: () => ({ hasDynamicType: () => true, getDynamicType: () => editableType })
}))

jest.mock('@sdk/modules/element', () => ({
  defaultFieldWidthValues: {},
  FieldWidthProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>
}))

jest.mock('@Pimcore/modules/app/error-boundary/error-boundary', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>
}))

jest.mock('./required-field-wrapper', () => ({
  RequiredFieldWrapper: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  applyRequiredStyling: jest.fn(),
  removeRequiredStyling: jest.fn()
}))

const setValue = jest.fn()
const updateValue = jest.fn()
const updateValueWithReload = jest.fn()

jest.mock('../../hooks/use-document-editor', () => ({
  useDocumentEditor: () => ({
    setValue,
    updateValue,
    updateValueWithReload,
    getValue: () => ({ type: 'select', data: 'initial' }),
    getInheritanceState: () => false,
    setInheritanceState: jest.fn()
  })
}))

const definition = { id: 'sel', name: 'teaser:1.layout', type: 'select', config: {} } as unknown as AbstractDocumentEditableDefinition

const renderEditable = (options?: { deferReloadOnChange: boolean, deferPersistence?: boolean, onReloadDeferred?: () => void }): void => {
  const editable = (
    <RenderEditable
      containerRef={ React.createRef<HTMLDivElement>() }
      editableDefinition={ definition }
    />
  )

  render(options === undefined
    ? editable
    : <RenderEditableOptionsContext.Provider value={ options }>{editable}</RenderEditableOptionsContext.Provider>
  )
}

describe('RenderEditable reload on change', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    editableType.reloadOnChange.mockReturnValue(true)
    editableType.canDeferReloadOnChange.mockReturnValue(true)
  })

  it('keeps reloading immediately for editables whose reload cannot be deferred', () => {
    // Structural editables (blocks) derive their row keys from the DOM the reload renders.
    editableType.canDeferReloadOnChange.mockReturnValue(false)
    const onReloadDeferred = jest.fn()
    renderEditable({ deferReloadOnChange: true, onReloadDeferred })

    fireEvent.click(screen.getByText('change'))

    expect(updateValueWithReload).toHaveBeenCalledWith('teaser:1.layout', { type: 'select', data: 'changed' })
    expect(updateValue).not.toHaveBeenCalled()
    expect(onReloadDeferred).not.toHaveBeenCalled()
  })

  it('saves and reloads immediately when nothing defers the reload', () => {
    renderEditable()

    fireEvent.click(screen.getByText('change'))

    expect(updateValueWithReload).toHaveBeenCalledWith('teaser:1.layout', { type: 'select', data: 'changed' })
    expect(updateValue).not.toHaveBeenCalled()
  })

  it('only stores the value and reports the held-back reload when the owner defers reloads', () => {
    const onReloadDeferred = jest.fn()
    renderEditable({ deferReloadOnChange: true, onReloadDeferred })

    fireEvent.click(screen.getByText('change'))

    expect(updateValue).toHaveBeenCalledWith('teaser:1.layout', { type: 'select', data: 'changed' })
    expect(updateValueWithReload).not.toHaveBeenCalled()
    expect(onReloadDeferred).toHaveBeenCalledTimes(1)
  })

  it('only writes to the store when the owner defers persistence', () => {
    editableType.reloadOnChange.mockReturnValue(false)
    renderEditable({ deferReloadOnChange: true, deferPersistence: true })

    fireEvent.click(screen.getByText('change'))

    expect(setValue).toHaveBeenCalledWith('teaser:1.layout', { type: 'select', data: 'changed' })
    expect(updateValue).not.toHaveBeenCalled()
    expect(updateValueWithReload).not.toHaveBeenCalled()
  })

  it('writes to the store and reports the held-back reload when both reload and persistence are deferred', () => {
    const onReloadDeferred = jest.fn()
    renderEditable({ deferReloadOnChange: true, deferPersistence: true, onReloadDeferred })

    fireEvent.click(screen.getByText('change'))

    expect(setValue).toHaveBeenCalledWith('teaser:1.layout', { type: 'select', data: 'changed' })
    expect(onReloadDeferred).toHaveBeenCalledTimes(1)
    expect(updateValue).not.toHaveBeenCalled()
    expect(updateValueWithReload).not.toHaveBeenCalled()
  })

  it('still saves and reloads immediately for non-deferrable editables even when persistence is deferred', () => {
    editableType.canDeferReloadOnChange.mockReturnValue(false)
    renderEditable({ deferReloadOnChange: true, deferPersistence: true })

    fireEvent.click(screen.getByText('change'))

    expect(updateValueWithReload).toHaveBeenCalledTimes(1)
    expect(setValue).not.toHaveBeenCalled()
  })

  it('does not report a deferred reload for editables that would not reload anyway', () => {
    editableType.reloadOnChange.mockReturnValue(false)
    const onReloadDeferred = jest.fn()
    renderEditable({ deferReloadOnChange: true, onReloadDeferred })

    fireEvent.click(screen.getByText('change'))

    expect(updateValue).toHaveBeenCalledTimes(1)
    expect(onReloadDeferred).not.toHaveBeenCalled()
  })

  it('does not report a deferred reload when the value did not actually change', () => {
    const onReloadDeferred = jest.fn()
    renderEditable({ deferReloadOnChange: true, deferPersistence: true, onReloadDeferred })

    fireEvent.click(screen.getByText('keep'))

    expect(onReloadDeferred).not.toHaveBeenCalled()
    expect(updateValueWithReload).not.toHaveBeenCalled()
    expect(setValue).toHaveBeenCalledWith('teaser:1.layout', { type: 'select', data: 'initial' })
  })

  it('defers the reload without a listener for held-back reloads', () => {
    renderEditable({ deferReloadOnChange: true })

    expect(() => { fireEvent.click(screen.getByText('change')) }).not.toThrow()
    expect(updateValue).toHaveBeenCalledWith('teaser:1.layout', { type: 'select', data: 'changed' })
    expect(updateValueWithReload).not.toHaveBeenCalled()
  })

  it('lets the editable type decide about the deferral based on its definition', () => {
    renderEditable({ deferReloadOnChange: true })

    fireEvent.click(screen.getByText('change'))

    expect(editableType.canDeferReloadOnChange).toHaveBeenCalledWith(expect.objectContaining({ name: 'teaser:1.layout', type: 'select' }))
  })

  it('does not ask the editable type about the deferral when nothing defers the reload', () => {
    renderEditable()

    fireEvent.click(screen.getByText('change'))

    expect(editableType.canDeferReloadOnChange).not.toHaveBeenCalled()
  })

  it('persists through the regular update outside a deferring owner', () => {
    editableType.reloadOnChange.mockReturnValue(false)
    renderEditable()

    fireEvent.click(screen.getByText('change'))

    expect(updateValue).toHaveBeenCalledWith('teaser:1.layout', { type: 'select', data: 'changed' })
    expect(setValue).not.toHaveBeenCalled()
    expect(updateValueWithReload).not.toHaveBeenCalled()
  })
})
