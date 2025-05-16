/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, {
  createContext,
  type ElementType,
  type MutableRefObject,
  useCallback,
  useMemo,
  useRef
} from 'react'
import { TreeNode as TreeNodeComponent, type TreeNodeProps } from './node/tree-node'
import { TreeNodeContent, type TreeNodeContentProps } from './node/content/tree-node-content'
import { useStyles } from './element-tree.styles'
import { Skeleton } from './skeleton/skeleton'
import { Box } from '../box/box'
import { useElementTreeNode } from './hooks/use-element-tree-node'
import { type TreeNode } from './element-tree-slice'
import { TreeList } from './list/tree-list'

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
  children?: React.ReactNode
  node?: TreeNodeProps
}

export interface TreeProps {
  nodeId: number
  rootNode?: TreeNode

  renderNode: typeof TreeNodeComponent
  renderNodeContent: ElementType<TreeNodeContentProps>
  contextMenu?: ElementType<TreeContextMenuProps>
  renderFilter?: ElementType<TreeSearchProps>
  renderPager?: ElementType<TreePagerProps>

  onLoad?: (node: TreeNode) => Promise<void>
  onSelect?: (node: TreeNode) => void
  onRightClick?: (event: React.MouseEvent, node: TreeNode) => void

  showRoot: boolean
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
  renderNodeContent: TreeNodeContent,
  renderNode: TreeNodeComponent,
  showRoot: true
}

export const TreeContext = createContext<ITreeContext>({
  ...defaultProps
})

const ElementTree = (
  {
    renderNode = defaultProps.renderNode,
    renderNodeContent = defaultProps.renderNodeContent,
    contextMenu: ContextMenu,
    rootNode,
    ...props
  }: TreeProps
): React.JSX.Element => {
  const { styles } = useStyles()
  const { nodeId } = props
  const hasRootNode = rootNode !== undefined && parseInt(rootNode.id) === nodeId && props.showRoot
  const preparedRootNode = rootNode
  const { getChildren, isLoading } = useElementTreeNode(String(nodeId))

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

  async function onRightClick (event: React.MouseEvent, node: TreeNodeProps): Promise<void> {
    event.preventDefault()
  }

  const treeContextValue: ITreeContext = useMemo(() => ({ ...props, nodesRefs, nodeOrder, renderNode, renderNodeContent, onRightClick }), [props, nodesRefs, nodeOrder, renderNode, renderNodeContent, onRightClick])

  const items: string[] = getChildren()

  const TreeNode = renderNode
  const treeContent = (
    <div className={ ['tree', styles.tree].join(' ') }>
      <TreeContext.Provider value={ treeContextValue }>

        {hasRootNode && (
        <TreeNode
          key={ preparedRootNode!.id }
          level={ -1 }
          { ...preparedRootNode! }
        />
        )}

        {!hasRootNode && (
        <TreeList
          node={ { ...preparedRootNode!, level: -1 } }
        />

        )}
      </TreeContext.Provider>
    </div>
  )

  return (
    <>
      {isLoading === true && !hasRootNode && (
        <Box padding={ { left: 'extra-small' } }>
          <Skeleton />
        </Box>
      )}

      {(items.length !== 0 || hasRootNode) && (treeContent)}
    </>
  )
}

export { ElementTree }
