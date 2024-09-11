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

import React, {
  createContext,
  type Dispatch,
  type ElementType,
  type MutableRefObject,
  useCallback,
  useMemo,
  useRef,
  useState
} from 'react'
import { TreeNode, type TreeNodeProps } from './node/tree-node'
import { TreeNodeContent, type TreeNodeContentProps } from './node/content/tree-node-content'
import { useStyles } from './tree.styles'
import { type TreeContextMenuProps } from './components/context-menu/context-menu'
import { container } from '@Pimcore/app/depency-injection'
import { type ComponentRegistry } from '@Pimcore/modules/app/component-registry/component-registry'
import { serviceIds } from '@Pimcore/app/config/services'

export interface TreeSearchProps {
  node: TreeNodeProps
  mergeAdditionalQueryParams?: Dispatch<unknown>
  total: number
}

export interface TreePagerProps {
  node: TreeNodeProps
  mergeAdditionalQueryParams: Dispatch<unknown>
  total: number
}

export interface TreeProps {
  nodeId: number
  nodeApiHook: any
  maxItemsPerNode: number

  renderNode: ElementType<TreeNodeProps>
  renderNodeContent: ElementType<TreeNodeContentProps>
  renderFilter?: ElementType<TreeSearchProps>
  renderPager?: ElementType<TreePagerProps>

  onLoad?: (node: TreeNodeProps) => Promise<void>
  onSelect?: (node: TreeNodeProps) => void
  onRightClick?: (event: React.MouseEvent, node: TreeNodeProps) => void
}

export interface nodeRef {
  el: HTMLElement
  node: TreeNodeProps
}

export interface ITreeContext extends TreeProps {
  selectedIdsState?: [string[], (ids: string[]) => void]
  nodesRefs?: MutableRefObject<Record<string, nodeRef>>
  nodeOrder?: () => string[]
}

export const defaultProps: TreeProps = {
  nodeId: 1,
  nodeApiHook: () => {},
  maxItemsPerNode: 30,
  renderNodeContent: TreeNodeContent,
  renderNode: TreeNode
}

export const TreeContext = createContext<ITreeContext>({
  ...defaultProps
})

const Tree = (
  {
    maxItemsPerNode = defaultProps.maxItemsPerNode,
    nodeApiHook = defaultProps.nodeApiHook,
    renderNode = defaultProps.renderNode,
    renderNodeContent = defaultProps.renderNodeContent,
    ...props
  }: TreeProps
): React.JSX.Element => {
  const selectedIdsState = useState<string[]>([])
  const { styles } = useStyles()
  const { nodeId } = props
  const { apiHookResult, dataTransformer } = nodeApiHook({
    id: nodeId,
    level: -1
  })
  const { isLoading, isError, data } = apiHookResult
  const nodesRefs = useRef<Record<string, nodeRef>>({})
  const nodeOrder = useCallback(() => {
    return Object.keys(nodesRefs.current).sort((a: string, b: string) => {
      const nodeA = nodesRefs.current[a].node
      const nodeB = nodesRefs.current[b].node

      const indexesA = nodeA.internalKey.split('-')
      const indexesB = nodeB.internalKey.split('-')

      for (let index = 0; index < indexesA.length; index++) {
        if (indexesA[index] !== indexesB[index]) {
          return parseInt(indexesA[index]) - parseInt(indexesB[index])
        }
      }

      return 0
    })
  }, [nodesRefs.current])
  const [rightClickedNode, setRightClickedNode] = useState<TreeNodeProps | undefined>(undefined)
  const componentRegistry = container.get<ComponentRegistry>(serviceIds['App/ComponentRegistry/ComponentRegistry'])
  const ContextMenu = componentRegistry.get<TreeContextMenuProps>('assetTreeContextMenu')

  async function onRightClick (event: React.MouseEvent, node: TreeNodeProps): Promise<void> {
    event.preventDefault()

    setRightClickedNode(node)
  }

  const treeContextValue: ITreeContext = useMemo(() => ({ ...props, selectedIdsState, nodesRefs, nodeOrder, maxItemsPerNode, nodeApiHook, renderNode, renderNodeContent, onRightClick }), [props, selectedIdsState, nodesRefs, nodeOrder, maxItemsPerNode, nodeApiHook, renderNode, renderNodeContent, onRightClick])

  if (isError !== false) {
    return (<div>{'Error'}</div>)
  }

  let items: any[] = []

  if (isLoading === false && data !== undefined) {
    const { nodes } = dataTransformer(data)
    items = nodes
  }

  const TreeNode = renderNode

  return (
    <>
      {isLoading === false && items.length !== 0 && (
        <ContextMenu node={ rightClickedNode }>
          <div className={ ['tree', styles.tree].join(' ') }>
            <TreeContext.Provider value={ treeContextValue }>
              {items.map((item, index) => (
                <TreeNode
                  internalKey={ `${index}` }
                  key={ item.id }
                  { ...item }
                />
              ))}
            </TreeContext.Provider>
          </div>
        </ContextMenu>
      )}
    </>
  )
}

export { Tree }
