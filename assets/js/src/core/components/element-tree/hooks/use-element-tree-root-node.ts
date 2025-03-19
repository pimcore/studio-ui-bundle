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

import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { setRootFetchTriggered, setRootNode as setRootNodeAction, type TreeNode } from '../element-tree-slice'
import { type ElementIcon } from '@Pimcore/modules/asset/asset-api-slice-enhanced'
import { isNil } from 'lodash'
import { useTreeId } from '@Pimcore/modules/element/tree/provider/tree-id-provider/use-tree-id'
import trackError, { GeneralError } from '@Pimcore/modules/app/error-handler'
import { useElementTreeNode } from './use-element-tree-node'
import { useNodeApiHook } from '../provider/node-api-hook-provider/use-node-api-hook'
import { useState } from 'react'

export interface UseElementTreeRootNodeResult {
  rootNode?: TreeNode
  isLoading: boolean
}

export const useElementTreeRootNode = (id: number, showRoot: boolean): UseElementTreeRootNodeResult => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { treeId } = useTreeId()
  const { treeNodeProps, isRootFetchTriggered } = useElementTreeNode(String(id))
  const [isLoading, setLoading] = useState(false)
  const { nodeApiHook } = useNodeApiHook()
  const { fetchRoot } = nodeApiHook()

  const setRootNode = (rootNodeState: TreeNode): void => {
    dispatch(setRootNodeAction({ treeId, nodeId: String(id), rootNode: rootNodeState }))
  }

  const refreshRootNode = (): void => {
    if (isLoading) {
      return
    }

    setLoading(true)

    fetchRoot(id)
      .then((apiHookResult) => {
        if (isNil(apiHookResult) || isNil(apiHookResult.nodes[0])) {
          trackError(new GeneralError('Root node not found: ' + id))
        } else {
          setRootNode(apiHookResult.nodes[0])
        }
        setLoading(false)
      }).catch((error) => { console.error(error) })
  }

  if (isRootFetchTriggered !== true) {
    dispatch(setRootFetchTriggered({ treeId, nodeId: String(id), rootFetchTriggered: true }))
    refreshRootNode()
  }

  interface IDefaultRootNodeProps {
    icon: ElementIcon
    level: number
    isRoot: true
  }

  const defaultRootNodeProps: IDefaultRootNodeProps = {
    icon: { type: 'name', value: 'home-root-folder' },
    level: -1,
    isRoot: true
  }

  const newRootNode: TreeNode | undefined = isNil(treeNodeProps)
    ? undefined
    : {
        ...defaultRootNodeProps,
        ...treeNodeProps,
        icon: id === 1 ? { type: 'name', value: 'home-root-folder' } : treeNodeProps.icon,
        label: id === 1 ? t('home') : treeNodeProps.label,
        permissions: {
          ...treeNodeProps.permissions,
          delete: false,
          rename: false
        }
      }

  return {
    rootNode: newRootNode === undefined
      ? undefined
      : {
          ...defaultRootNodeProps,
          ...newRootNode
        },
    isLoading: showRoot && isLoading
  }
}
