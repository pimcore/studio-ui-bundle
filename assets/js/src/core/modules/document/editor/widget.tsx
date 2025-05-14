/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type EditorContainerProps } from '@Pimcore/modules/document/editor/editor-container'
import { TitleContainer } from '@Pimcore/modules/document/editor/title/title-container'
import { selectDocumentById } from '@Pimcore/modules/document/document-draft-slice'
import { store } from '@Pimcore/app/store'
import React from 'react'
import { DocumentProvider } from '@Pimcore/modules/document/document-provider'
import { type Widget } from '@Pimcore/modules/widget-manager/services/widget-registry'
import { type GlobalDocumentContext } from '@Pimcore/modules/document/hooks/use-global-document-context'
import { EditorContainerRenderer } from './editor-container/editor-container-renderer'

export const DocumentEditorWidget: Widget = {
  name: 'document-editor',
  component: EditorContainerRenderer,
  titleComponent: TitleContainer,
  isModified: (tabNode) => {
    const config = tabNode.getConfig() as EditorContainerProps
    const document = selectDocumentById(store.getState(), config.id)
    return document?.modified ?? false
  },
  getContextProvider: (context: GlobalDocumentContext, children) => {
    const config = context.config
    return (
      <DocumentProvider id={ config.id }>
        {children}

      </DocumentProvider>
    )
  }
}
