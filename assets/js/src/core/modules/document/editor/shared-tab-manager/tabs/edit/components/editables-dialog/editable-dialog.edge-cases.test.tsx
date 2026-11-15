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
  WindowModal: ({ children, onOk, onCancel, okText, cancelText }: React.ComponentProps<typeof WindowModal>) => (
    <div>
      {children}
      <button onClick={ onOk }>{okText}</button>
      <button onClick={ onCancel }>{cancelText}</button>
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

const store: { values: Record<string, ValueType>, inheritance: Record<string, boolean> } = { values: {}, inheritance: {} }
const setValue = jest.fn((key: string, value: ValueType) => { store.values[key] = value })
const updateValue = jest.fn((key: string, value: ValueType) => { store.values[key] = value })
const updateValueWithReload = jest.fn((key: string, value: ValueType) => { store.values[key] = value })
const removeValues = jest.fn((keys: string[]) => { keys.forEach(key => { delete store.values[key] }) }) // eslint-disable-line @typescript-eslint/no-dynamic-delete
const setInheritanceState = jest.fn((key: string, inherited: boolean) => { store.inheritance[key] = inherited })
let persistenceVersion = 0

jest.mock('../../hooks/use-document-editor', () => ({
  useDocumentEditor: () => ({
    getValue: (key: string) => store.values[key],
    getValues: () => ({ ...store.values }),
    getInheritanceState: (key: string) => store.inheritance[key] ?? false,
    getPersistenceVersion: () => persistenceVersion,
    setValue,
    updateValue,
    updateValueWithReload,
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

const input = (data: unknown): ValueType => ({ type: 'input', data })

interface RenderOptions {
  reloadOnClose?: boolean
  itemType?: string
  editableNames?: string[]
}

const renderDialog = ({ reloadOnClose, itemType = 'input', editableNames = ['teaser'] }: RenderOptions = {}): { onClose: jest.Mock, onCancel: jest.Mock } => {
  const config = {
    id: 'dialog-1',
    reloadOnClose,
    items: { items: editableNames.map(name => ({ type: itemType, name, label: name })) }
  } as unknown as DialogConfig
  const editableDefinitions = editableNames.map(name => ({ realName: name, name, inDialogBox: 'dialog-1' })) as unknown as AbstractDocumentEditableDefinition[]
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

describe('EditableDialog edge cases', () => {
  beforeEach(() => {
    store.values = { teaser: input('Original'), pageTitle: input('Page') }
    store.inheritance = { teaser: false, pageTitle: false }
    persistenceVersion = 0
    jest.clearAllMocks()
  })

  describe('values that appear or disappear', () => {
    it('saves a value that was created in the dialog', () => {
      delete store.values.teaser
      const { onCancel, onClose } = renderDialog()

      store.values.teaser = input('Created')
      clickSave()

      expect(updateValue).toHaveBeenCalledTimes(1)
      expect(updateValue).toHaveBeenCalledWith('teaser', input('Created'))
      expect(onClose).toHaveBeenCalledTimes(1)
      expect(onCancel).not.toHaveBeenCalled()
    })

    it('closes without saving when the dialog editable has no value before and after', () => {
      delete store.values.teaser
      const { onCancel, onClose } = renderDialog()

      clickSave()

      expect(updateValue).not.toHaveBeenCalled()
      expect(onCancel).toHaveBeenCalledTimes(1)
      expect(onClose).not.toHaveBeenCalled()
    })

    it('removes a value created in the dialog again when the changes are discarded', () => {
      delete store.values.teaser
      const { onCancel } = renderDialog()

      store.values.teaser = input('Created')
      clickCancel()
      lastConfirmConfig().onOk?.()

      expect(removeValues).toHaveBeenCalledWith(['teaser'])
      expect(store.values.teaser).toBeUndefined()
      expect(updateValue).not.toHaveBeenCalled()
      expect(onCancel).toHaveBeenCalledTimes(1)
    })
  })

  describe('reload on close', () => {
    it('leaves the reload to its owner when a changed dialog is saved', () => {
      const { onCancel, onClose } = renderDialog({ reloadOnClose: true })

      store.values.teaser = input('Changed')
      clickSave()

      expect(updateValue).toHaveBeenCalledTimes(1)
      expect(updateValueWithReload).not.toHaveBeenCalled()
      expect(onClose).toHaveBeenCalledTimes(1) // the owner runs the configured reload from onClose
      expect(onCancel).not.toHaveBeenCalled()
    })

    it('does not reload when the dialog is saved unchanged', () => {
      const { onCancel, onClose } = renderDialog({ reloadOnClose: true })

      clickSave()

      expect(onCancel).toHaveBeenCalledTimes(1)
      expect(onClose).not.toHaveBeenCalled()
    })

    it('does not reload when the changes are discarded', () => {
      const { onCancel, onClose } = renderDialog({ reloadOnClose: true })

      store.values.teaser = input('Changed')
      clickCancel()
      lastConfirmConfig().onOk?.()

      expect(onCancel).toHaveBeenCalledTimes(1)
      expect(onClose).not.toHaveBeenCalled()
    })
  })

  describe('edits on the page behind the dialog', () => {
    it('does not save page edits together with an unchanged dialog', () => {
      const { onCancel, onClose } = renderDialog()

      store.values.pageTitle = input('Edited on the page')
      clickSave()

      expect(updateValue).not.toHaveBeenCalled()
      expect(onCancel).toHaveBeenCalledTimes(1)
      expect(onClose).not.toHaveBeenCalled()
    })

    it('persists the restored dialog values when a page edit saved the document meanwhile', () => {
      const { onCancel } = renderDialog()

      store.values.teaser = input('Changed')
      persistenceVersion++ // the page edit autosaved the whole store, including the dialog's draft value
      clickCancel()
      lastConfirmConfig().onOk?.()

      expect(setValue).toHaveBeenCalledWith('teaser', input('Original'))
      expect(updateValue).toHaveBeenCalledTimes(1)
      expect(updateValue).toHaveBeenCalledWith('teaser', input('Original'))
      expect(onCancel).toHaveBeenCalledTimes(1)
    })

    it('does not count a save that happened before the dialog was opened', () => {
      persistenceVersion = 7
      const { onCancel } = renderDialog()

      store.values.teaser = input('Changed')
      clickCancel()
      lastConfirmConfig().onOk?.()

      expect(updateValue).not.toHaveBeenCalled()
      expect(onCancel).toHaveBeenCalledTimes(1)
    })
  })

  it('saves several changed dialog editables with a single notification', () => {
    store.values.subline = input('Sub')
    const { onClose } = renderDialog({ editableNames: ['teaser', 'subline'] })

    store.values.teaser = input('Changed')
    store.values.subline = input('Sub changed')
    clickSave()

    expect(updateValue).toHaveBeenCalledTimes(1)
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  describe('child values of a dialog block', () => {
    beforeEach(() => {
      store.values.teaser = { type: 'block', data: ['1'] }
      store.values['teaser:1.headline'] = input('Row 1')
    })

    it('asks for confirmation when only a row value changed', () => {
      const { onCancel } = renderDialog({ itemType: 'block' })

      store.values['teaser:1.headline'] = input('Row 1 changed')
      clickCancel()

      expect(confirm).toHaveBeenCalledTimes(1)
      expect(onCancel).not.toHaveBeenCalled()
    })

    it('rolls back a row added in the dialog when the changes are discarded', () => {
      const { onCancel } = renderDialog({ itemType: 'block' })

      store.values.teaser = { type: 'block', data: ['1', '2'] }
      store.values['teaser:2.headline'] = input('Row 2')
      clickCancel()
      lastConfirmConfig().onOk?.()

      expect(removeValues).toHaveBeenCalledWith(['teaser:2.headline'])
      expect(setValue).toHaveBeenCalledWith('teaser', { type: 'block', data: ['1'] })
      expect(store.values['teaser:2.headline']).toBeUndefined()
      expect(updateValue).not.toHaveBeenCalled()
      expect(onCancel).toHaveBeenCalledTimes(1)
    })

    it('saves a row added in the dialog with a single notification', () => {
      const { onClose } = renderDialog({ itemType: 'block' })

      store.values.teaser = { type: 'block', data: ['1', '2'] }
      store.values['teaser:2.headline'] = input('Row 2')
      clickSave()

      expect(updateValue).toHaveBeenCalledTimes(1)
      expect(store.values['teaser:2.headline']).toEqual(input('Row 2'))
      expect(onClose).toHaveBeenCalledTimes(1)
    })
  })
})
