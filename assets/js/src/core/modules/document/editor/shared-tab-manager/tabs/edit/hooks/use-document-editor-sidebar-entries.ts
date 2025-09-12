/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useContext, useMemo } from 'react'
import { useAppSelector } from '@Pimcore/app/store'
import { DocumentContext } from '@Pimcore/modules/document/document-provider'
import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { type DocumentEditorSidebarManager } from '../sidebar/sidebar-manager'
import { type ISidebarEntry } from '@Pimcore/modules/element/sidebar/sidebar-manager'
import { type IDocumentContext } from '@Pimcore/modules/document/document-provider'
import { selectDocumentEditorState } from '@Pimcore/modules/document/document-editor-slice'

/**
 * Hook that provides reactive sidebar entries for the document editor.
 * This hook automatically subscribes to document editor state changes
 * and re-evaluates sidebar visibility when any relevant state changes.
 */
export const useDocumentEditorSidebarEntries = (): Array<ISidebarEntry<IDocumentContext>> => {
  const documentContext = useContext(DocumentContext)

  const documentEditorState = useAppSelector(selectDocumentEditorState)

  const sidebarManager = container.get<DocumentEditorSidebarManager>(serviceIds['Document/Editor/Edit/SidebarManager'])

  return useMemo(() => {
    return sidebarManager.getVisibleEntries(documentContext)
  }, [sidebarManager, documentContext, documentEditorState])
}
