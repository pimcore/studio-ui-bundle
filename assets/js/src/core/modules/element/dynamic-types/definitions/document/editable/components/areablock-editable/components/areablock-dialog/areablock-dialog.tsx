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
import { EditableDialog } from '@Pimcore/modules/document/editor/shared-tab-manager/tabs/edit/components/editables-dialog/editable-dialog'
import { useEditableDialog } from '../../../../hooks/use-editable-dialog'

export interface AreablockDialogProps {
  element: HTMLElement
  areablockName: string
  editableDefinitions?: any[]
  isOpen?: boolean
  onClose?: () => void
}

export const AreablockDialog = ({
  element,
  areablockName,
  editableDefinitions = [],
  isOpen = false,
  onClose
}: AreablockDialogProps): React.JSX.Element | null => {
  const {
    dialogConfig,
    editableDefinitions: mergedEditableDefinitions,
    handleCloseDialog: handleReloadOnClose,
    hasDialog
  } = useEditableDialog({
    element,
    dialogSelector: '.pimcore_block_dialog',
    editableName: areablockName,
    dynamicEditableDefinitions: editableDefinitions
  })

  const handleCloseDialog = (): void => {
    onClose?.()
    handleReloadOnClose()
  }

  if (!hasDialog) {
    return null
  }

  if (!isOpen || mergedEditableDefinitions.length === 0) {
    return null
  }

  return (
    <EditableDialog
      config={ dialogConfig! }
      editableDefinitions={ mergedEditableDefinitions }
      onClose={ handleCloseDialog }
      visible={ isOpen }
    />
  )
}
