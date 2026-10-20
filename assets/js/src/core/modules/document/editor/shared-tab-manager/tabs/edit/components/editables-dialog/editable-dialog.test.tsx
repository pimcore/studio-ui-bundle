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
import { EditableDialog } from './editable-dialog'
import { type AbstractDocumentEditableDefinition } from '@Pimcore/modules/element/dynamic-types/definitions/document/editable/dynamic-type-document-editable-abstract'
import { type DialogConfig } from './types'

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

jest.mock('@sdk/components', () => ({
  WindowModal: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Card: ({ title, children }: { title?: React.ReactNode, children: React.ReactNode }) => (
    <div>
      <div>{title}</div>
      {children}
    </div>
  )
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

jest.mock('../../hooks/use-document-editor', () => ({
  useDocumentEditor: () => ({ getValue: () => null })
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

const renderDialog = (description?: string | null): HTMLElement => {
  const config: DialogConfig = {
    id: 'dialog-1',
    items: { items: [{ type: 'input', name: 'teaser', label: 'Teaser', description }] }
  } as unknown as DialogConfig

  const { container } = render(
    <EditableDialog
      config={ config }
      editableDefinitions={ editableDefinitions }
      onClose={ jest.fn() }
      visible
    />
  )

  return container
}

describe('EditableDialog', () => {
  it('renders the dialog description of an editable as plain text', () => {
    renderDialog('First line <b>not bold</b>\nSecond line')

    const description = screen.getByText(/First line/)

    expect(description).toHaveClass('editable-dialog-description')
    expect(description.textContent).toBe('First line <b>not bold</b>\nSecond line')
    expect(description.querySelector('b')).toBeNull()
    expect(screen.getByTestId('template-aware-editable')).toBeInTheDocument()
  })

  it('renders no description element when none is configured', () => {
    const container = renderDialog(null)

    expect(screen.getByText('Teaser')).toBeInTheDocument()
    expect(screen.getByTestId('template-aware-editable')).toBeInTheDocument()
    expect(container.querySelector('.editable-dialog-description')).toBeNull()
  })
})
