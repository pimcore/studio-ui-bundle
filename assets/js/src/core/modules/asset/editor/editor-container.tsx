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
import { useAssetDraft } from '@Pimcore/modules/asset/hooks/use-asset-draft'
import { useIsAcitveMainWidget } from '@Pimcore/modules/widget-manager/hooks/use-is-active-main-widget'
import { useGlobalAssetContext } from '@Pimcore/modules/asset/hooks/use-global-asset-context'
import { AssetProvider } from '../asset-provider'
import { useInjection } from '@Pimcore/app/depency-injection'
import { type ComponentRegistry } from '@Pimcore/modules/asset/editor/services/component-registry'
import { serviceIds } from '@Pimcore/app/config/services'
import { Content } from '@Pimcore/components/content/content'

export interface EditorContainerProps {
  id: number
}

const EditorContainer = (props: EditorContainerProps): React.JSX.Element => {
  const { id } = props
  const { isLoading, isError, asset, removeAssetFromState } = useAssetDraft(id)
  const isWidgetActive = useIsAcitveMainWidget()
  const { setContext, removeContext } = useGlobalAssetContext()
  const componentRegistryService = useInjection<ComponentRegistry>(serviceIds['Asset/Editor/ComponentRegistry'])

  useEffect(() => {
    return () => {
      removeContext()
      removeAssetFromState()
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

  if (asset === undefined) {
    return <></>
  }

  let definition = componentRegistryService.getComponent(asset.type!)

  if (definition === undefined) {
    definition = componentRegistryService.getComponent('unknown')!
  }

  const Component = definition.component

  return (
    <AssetProvider id={ id }>
      <Component />
    </AssetProvider>
  )
}

export { EditorContainer }
