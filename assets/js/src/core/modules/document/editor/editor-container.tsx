/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect } from 'react'
import { useDocumentDraft } from '@Pimcore/modules/document/hooks/use-document-draft'
import { useIsAcitveMainWidget } from '@Pimcore/modules/widget-manager/hooks/use-is-active-main-widget'
import { useGlobalDocumentContext } from '@Pimcore/modules/document/hooks/use-global-document-context'
import { DocumentProvider } from '../document-provider'
import { Content } from '@Pimcore/components/content/content'
import { TabsContainer } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs-container'
import { TabsToolbarView } from '@Pimcore/modules/element/editor/layouts/tabs-toolbar-view'
import { Alert } from '@Pimcore/components/alert/alert'
import { SaveProvider } from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/save-provider/save-provider'
import { Toolbar } from './toolbar/toolbar'

export interface EditorContainerProps {
  id: number
}

const EditorContainer = (props: EditorContainerProps): React.JSX.Element => {
  const { id } = props
  const { isLoading, isError, document, editorType } = useDocumentDraft(id)
  const isWidgetActive = useIsAcitveMainWidget()
  const { setContext, removeContext } = useGlobalDocumentContext()

  useEffect(() => {
    return () => {
      removeContext()
    }
  }, [])

  useEffect(() => {
    if (isWidgetActive) {
      setContext({ id })
    }

    return () => {
      if (!isWidgetActive) {
        removeContext()
      }
    }
  }, [isWidgetActive])

  if (isLoading) {
    return <Content loading />
  }

  if (isError) {
    return (
      <Content padded>
        <Alert
          message="Error: Loading of asset failed"
          type="error"
        />
      </Content>
    )
  }

  if (document === undefined || editorType === undefined) {
    return <></>
  }

  return (
    <DocumentProvider id={ id }>
      <TabsToolbarView
        renderTabbar={
          <TabsContainer
            elementEditorType={ editorType }
          />
          }

        renderToolbar={
          <Toolbar />
          }
      />
    </DocumentProvider>
  )
}

export { EditorContainer }
