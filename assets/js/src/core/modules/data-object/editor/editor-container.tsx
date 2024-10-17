/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import React, { useEffect } from 'react'
import { useIsAcitveMainWidget } from '@Pimcore/modules/widget-manager/hooks/use-is-active-main-widget'
import { DataObjectProvider } from '../data-object-provider'
import { Content } from '@Pimcore/components/content/content'
import { useDataObjectDraft } from '@Pimcore/modules/data-object/hooks/use-data-object-draft'
import { useGlobalDataObjectContext } from '@Pimcore/modules/data-object/hooks/use-global-data-object-context'
import { TabsContainer } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs-container'
import { Toolbar } from '@Pimcore/modules/asset/editor/toolbar/toolbar'
import { TabsToolbarView } from '@Pimcore/modules/element/editor/layouts/tabs-toolbar-view'

export interface EditorContainerProps {
  id: number
}

const EditorContainer = (props: EditorContainerProps): React.JSX.Element => {
  const { id } = props
  const { isLoading, isError, dataObject, removeDataObjectFromState, editorType } = useDataObjectDraft(id)
  const isWidgetActive = useIsAcitveMainWidget()
  const { setContext, removeContext } = useGlobalDataObjectContext()

  useEffect(() => {
    return () => {
      removeContext()
      removeDataObjectFromState()
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

  if (isError) {
    return <div>Error</div>
  }

  if (isLoading) {
    return <Content loading />
  }

  if (dataObject === undefined || editorType === undefined) {
    return <></>
  }

  return (
    <DataObjectProvider id={ id }>
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
    </DataObjectProvider>
  )
}

export { EditorContainer }
