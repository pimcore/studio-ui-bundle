import React, { useEffect } from 'react'
import { useAssetDraft } from '@Pimcore/modules/asset/hooks/use-asset-draft'
import { useIsAcitveMainWidget } from '@Pimcore/modules/widget-manager/hooks/use-is-active-main-widget'
import { useGlobalAssetContext } from '@Pimcore/modules/asset/hooks/use-global-asset-context'
import { AssetProvider } from '../asset-provider'
import { useInjection } from '@Pimcore/app/depency-injection'
import { type ComponentRegistry, serviceName } from '@Pimcore/modules/asset/editor/services/component-registry'

export interface EditorContainerProps {
  id: number
}

const EditorContainer = (props: EditorContainerProps): React.JSX.Element => {
  const { id } = props
  const { isLoading, isError, asset } = useAssetDraft(id)
  const isWidgetActive = useIsAcitveMainWidget()
  const { setContext, removeContext } = useGlobalAssetContext()
  const componentRegistryService = useInjection<ComponentRegistry>(serviceName)

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

  if (isError) {
    return <div>Error</div>
  }

  if (isLoading) {
    return <div>Loading...</div>
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
