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
  isEmpty: () => false,
  getEditableDataComponent: () => <FakeEditable />
}

const FakeEditable = ({ onChange }: { onChange?: (value: string) => void }): React.JSX.Element => (
  <button onClick={ () => onChange?.('changed') }>change</button>
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

const updateValue = jest.fn()
const updateValueWithReload = jest.fn()

jest.mock('../../hooks/use-document-editor', () => ({
  useDocumentEditor: () => ({
    updateValue,
    updateValueWithReload,
    getValue: () => ({ type: 'select', data: 'initial' }),
    getInheritanceState: () => false,
    setInheritanceState: jest.fn()
  })
}))

const definition = { id: 'sel', name: 'teaser:1.layout', type: 'select', config: {} } as unknown as AbstractDocumentEditableDefinition

const renderEditable = (options?: { deferReloadOnChange: boolean, onReloadDeferred?: () => void }): void => {
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

  it('does not report a deferred reload for editables that would not reload anyway', () => {
    editableType.reloadOnChange.mockReturnValue(false)
    const onReloadDeferred = jest.fn()
    renderEditable({ deferReloadOnChange: true, onReloadDeferred })

    fireEvent.click(screen.getByText('change'))

    expect(updateValue).toHaveBeenCalledTimes(1)
    expect(onReloadDeferred).not.toHaveBeenCalled()
  })
})
