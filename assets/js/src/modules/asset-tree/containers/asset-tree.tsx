import { Tree } from '@Pimcore/components/tree/tree'
import React from 'react'
import { useNodeApiHook } from '../hooks/use-node-api-hook'
import { AssetTreePager } from './asset-tree-pager'

const AssetTree = (): React.JSX.Element => {
  return (
    <>
      <div>
        <Tree nodeId={1} nodeApiHook={useNodeApiHook} maxItemsPerNode={5} renderPager={AssetTreePager} />
      </div>
    </>
  )
}

export { AssetTree }
