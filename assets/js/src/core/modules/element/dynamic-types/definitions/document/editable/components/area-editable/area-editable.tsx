/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect, useState, useRef } from 'react'
import { createPortal } from 'react-dom'
import { isNil } from 'lodash'
import { useTranslation } from 'react-i18next'
import { IconButton } from '@sdk/components'
import { Tooltip } from '@Pimcore/components/tooltip/tooltip'
import { type AreaEditableConfig } from '../../types/dynamic-type-document-editable-area'
import { EditableDialog } from '@Pimcore/modules/document/editor/shared-tab-manager/tabs/edit/components/editables-dialog/editable-dialog'
import { useEditableDialog } from '../../hooks/use-editable-dialog'
import { useStyles } from './area-editable.styles'

export interface AreaEditableProps {
  config?: AreaEditableConfig
  containerRef?: React.RefObject<HTMLDivElement>
  disabled?: boolean
  editableName: string
}

export const AreaEditable = ({
  config,
  containerRef,
  disabled,
  editableName
}: AreaEditableProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyles()
  const [dialogVisible, setDialogVisible] = useState(false)
  const [editButtonContainer, setEditButtonContainer] = useState<HTMLElement | null>(null)
  const initialized = useRef(false)

  const {
    dialogConfig,
    editableDefinitions,
    handleCloseDialog: handleReloadOnClose,
    hasDialog,
    dialogElement
  } = useEditableDialog({
    element: containerRef?.current ?? document.createElement('div'),
    dialogSelector: '.pimcore_area_dialog',
    editableName
  })

  useEffect(() => {
    if (!initialized.current && !isNil(dialogElement)) {
      createEditButtonContainer(dialogElement)
      initialized.current = true
    }
  }, [dialogElement])

  const createEditButtonContainer = (dialogElement: HTMLElement): void => {
    const existingContainer: HTMLElement | null = dialogElement.querySelector('[data-pimcore-edit-button]')
    if (!isNil(existingContainer)) {
      setEditButtonContainer(existingContainer)
      return
    }

    const buttonContainer = document.createElement('div')
    buttonContainer.setAttribute('data-pimcore-edit-button', 'true')
    buttonContainer.className = styles.editButtonContainer

    dialogElement.insertBefore(buttonContainer, dialogElement.firstChild)
    setEditButtonContainer(buttonContainer)
  }

  const openDialog = (): void => {
    setDialogVisible(true)
  }

  const closeDialog = (): void => {
    setDialogVisible(false)
    handleReloadOnClose()
  }

  return (
    <>
      {!isNil(editButtonContainer) && hasDialog && createPortal(
        <Tooltip title={ t('area-settings') }>
          <IconButton
            icon={ { value: 'edit' } }
            onClick={ openDialog }
            type="default"
          />
        </Tooltip>,
        editButtonContainer
      )}

      {dialogVisible && !isNil(dialogConfig) && (
        <EditableDialog
          config={ dialogConfig }
          editableDefinitions={ editableDefinitions }
          onClose={ closeDialog }
          visible={ dialogVisible }
        />
      )}
    </>
  )
}
