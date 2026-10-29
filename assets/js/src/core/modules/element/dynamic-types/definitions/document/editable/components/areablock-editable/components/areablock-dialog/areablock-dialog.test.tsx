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
import { AreablockDialog } from './areablock-dialog'

const handleReloadOnClose = jest.fn()

jest.mock('../../../../hooks/use-editable-dialog', () => ({
  useEditableDialog: () => ({
    dialogConfig: { id: 'dialog-1', items: [] },
    editableDefinitions: [{ name: 'teaser', realName: 'teaser', inDialogBox: 'dialog-1' }],
    handleCloseDialog: handleReloadOnClose,
    hasDialog: true,
    dialogElement: null
  })
}))

jest.mock('@Pimcore/modules/document/editor/shared-tab-manager/tabs/edit/components/editables-dialog/editable-dialog', () => ({
  EditableDialog: ({ onClose, onCancel }: { onClose: () => void, onCancel: () => void }) => (
    <div>
      <button onClick={ onClose }>save-and-close</button>
      <button onClick={ onCancel }>cancel</button>
    </div>
  )
}))

describe('AreablockDialog', () => {
  const onClose = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    render(
      <AreablockDialog
        areablockName="content"
        element={ document.createElement('div') }
        isOpen
        onClose={ onClose }
      />
    )
  })

  it('closes and triggers the configured reload when the dialog is saved', () => {
    fireEvent.click(screen.getByText('save-and-close'))

    expect(onClose).toHaveBeenCalledTimes(1)
    expect(handleReloadOnClose).toHaveBeenCalledTimes(1)
  })

  it('only closes when the dialog is cancelled', () => {
    fireEvent.click(screen.getByText('cancel'))

    expect(onClose).toHaveBeenCalledTimes(1)
    expect(handleReloadOnClose).not.toHaveBeenCalled()
  })
})
