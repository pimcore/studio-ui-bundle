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
  type ElementType,
  type MutableRefObject,
  useCallback,
  useMemo,
  useRef,
  useState
} from 'react'
import { TreeNode as TreeNodeComponent, type TreeNodeProps } from './node/tree-node'
import { TreeNodeContent, type TreeNodeContentProps } from './node/content/tree-node-content'
import { useStyles } from './element-tree.styles'
import { UploadProvider } from '@Pimcore/modules/element/upload/upload-provider'
import { Skeleton } from './skeleton/skeleton'
import { Box } from '../box/box'
import { useElementTree } from './hooks/use-element-tree'
import { type TreeNode } from './element-tree-slice'
import { type NodeApiHook } from './types/node-api-hook'
import { useNodeApiHook } from '@Pimcore/modules/asset/tree/hooks/use-node-api-hook'

export interface TreeSearchProps {
  node: TreeNodeProps
  isLoading?: boolean
  total: number
}

export interface TreePagerProps {
  node: TreeNodeProps
  total: number
}

export interface TreeContextMenuProps {
  children: React.ReactNode
  node?: TreeNodeProps
}

export interface TreeProps {
  nodeId: number
  nodeApiHook: NodeApiHook
  maxItemsPerNode?: number
  rootNode?: TreeNode

  renderNode: typeof TreeNodeComponent
  renderNodeContent: ElementType<TreeNodeContentProps>
  contextMenu?: ElementType<TreeContextMenuProps>
  renderFilter?: ElementType<TreeSearchProps>
  renderPager?: ElementType<TreePagerProps>

  onLoad?: (node: TreeNode) => Promise<void>
  onSelect?: (node: TreeNode) => void
  onRightClick?: (event: React.MouseEvent, node: TreeNode) => void
}

export interface INodeRef {
  el: HTMLElement
  node: TreeNodeProps
}

export interface ITreeContext extends TreeProps {
  nodesRefs?: MutableRefObject<Record<string, INodeRef>>
  nodeOrder?: () => string[]
}

export const defaultProps: TreeProps = {
  nodeId: 1,
  maxItemsPerNode: 30,
  renderNodeContent: TreeNodeContent,
  renderNode: TreeNodeComponent,
  nodeApiHook: useNodeApiHook
}

export const TreeContext = createContext<ITreeContext>({
  ...defaultProps
})

const ElementTree = (
  {
    maxItemsPerNode = defaultProps.maxItemsPerNode,
    nodeApiHook = defaultProps.nodeApiHook,
    renderNode = defaultProps.renderNode,
    renderNodeContent = defaultProps.renderNodeContent,
    contextMenu: ContextMenu,
    rootNode,
    ...props
  }: TreeProps
): React.JSX.Element => {
  const { styles } = useStyles()
  const { nodeId } = props
  const hasRootNode = rootNode !== undefined && parseInt(rootNode.id) === nodeId
  const preparedRootNode = rootNode
  const { page, setPage, getChildren, isLoading, isExpanded, setExpanded } = useElementTree(String(nodeId), nodeApiHook)
  console.log('node state', page, getChildren(), isLoading)
  const nodesRefs = useRef<Record<string, INodeRef>>({})
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

  async function onRightClick (event: React.MouseEvent, node: TreeNodeProps): Promise<void> {
    event.preventDefault()

    setRightClickedNode(node)
  }

  const treeContextValue: ITreeContext = useMemo(() => ({ ...props, nodesRefs, nodeOrder, maxItemsPerNode, nodeApiHook, renderNode, renderNodeContent, onRightClick }), [props, nodesRefs, nodeOrder, maxItemsPerNode, nodeApiHook, renderNode, renderNodeContent, onRightClick])

  // todo if (isError !== false) {
  //   return (<div>{'Error'}</div>)
  // }

  const items: TreeNode[] = getChildren()

  if (hasRootNode) {
    preparedRootNode!.hasChildren = false
    if (!isExpanded) {
      setExpanded(true)
    }
  }

  if (items.length === 0 && page > 1) {
    setPage(1)
  }

  const TreeNode = renderNode
  const treeContent = (
    <div className={ ['tree', styles.tree].join(' ') }>
      <TreeContext.Provider value={ treeContextValue }>
        {hasRootNode && (
          <TreeNodeComponent
            key={ preparedRootNode!.id }
            level={ -1 }
            { ...preparedRootNode! }
          />
        )}

        {!hasRootNode && (
          <>
            {items.map((item, index) => (
              <TreeNode
                key={ item.id }
                { ...item }
                internalKey={ `${index}` }
                level={ 0 }
              />
            ))}
          </>
        )}
      </TreeContext.Provider>
    </div>
  )

  return (
    <UploadProvider>
      {isLoading === true && !hasRootNode && (
        <Box padding={ { left: 'extra-small' } }>
          <Skeleton />
        </Box>
      )}

      {isLoading !== true && items.length !== 0 && (
        ContextMenu !== undefined
          ? (
            <ContextMenu node={ rightClickedNode }>
              {treeContent}
            </ContextMenu>
            )
          : (
              treeContent
            )
      )}
    </UploadProvider>
  )
}

export { ElementTree }
