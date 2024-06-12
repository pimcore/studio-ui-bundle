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

import { Tree } from '@Pimcore/components/tree/tree'
import React from 'react'
import { useNodeApiHook } from './hooks/use-node-api-hook'
import { type TreeNodeProps } from '@Pimcore/components/tree/node/tree-node'
import { PagerContainer } from './pager/pager-container'
import { useAsset } from '@Pimcore/modules/asset/hooks/use-asset'
import { api } from '@Pimcore/modules/asset/asset-api-slice.gen'
import { store } from '@Pimcore/app/store'
import { SearchContainer } from './search/search-container'

export interface TreeContainerProps {
  id: number
}

const defaultProps: TreeContainerProps = {
  id: 1
}

const TreeContainer = (props: TreeContainerProps): React.JSX.Element => {
  const { id } = props
  const { openAsset } = useAsset()

  async function onSelect (node: TreeNodeProps): Promise<void> {
    await store.dispatch(api.endpoints.getAssetById.initiate({ id: parseInt(node.id) }))

    openAsset({
      config: {
        id: parseInt(node.id)
      }
    })
  }

  return (
    <Tree
      maxItemsPerNode={ 20 }
      nodeApiHook={ useNodeApiHook }
      nodeId={ id }
      onSelect={ onSelect }
      renderFilter={ SearchContainer }
      renderPager={ PagerContainer }
    />
  )
}

TreeContainer.defaultProps = defaultProps

export { TreeContainer }
