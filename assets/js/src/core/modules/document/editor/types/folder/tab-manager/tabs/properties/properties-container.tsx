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
import { PropertiesContainer as SharedPropertiesContainer } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/properties/properties-container'
import { Sidebar } from '@Pimcore/components/sidebar/sidebar'
import { ContentLayout } from '@Pimcore/components/content-layout/content-layout'
import { DocumentContext } from '@Pimcore/modules/document/document-provider'
import { useDocumentDraft } from '@Pimcore/modules/document/hooks/use-document-draft'
import { getDocumentSidebarManager } from '../../../../../sidebar/sidebar-manager-helper'
import { useDocumentEditorSidebarEntries } from '../../../../../shared-tab-manager/tabs/edit/hooks/use-document-editor-sidebar-entries'
import { Icon } from '@Pimcore/components/icon/icon'
import { type IEditorTab } from '@Pimcore/modules/element/editor/tab-manager/interface/IEditorTab'

export const PropertiesContainer = (): React.JSX.Element => {
  const { id } = useContext(DocumentContext)
  const { document: documentDraft } = useDocumentDraft(id)

  const sidebarManager = getDocumentSidebarManager(documentDraft?.type)
  const sidebarButtons = sidebarManager.getButtons()
  const sidebarEntries = useDocumentEditorSidebarEntries()

  return (
    <ContentLayout
      renderSidebar={
        <Sidebar
          buttons={ sidebarButtons }
          entries={ sidebarEntries }
          sizing="medium"
          translateTooltips
        />
      }
    >
      <SharedPropertiesContainer />
    </ContentLayout>
  )
}

export const TAB_FOLDER_PROPERTIES: IEditorTab = {
  key: 'properties',
  label: 'properties.label',
  workspacePermission: 'properties',
  children: <PropertiesContainer />,
  icon: <Icon value={ 'settings' } />,
  isDetachable: true
}
