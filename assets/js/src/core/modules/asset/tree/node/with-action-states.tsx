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

import { type TreeNode, type TreeNodeProps } from '@Pimcore/components/element-tree/node/tree-node'
import React, { forwardRef, type Ref, type ReactElement } from 'react'
import { useAssetPatchByIdMutation } from '../../asset-api-slice-enhanced'
import { useElementDeleteMutation } from '@Pimcore/modules/element/element-api-slice.gen'
import { useNodeState } from '@Pimcore/components/element-tree/hooks/use-node-state'

export const withActionStates = (Component: typeof TreeNode): typeof TreeNode => {
  const ActionStates = (props: TreeNodeProps, ref: Ref<HTMLDivElement>): ReactElement => {
    const originalLoadingState = props.isLoading ?? false
    const [, { isLoading }] = useAssetPatchByIdMutation({ fixedCacheKey: `ASSET_ACTION_RENAME_ID_${props.id}` })
    const [, { isLoading: isDeleteLoading }] = useElementDeleteMutation({ fixedCacheKey: `ASSET_ACTION_DELETE_ID_${props.id}` })
    const { isLoading: isMarkedAsLoading } = useNodeState(props.id)

    return (
      <Component
        { ...props }
        danger={ originalLoadingState || isDeleteLoading }
        isLoading={ originalLoadingState || isMarkedAsLoading || isLoading || isDeleteLoading }
        ref={ ref }
      />
    )
  }

  return forwardRef(ActionStates)
}
