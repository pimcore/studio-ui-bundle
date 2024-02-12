import React, { type ElementType, createContext } from 'react'
import { TreeNode, type TreeNodeProps } from './node/tree-node'
import { type TreeSearchProps } from './__stories__/search/tree-search'
import { type TreePagerProps } from './__stories__/pager/tree-pager'
import { TreeNodeContent, type TreeNodeContentProps } from './node/content/tree-node-content'

export interface TreeProps {
  nodeId: number
  nodeApiHook: any
  maxItemsPerNode: number

  renderNodeContent: ElementType<TreeNodeContentProps>
  renderFilter?: ElementType<TreeSearchProps>
  renderPager?: ElementType<TreePagerProps>

  onLoad?: (node: TreeNodeProps) => Promise<void>
  onSelect?: (node: TreeNodeProps) => void
  onContextMenu?: (node: TreeNodeProps, event: React.MouseEvent) => void
}

export interface ITreeContext extends TreeProps {
  setInternalItems?: React.Dispatch<React.SetStateAction<TreeNodeProps[]>>
}

const defaultProps: TreeProps = {
  nodeId: 1,
  nodeApiHook: () => {},
  maxItemsPerNode: 30,
  renderNodeContent: TreeNodeContent
}

export const TreeContext = createContext<ITreeContext>({
  ...defaultProps
})

const Tree = (props: TreeProps): React.JSX.Element => {
  const { nodeId, nodeApiHook } = props
  const { apiHookResult, dataTransformer } = nodeApiHook(nodeId)
  const { isLoading, isError, data } = apiHookResult

  if (isLoading !== false) {
    return <></>
  }

  if (isError !== false) {
    return (<div>{'Error'}</div>)
  }

  const { nodes: items } = dataTransformer(data)

  return (
    <div>
      <TreeContext.Provider value={{ ...props }}>
        {items.map((item, index) => (
          <div key={item.id}>
            <TreeNode {...item} />
          </div>
        ))}
      </TreeContext.Provider>
    </div>
  )
}

Tree.defaultProps = defaultProps

export { Tree }
