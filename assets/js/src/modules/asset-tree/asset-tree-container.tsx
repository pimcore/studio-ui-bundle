import { Tree } from '@Pimcore/components/tree/tree'
import React from 'react'
import { useNodeApiHook } from './hooks/use-node-api-hook'
import { type TreeNodeProps } from '@Pimcore/components/tree/node/tree-node'
import { PagerContainer } from './pager/pager-container'
import { useAsset } from '@Pimcore/modules/asset/hooks/use-asset'
import { api } from '@Pimcore/modules/asset/asset-api-slice.gen'
import { store } from '@Pimcore/app/store'

export interface AssetTreeContainerProps {
  id: number
}

const defaultProps: AssetTreeContainerProps = {
  id: 1
}

const AssetTreeContainer = (props: AssetTreeContainerProps): React.JSX.Element => {
  const { id } = props
  const { openAsset } = useAsset()

  async function onSelect (node: TreeNodeProps): Promise<void> {
    await store.dispatch(api.endpoints.apiAssetsIdGet.initiate({ id: node.id }))

    openAsset({
      name: node.label,
      icon: node.icon,
      config: {
        id: parseInt(node.id)
      }
    })
  }

  return (
    <Tree
      nodeId={id}
      nodeApiHook={useNodeApiHook}
      maxItemsPerNode={20}
      renderPager={PagerContainer}
      onSelect={onSelect}
    />
  )
}

AssetTreeContainer.defaultProps = defaultProps

export { AssetTreeContainer }
