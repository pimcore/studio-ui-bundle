/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useMemo, useCallback } from 'react'
import { isNil } from 'lodash'
import { useDocumentEditor } from '@Pimcore/modules/document/editor/shared-tab-manager/tabs/edit/hooks/use-document-editor'

interface DialogConfig {
  id: string
  width?: number
  height?: number
  items: any
  reloadOnClose?: boolean
}

export interface UseEditableDialogParams {
  element: HTMLElement
  dialogSelector: string
  editableName: string
  dynamicEditableDefinitions?: any[]
}

export interface UseEditableDialogReturn {
  dialogConfig: DialogConfig | null
  editableDefinitions: any[]
  handleCloseDialog: () => void
  hasDialog: boolean
  dialogElement: HTMLElement | null
}

export const useEditableDialog = ({
  element,
  dialogSelector,
  editableName,
  dynamicEditableDefinitions = []
}: UseEditableDialogParams): UseEditableDialogReturn => {
  const { triggerSaveAndReload } = useDocumentEditor()

  const dialogData = useMemo(() => {
    const dialogBoxDiv: HTMLElement | null = element.querySelector(`${dialogSelector}[data-name="${editableName}"]`)

    if (!isNil(dialogBoxDiv)) {
      const dialogId = dialogBoxDiv.getAttribute('data-dialog-id') ?? editableName
      const configElement = document.getElementById(`dialogBoxConfig-${dialogId}`)

      if (!isNil(configElement)) {
        try {
          const config = JSON.parse(configElement.innerHTML.trim()) as DialogConfig
          return { config, element: dialogBoxDiv }
        } catch (error) {
          console.warn(`Failed to parse dialog config for ${dialogId}:`, error)
        }
      }
    }
    return { config: null, element: null }
  }, [element, dialogSelector, editableName])

  const dialogConfig = dialogData.config
  const dialogElement = dialogData.element

  const editableDefinitions = useMemo(() => {
    let allDefinitions: any[] = []

    try {
      const iframeWindow = window as any
      const globalDefinitions = iframeWindow.editableDefinitions ?? []
      allDefinitions = [...globalDefinitions]
    } catch (error) {
      console.warn('Could not get editable definitions from iframe window:', error)
    }

    if (dynamicEditableDefinitions.length > 0) {
      allDefinitions = [...allDefinitions, ...dynamicEditableDefinitions]
    }

    return allDefinitions.filter((def: any) =>
      def.inDialogBox === dialogConfig?.id
    )
  }, [dynamicEditableDefinitions, dialogConfig?.id])

  const handleCloseDialog = useCallback(() => {
    if (dialogConfig?.reloadOnClose === true) {
      triggerSaveAndReload()
    }
  }, [dialogConfig?.reloadOnClose, triggerSaveAndReload])

  const hasDialog = !isNil(dialogConfig)

  return {
    dialogConfig,
    editableDefinitions,
    handleCloseDialog,
    hasDialog,
    dialogElement
  }
}
