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
import { AreaEditable } from './area-editable'

const handleReloadOnClose = jest.fn()
const dialogElement = document.createElement('div')

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

jest.mock('@sdk/components', () => ({
  IconButton: ({ onClick }: { onClick: () => void }) => <button onClick={ onClick }>open-dialog</button>
}))

jest.mock('@Pimcore/components/tooltip/tooltip', () => ({
  actionTooltipDelay: 0,
  Tooltip: ({ children }: { children: React.ReactNode }) => <>{children}</>
}))

jest.mock('./area-editable.styles', () => ({
  useStyles: () => ({ styles: { editButtonContainer: 'edit-button-container' } })
}))

jest.mock('../../hooks/use-editable-dialog', () => ({
  useEditableDialog: () => ({
    dialogConfig: { id: 'dialog-1', items: [] },
    editableDefinitions: [{ name: 'teaser', realName: 'teaser', inDialogBox: 'dialog-1' }],
    handleCloseDialog: handleReloadOnClose,
    hasDialog: true,
    dialogElement
  })
}))

jest.mock('@Pimcore/modules/document/editor/shared-tab-manager/tabs/edit/components/editables-dialog/editable-dialog', () => ({
  EditableDialog: ({ onClose, onCancel }: { onClose: () => void, onCancel: () => void }) => (
    <div data-testid="editable-dialog">
      <button onClick={ onClose }>save-and-close</button>
      <button onClick={ onCancel }>cancel</button>
    </div>
  )
}))

describe('AreaEditable', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    // The edit button is portaled into the brick's dialog element, which lives in the page.
    dialogElement.innerHTML = ''
    document.body.appendChild(dialogElement)
    render(<AreaEditable editableName="teaser-area" />)
    fireEvent.click(screen.getByText('open-dialog'))
  })

  it('opens the dialog from the edit button', () => {
    expect(screen.getByTestId('editable-dialog')).toBeInTheDocument()
  })

  it('hides the dialog and triggers the configured reload when it is saved', () => {
    fireEvent.click(screen.getByText('save-and-close'))

    expect(screen.queryByTestId('editable-dialog')).toBeNull()
    expect(handleReloadOnClose).toHaveBeenCalledTimes(1)
  })

  it('only hides the dialog when it is cancelled', () => {
    fireEvent.click(screen.getByText('cancel'))

    expect(screen.queryByTestId('editable-dialog')).toBeNull()
    expect(handleReloadOnClose).not.toHaveBeenCalled()
  })

  it('mounts a fresh dialog when it is reopened after cancelling', () => {
    const firstDialog = screen.getByTestId('editable-dialog')

    fireEvent.click(screen.getByText('cancel'))
    fireEvent.click(screen.getByText('open-dialog'))

    const secondDialog = screen.getByTestId('editable-dialog')

    expect(secondDialog).toBeInTheDocument()
    expect(secondDialog).not.toBe(firstDialog) // a new mount takes a new snapshot of the dialog editables
    expect(handleReloadOnClose).not.toHaveBeenCalled()
  })

  it('can be saved after a cancelled attempt', () => {
    fireEvent.click(screen.getByText('cancel'))
    fireEvent.click(screen.getByText('open-dialog'))
    fireEvent.click(screen.getByText('save-and-close'))

    expect(screen.queryByTestId('editable-dialog')).toBeNull()
    expect(handleReloadOnClose).toHaveBeenCalledTimes(1)
  })
})
