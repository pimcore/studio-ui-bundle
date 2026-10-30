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
import { type ModalFuncProps } from 'antd'
import { type WindowModal } from '@sdk/components'
import { EditableDialog } from './editable-dialog'
import { type AbstractDocumentEditableDefinition } from '@Pimcore/modules/element/dynamic-types/definitions/document/editable/dynamic-type-document-editable-abstract'
import { type DialogConfig } from './types'
import { type ValueType } from '@Pimcore/app/public-api/document-editor-iframe/editable-data/editable-data'

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

jest.mock('@sdk/components', () => ({
  WindowModal: ({ children, onOk, onCancel, okText, cancelText, closable, keyboard, cancelButtonProps }: React.ComponentProps<typeof WindowModal>) => (
    <div
      data-cancel-hidden={ String(cancelButtonProps?.style?.display === 'none') }
      data-closable={ String(closable) }
      data-keyboard={ String(keyboard) }
      data-testid="window-modal"
    >
      {children}
      <button onClick={ onOk }>{okText}</button>
      <button onClick={ onCancel }>{cancelText}</button>
    </div>
  ),
  Card: ({ title, children }: { title?: React.ReactNode, children: React.ReactNode }) => <div><div>{title}</div>{children}</div>
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

const store: { values: Record<string, ValueType>, inheritance: Record<string, boolean> } = { values: {}, inheritance: {} }
const setValue = jest.fn((key: string, value: ValueType) => { store.values[key] = value })
const updateValue = jest.fn((key: string, value: ValueType) => { store.values[key] = value })
const removeValues = jest.fn((keys: string[]) => { keys.forEach(key => { delete store.values[key] }) }) // eslint-disable-line @typescript-eslint/no-dynamic-delete
const setInheritanceState = jest.fn((key: string, inherited: boolean) => { store.inheritance[key] = inherited })

jest.mock('../../hooks/use-document-editor', () => ({
  useDocumentEditor: () => ({
    getValue: (key: string) => store.values[key],
    getValues: () => ({ ...store.values }),
    getInheritanceState: (key: string) => store.inheritance[key] ?? false,
    setValue,
    updateValue,
    updateValueWithReload: jest.fn(),
    removeValues,
    setInheritanceState
  })
}))

const confirm = jest.fn()

jest.mock('@Pimcore/components/modal/hooks/use-studio-modal', () => ({
  useStudioModal: () => ({ modal: { confirm } })
}))

jest.mock('./editable-dialog.styles', () => ({
  useStyles: () => ({ styles: { description: 'editable-dialog-description' } })
}))

jest.mock('./template-aware-editable', () => ({
  TemplateAwareEditable: () => <div data-testid="template-aware-editable" />
}))

const editableDefinitions = [
  { realName: 'teaser', name: 'teaser', inDialogBox: 'dialog-1' }
] as unknown as AbstractDocumentEditableDefinition[]

const input = (data: unknown): ValueType => ({ type: 'input', data })

const renderDialog = (description?: string | null): { onClose: jest.Mock, onCancel: jest.Mock } => {
  const config = {
    id: 'dialog-1',
    items: { items: [{ type: 'input', name: 'teaser', label: 'Teaser', description }] }
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

const clickSave = (): void => { fireEvent.click(screen.getByText('save')) }
const clickCancel = (): void => { fireEvent.click(screen.getByText('cancel')) }
const lastConfirmConfig = (): ModalFuncProps => confirm.mock.calls[confirm.mock.calls.length - 1][0] as ModalFuncProps

describe('EditableDialog', () => {
  beforeEach(() => {
    store.values = { teaser: input('Original'), pageTitle: input('Page') }
    store.inheritance = { teaser: false, pageTitle: false }
    jest.clearAllMocks()
  })

  describe('description', () => {
    it('renders the dialog description of an editable as plain text', () => {
      renderDialog('First line <b>not bold</b>\nSecond line')

      const description = screen.getByText(/First line/)

      expect(description).toHaveClass('editable-dialog-description')
      expect(description.textContent).toBe('First line <b>not bold</b>\nSecond line')
      expect(description.querySelector('b')).toBeNull()
      expect(screen.getByTestId('template-aware-editable')).toBeInTheDocument()
    })

    it('renders no description element when none is configured', () => {
      renderDialog(null)

      expect(screen.getByText('Teaser')).toBeInTheDocument()
      expect(screen.getByTestId('template-aware-editable')).toBeInTheDocument()
      expect(document.querySelector('.editable-dialog-description')).toBeNull()
    })
  })

  describe('dismissing', () => {
    it('offers the close icon, the cancel button and the Esc key', () => {
      renderDialog()

      const modal = screen.getByTestId('window-modal')

      expect(modal.dataset.closable).not.toBe('false')
      expect(modal.dataset.keyboard).not.toBe('false')
      expect(modal.dataset.cancelHidden).toBe('false')
      expect(screen.getByText('cancel')).toBeInTheDocument()
      expect(screen.getByText('save')).toBeInTheDocument()
    })

    it('closes without a prompt when nothing was changed', () => {
      const { onCancel, onClose } = renderDialog()

      clickCancel()

      expect(confirm).not.toHaveBeenCalled()
      expect(onCancel).toHaveBeenCalledTimes(1)
      expect(onClose).not.toHaveBeenCalled()
    })

    it('asks for confirmation when a dialog editable was changed and keeps the dialog open meanwhile', () => {
      const { onCancel, onClose } = renderDialog()

      store.values.teaser = input('Changed')
      clickCancel()

      expect(confirm).toHaveBeenCalledTimes(1)
      expect(lastConfirmConfig()).toMatchObject({
        title: 'unsaved-changes.title',
        content: 'unsaved-changes.close-message',
        okText: 'discard-changes',
        cancelText: 'cancel'
      })
      expect(onCancel).not.toHaveBeenCalled()
      expect(onClose).not.toHaveBeenCalled()
    })

    it('restores the dialog editables and closes when the changes are discarded', () => {
      const { onCancel, onClose } = renderDialog()

      store.values.teaser = input('Changed')
      clickCancel()
      lastConfirmConfig().onOk?.()

      expect(setValue).toHaveBeenCalledWith('teaser', input('Original'))
      expect(updateValue).not.toHaveBeenCalled() // nothing was persisted, so nothing is sent to the parent window
      expect(onCancel).toHaveBeenCalledTimes(1)
      expect(onClose).not.toHaveBeenCalled()
    })

    it('keeps the changes and the dialog when the confirmation is declined', () => {
      const { onCancel } = renderDialog()

      store.values.teaser = input('Changed')
      clickCancel()
      lastConfirmConfig().onCancel?.()

      expect(updateValue).not.toHaveBeenCalled()
      expect(onCancel).not.toHaveBeenCalled()
      expect(store.values.teaser).toEqual(input('Changed'))
    })

    it('asks for confirmation when only the inheritance of a dialog editable was overwritten', () => {
      store.inheritance.teaser = true
      const { onCancel } = renderDialog()

      store.inheritance.teaser = false
      clickCancel()

      expect(confirm).toHaveBeenCalledTimes(1)
      expect(onCancel).not.toHaveBeenCalled()

      lastConfirmConfig().onOk?.()

      expect(setInheritanceState).toHaveBeenCalledWith('teaser', true)
      expect(onCancel).toHaveBeenCalledTimes(1)
    })

    it('ignores editables outside the dialog that changed while it was open', () => {
      const { onCancel } = renderDialog()

      store.values.pageTitle = input('Edited on the page')
      clickCancel()

      expect(confirm).not.toHaveBeenCalled()
      expect(onCancel).toHaveBeenCalledTimes(1)
      expect(updateValue).not.toHaveBeenCalled()
      expect(store.values.pageTitle).toEqual(input('Edited on the page'))
    })

    it('opens a single confirmation while one is pending and asks again once it was declined', () => {
      renderDialog()
      store.values.teaser = input('Changed')

      clickCancel()
      clickCancel()
      expect(confirm).toHaveBeenCalledTimes(1)

      lastConfirmConfig().onCancel?.()
      clickCancel()
      expect(confirm).toHaveBeenCalledTimes(2)
    })
  })

  describe('saving', () => {
    it('closes without saving when nothing was changed', () => {
      const { onCancel, onClose } = renderDialog()

      clickSave()

      expect(onCancel).toHaveBeenCalledTimes(1)
      expect(onClose).not.toHaveBeenCalled()
      expect(confirm).not.toHaveBeenCalled()
    })

    it('saves when a dialog editable was changed', () => {
      const { onCancel, onClose } = renderDialog()

      store.values.teaser = input('Changed')
      clickSave()

      expect(onClose).toHaveBeenCalledTimes(1)
      expect(onCancel).not.toHaveBeenCalled()
      expect(updateValue).toHaveBeenCalledTimes(1) // values are in the store already; Save notifies the parent once
      expect(updateValue).toHaveBeenCalledWith('teaser', input('Changed'))
      expect(store.values.teaser).toEqual(input('Changed'))
    })

    it('treats a value changed back to its original as unchanged', () => {
      const { onCancel, onClose } = renderDialog()

      store.values.teaser = input('Changed')
      store.values.teaser = input('Original')
      clickSave()

      expect(onCancel).toHaveBeenCalledTimes(1)
      expect(onClose).not.toHaveBeenCalled()
    })

    it('saves when only the inheritance of a dialog editable was overwritten', () => {
      store.inheritance.teaser = true
      const { onCancel, onClose } = renderDialog()

      store.inheritance.teaser = false
      clickSave()

      expect(onClose).toHaveBeenCalledTimes(1)
      expect(onCancel).not.toHaveBeenCalled()
    })
  })
})
