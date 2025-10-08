/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useContext } from 'react'
import { useElementContext } from '@Pimcore/modules/element/hooks/use-element-context'
import { DocumentPreview } from './document-preview'
import { ContentLayout } from '@Pimcore/components/content-layout/content-layout'
import { Sidebar } from '@Pimcore/components/sidebar/sidebar'
import { DocumentContext } from '@Pimcore/modules/document/document-provider'
import { useDocumentDraft } from '@Pimcore/modules/document/hooks/use-document-draft'
import { getDocumentSidebarManager } from '../../../sidebar/sidebar-manager-helper'
import { useDocumentEditorSidebarEntries } from '../edit/hooks/use-document-editor-sidebar-entries'
import { checkElementPermission } from '@Pimcore/modules/element/permissions/permission-helper'

export const PreviewView = (): React.JSX.Element => {
  const { id } = useElementContext()
  const { id: contextId } = useContext(DocumentContext)
  const { document } = useDocumentDraft(contextId)

  const sidebarManager = getDocumentSidebarManager(document?.type)
  const sidebarButtons = sidebarManager.getButtons()
  const sidebarEntries = useDocumentEditorSidebarEntries()

  const isEditTabHidden = !checkElementPermission(document?.permissions, 'save') &&
                          !checkElementPermission(document?.permissions, 'publish')

  const showSidebar = isEditTabHidden

  if (!showSidebar) {
    return <DocumentPreview id={ id } />
  }

  return (
    <ContentLayout
      renderSidebar={
        sidebarEntries.length > 0
          ? (
            <Sidebar
              buttons={ sidebarButtons }
              entries={ sidebarEntries }
              sizing="medium"
              translateTooltips
            />
            )
          : undefined
      }
    >
      <DocumentPreview id={ id } />
    </ContentLayout>
  )
}
