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
import { IconButton } from '@sdk/components'
import { type AreaEditableConfig, type AreaEditableValue } from '../../dynamic-type-document-editable-area'
import { EditableDialog } from '@Pimcore/modules/document/editor/shared-tab-manager/tabs/edit/components/editables-dialog/editable-dialog'
import { useDocumentEditor } from '@Pimcore/modules/document/editor/shared-tab-manager/tabs/edit/hooks/use-document-editor'

export interface AreaEditableProps {
  config?: AreaEditableConfig
  containerRef?: React.RefObject<HTMLDivElement>
  disabled?: boolean
  editableName: string
  onChange?: (value: AreaEditableValue) => void
  value?: AreaEditableValue
}

interface DialogConfig {
  id: string
  width?: number
  height?: number
  items: any
  reloadOnClose?: boolean
}

export const AreaEditable = ({
  config,
  containerRef,
  disabled,
  editableName,
  onChange,
  value
}: AreaEditableProps): React.JSX.Element => {
  const [dialogVisible, setDialogVisible] = useState(false)
  const [dialogConfig, setDialogConfig] = useState<DialogConfig | null>(null)
  const [editButtonContainer, setEditButtonContainer] = useState<HTMLElement | null>(null)
  const initialized = useRef(false)
  const { triggerSaveAndReload } = useDocumentEditor()

  const getEditableDefinitions = (): any[] => {
    try {
      const iframeWindow = window as any
      return iframeWindow.editableDefinitions ?? []
    } catch (error) {
      console.warn('Could not get editable definitions from iframe window:', error)
      return []
    }
  }

  useEffect(() => {
    if (!initialized.current && !isNil(containerRef?.current)) {
      initializeAreaDialog()
      initialized.current = true
    }
  }, [containerRef, editableName])

  /**
   * Initialize area dialog functionality for this specific area
   * Uses the same approach as the old UI: find dialog area by data-name within this editable's element
   */
  const initializeAreaDialog = (): void => {
    if (isNil(containerRef?.current)) return

    const containerElement = containerRef.current
    const dialogBoxDiv: HTMLElement | null = containerElement.querySelector(`.pimcore_area_dialog[data-name="${editableName}"]`)!

    if (!isNil(dialogBoxDiv)) {
      const dialogId = dialogBoxDiv.getAttribute('data-dialog-id') ?? editableName
      const configElement = document.getElementById(`dialogBoxConfig-${dialogId}`)

      if (!isNil(configElement)) {
        try {
          const configData: DialogConfig = JSON.parse(configElement.innerHTML.trim())
          setDialogConfig(configData)
          createEditButtonContainer(dialogBoxDiv)
        } catch (error) {
          console.warn(`Failed to parse dialog config for ${dialogId}:`, error)
        }
      }
    } else {
      const fallbackDialogBoxDiv: HTMLElement | null = document.querySelector(`.pimcore_area_dialog[data-name="${editableName}"]`)!

      if (!isNil(fallbackDialogBoxDiv)) {
        const configElement = document.getElementById(`dialogBoxConfig-${editableName}`)

        if (!isNil(configElement)) {
          try {
            const configData: DialogConfig = JSON.parse(configElement.innerHTML.trim())
            setDialogConfig(configData)
            createEditButtonContainer(fallbackDialogBoxDiv)
          } catch (error) {
            console.warn(`Failed to parse dialog config for ${editableName}:`, error)
          }
        }
      }
    }
  }

  /**
   * Create edit button container for React portal
   */
  const createEditButtonContainer = (dialogElement: HTMLElement): void => {
    const existingContainer: HTMLElement | null = dialogElement.querySelector('[data-pimcore-edit-button]')
    if (!isNil(existingContainer)) {
      setEditButtonContainer(existingContainer)
      return
    }

    const buttonContainer = document.createElement('div')
    buttonContainer.setAttribute('data-pimcore-edit-button', 'true')
    buttonContainer.style.cssText = `
      display: flex;
      justify-content: flex-end;
      margin-bottom: 8px;
    `

    dialogElement.insertBefore(buttonContainer, dialogElement.firstChild)
    setEditButtonContainer(buttonContainer)
  }

  const openDialog = (): void => {
    setDialogVisible(true)
  }

  const closeDialog = (): void => {
    setDialogVisible(false)

    if (dialogConfig?.reloadOnClose === true) {
      triggerSaveAndReload()
    }
  }

  return (
    <>
      {/* Area editable renders nothing visible - content is managed by DOM templates */}
      <div style={ { display: 'none' } }>
        Area editable: {editableName}
      </div>

      {/* Render edit button via portal when container is available */}
      {!isNil(editButtonContainer) && !isNil(dialogConfig) && createPortal(
        <IconButton
          icon={ { value: 'edit' } }
          onClick={ openDialog }
          size="small"
          title="Edit Content"
          type="primary"
        />,
        editButtonContainer
      )}

      {/* Render dialog when visible */}
      {dialogVisible && !isNil(dialogConfig) && (
        <EditableDialog
          config={ dialogConfig }
          editableDefinitions={ getEditableDefinitions() }
          onClose={ closeDialog }
          visible={ dialogVisible }
        />
      )}
    </>
  )
}
