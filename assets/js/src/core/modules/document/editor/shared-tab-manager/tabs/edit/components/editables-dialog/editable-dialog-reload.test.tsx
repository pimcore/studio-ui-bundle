/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useContext } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { type ModalFuncProps } from 'antd'
import { type WindowModal } from '@sdk/components'
import { EditableDialog } from './editable-dialog'
import { RenderEditableOptionsContext } from '../editables-renderer/render-editable-options-context'
import { type AbstractDocumentEditableDefinition } from '@Pimcore/modules/element/dynamic-types/definitions/document/editable/dynamic-type-document-editable-abstract'
import { type DialogConfig } from './types'
import { type ValueType } from '@Pimcore/app/public-api/document-editor-iframe/editable-data/editable-data'

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

jest.mock('@sdk/components', () => ({
  WindowModal: ({ children, onOk, onCancel }: React.ComponentProps<typeof WindowModal>) => (
    <div>
      {children}
      <button onClick={ onOk }>save</button>
      <button onClick={ onCancel }>cancel</button>
    </div>
  ),
  Card: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}))

jest.mock('@Pimcore/app/config/services/service-ids', () => ({
  serviceIds: {
    'DynamicTypes/DocumentEditableRegistry': 'documentEditableRegistry',
    'DynamicTypes/EditableDialogLayoutRegistry': 'editableDialogLayoutRegistry'
  }
}))

jest.mock('@Pimcore/app/depency-injection', () => ({
  useInjection: (id: string) => id === 'documentEditableRegistry'
    ? { hasDynamicType: () => true, getDynamicType: () => ({}) }
    : { hasDynamicType: () => false }
}))

const store: { values: Record<string, ValueType> } = { values: {} }
const setValue = jest.fn((key: string, value: ValueType) => { store.values[key] = value })
const updateValue = jest.fn((key: string, value: ValueType) => { store.values[key] = value })
const updateValueWithReload = jest.fn((key: string, value: ValueType) => { store.values[key] = value })

jest.mock('../../hooks/use-document-editor', () => ({
  useDocumentEditor: () => ({
    getValue: (key: string) => store.values[key],
    getValues: () => ({ ...store.values }),
    getInheritanceState: () => false,
    getPersistenceVersion: () => 0,
    setValue,
    updateValue,
    updateValueWithReload,
    removeValues: jest.fn(),
    setInheritanceState: jest.fn()
  })
}))

const confirm = jest.fn()

jest.mock('@Pimcore/components/modal/hooks/use-studio-modal', () => ({
  useStudioModal: () => ({ modal: { confirm } })
}))

jest.mock('./editable-dialog.styles', () => ({
  useStyles: () => ({ styles: { description: 'description' } })
}))

// Stands in for a reload-on-change editable rendered inside the dialog: it reports the held-back
// reload the way RenderEditable does and writes its new value into the store.
jest.mock('./template-aware-editable', () => ({
  TemplateAwareEditable: () => {
    const { deferReloadOnChange, deferPersistence, onReloadDeferred } = useContext(RenderEditableOptionsContext)

    return (
      <button
        data-defer={ String(deferReloadOnChange) }
        data-defer-persistence={ String(deferPersistence) }
        onClick={ () => {
          onReloadDeferred?.()
          store.values.layout = { type: 'select', data: 'two-columns' }
        } }
      >
        change-with-reload
      </button>
    )
  }
}))

const editableDefinitions = [
  { realName: 'layout', name: 'layout', inDialogBox: 'dialog-1' }
] as unknown as AbstractDocumentEditableDefinition[]

const renderDialog = (reloadOnClose?: boolean): { onClose: jest.Mock, onCancel: jest.Mock } => {
  const config = {
    id: 'dialog-1',
    reloadOnClose,
    items: { items: [{ type: 'select', name: 'layout', label: 'Layout' }] }
  } as unknown as DialogConfig
  const onClose = jest.fn()
  const onCancel = jest.fn()

  render(
    <EditableDialog
      config={ config }
      editableDefinitions={ editableDefinitions }
      onCancel={ onCancel }
      onClose={ onClose }
      visible
    />
  )

  return { onClose, onCancel }
}

const lastConfirmConfig = (): ModalFuncProps => confirm.mock.calls[confirm.mock.calls.length - 1][0] as ModalFuncProps

describe('EditableDialog with reload-on-change editables', () => {
  beforeEach(() => {
    store.values = { layout: { type: 'select', data: 'one-column' } }
    jest.clearAllMocks()
  })

  it('tells its editables to hold back their reload and their persistence', () => {
    renderDialog()

    expect(screen.getByText('change-with-reload').dataset.defer).toBe('true')
    expect(screen.getByText('change-with-reload').dataset.deferPersistence).toBe('true')
  })

  it('persists with the held-back reload when the dialog is saved', () => {
    const { onClose } = renderDialog()

    fireEvent.click(screen.getByText('change-with-reload'))
    fireEvent.click(screen.getByText('save'))

    expect(updateValueWithReload).toHaveBeenCalledTimes(1)
    expect(updateValueWithReload).toHaveBeenCalledWith('layout', { type: 'select', data: 'two-columns' })
    expect(updateValue).not.toHaveBeenCalled()
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('persists without its own reload when the dialog reloads on close anyway', () => {
    const { onClose } = renderDialog(true)

    fireEvent.click(screen.getByText('change-with-reload'))
    fireEvent.click(screen.getByText('save'))

    expect(updateValue).toHaveBeenCalledTimes(1)
    expect(updateValueWithReload).not.toHaveBeenCalled()
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('neither persists nor reloads when the change was reverted before saving', () => {
    const { onClose, onCancel } = renderDialog()

    fireEvent.click(screen.getByText('change-with-reload'))
    store.values.layout = { type: 'select', data: 'one-column' }
    fireEvent.click(screen.getByText('save'))

    expect(updateValue).not.toHaveBeenCalled()
    expect(updateValueWithReload).not.toHaveBeenCalled()
    expect(onClose).not.toHaveBeenCalled()
    expect(onCancel).toHaveBeenCalledTimes(1)
  })

  it('neither persists nor reloads when the change is discarded', () => {
    const { onCancel } = renderDialog()

    fireEvent.click(screen.getByText('change-with-reload'))
    fireEvent.click(screen.getByText('cancel'))
    lastConfirmConfig().onOk?.()

    expect(setValue).toHaveBeenCalledWith('layout', { type: 'select', data: 'one-column' })
    expect(updateValue).not.toHaveBeenCalled()
    expect(updateValueWithReload).not.toHaveBeenCalled()
    expect(onCancel).toHaveBeenCalledTimes(1)
  })

  it('reloads once on save no matter how many reloads were held back', () => {
    const { onClose } = renderDialog()

    fireEvent.click(screen.getByText('change-with-reload'))
    fireEvent.click(screen.getByText('change-with-reload'))
    fireEvent.click(screen.getByText('change-with-reload'))
    fireEvent.click(screen.getByText('save'))

    expect(updateValueWithReload).toHaveBeenCalledTimes(1)
    expect(updateValue).not.toHaveBeenCalled()
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('keeps the held-back reload while the discard confirmation is declined and reloads on a later save', () => {
    const { onClose, onCancel } = renderDialog()

    fireEvent.click(screen.getByText('change-with-reload'))
    fireEvent.click(screen.getByText('cancel'))
    lastConfirmConfig().onCancel?.()
    fireEvent.click(screen.getByText('save'))

    expect(updateValueWithReload).toHaveBeenCalledTimes(1)
    expect(onClose).toHaveBeenCalledTimes(1)
    expect(onCancel).not.toHaveBeenCalled()
  })
})
