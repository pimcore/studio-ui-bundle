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
import { useAssetDraft } from '@Pimcore/modules/asset/hooks/use-asset-draft'
import { useIsAcitveMainWidget } from '@Pimcore/modules/widget-manager/hooks/use-is-active-main-widget'
import { useGlobalAssetContext } from '@Pimcore/modules/asset/hooks/use-global-asset-context'
import { AssetProvider } from '@sdk/modules/asset'
import { Content } from '@Pimcore/components/content/content'
import { TabsContainer } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs-container'
import { Toolbar } from '@Pimcore/modules/asset/editor/toolbar/toolbar'
import { TabsToolbarView } from '@Pimcore/modules/element/editor/layouts/tabs-toolbar-view'
import { Alert } from '@Pimcore/components/alert/alert'

export interface EditorContainerProps {
  id: number
}

const EditorContainer = (props: EditorContainerProps): React.JSX.Element => {
  const { id } = props
  const { isLoading, isError, asset, editorType } = useAssetDraft(id)
  const isWidgetActive = useIsAcitveMainWidget()
  const { setContext, removeContext } = useGlobalAssetContext()

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

  if (asset === undefined || editorType === undefined) {
    return <></>
  }

  return (
    <AssetProvider id={ id }>
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
    </AssetProvider>
  )
}

export { EditorContainer }
