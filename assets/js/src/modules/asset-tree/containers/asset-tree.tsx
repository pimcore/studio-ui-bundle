import { Tree } from '@Pimcore/components/tree/tree'
import React from 'react'
import { useNodeApiHook } from '../hooks/use-node-api-hook'
import { type TreeNodeProps } from '@Pimcore/components/tree/node/tree-node'
import { AssetTreePager } from './asset-tree-pager'
import { useAsset } from '@Pimcore/modules/asset/hooks/use-asset'

export interface AssetTreeProps {
  id: number
}

const defaultProps: AssetTreeProps = {
  id: 1
}

const AssetTree = (props: AssetTreeProps): React.JSX.Element => {
  const { id } = props
  const { openAsset } = useAsset()

  function onSelect (node: TreeNodeProps): void {
    openAsset({
      name: node.label,
      icon: node.icon,
      config: {
        id: node.id
      }
    })
  }

  return (
    <Tree
      nodeId={id}
      nodeApiHook={useNodeApiHook}
      maxItemsPerNode={20}
      renderPager={AssetTreePager}
      onSelect={onSelect}
    />
  )
}

AssetTree.defaultProps = defaultProps

export { AssetTree }
