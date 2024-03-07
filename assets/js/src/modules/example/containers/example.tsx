import React from 'react'
import { Result } from 'antd'
import { AssetContainer } from './asset-container'
import { useGlobalAssetContext } from '@Pimcore/modules/asset/hooks/use-global-asset-context'

export const Example = (): React.JSX.Element => {
  const { context } = useGlobalAssetContext()

  if (context === undefined) {
    return <Result title="No context" />
  }

  return (
    <AssetContainer id={context.config.id} />
  )
}
