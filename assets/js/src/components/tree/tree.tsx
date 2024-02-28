import React, { type ElementType, createContext, useState, type Dispatch } from 'react'
import { TreeNode, type TreeNodeProps } from './node/tree-node'
import { TreeNodeContent, type TreeNodeContentProps } from './node/content/tree-node-content'
import { useStyles } from './tree.styles'

export interface TreeSearchProps {
  node: TreeNodeProps
  setAdditionalQueryParams?: Dispatch<any>
}

export interface TreePagerProps {
  node: TreeNodeProps
  setAdditionalQueryParams: Dispatch<any>
  total: number
}

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
  selectedIdsState?: [string[], (ids: string[]) => void]
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
  const selectedIdsState = useState<string[]>([])
  const { styles } = useStyles()
  const { nodeId, nodeApiHook } = props
  const { apiHookResult, dataTransformer } = nodeApiHook({
    id: nodeId,
    level: -1
  })
  const { isLoading, isError, data } = apiHookResult

  if (isError !== false) {
    return (<div>{'Error'}</div>)
  }

  let items: any[] = []

  if (isLoading === false && data !== undefined) {
    const { nodes } = dataTransformer(data)
    items = nodes
  }

  return (
    <>
      {isLoading === false && items.length !== 0 && (
        <div className={['tree', styles.tree].join(' ')}>
          <TreeContext.Provider value={{ ...props, selectedIdsState }}>
            {items.map((item) => (
              <TreeNode key={item.id} {...item} />
            ))}
          </TreeContext.Provider>
        </div>
      )}
    </>

  )
}

Tree.defaultProps = defaultProps

export { Tree }
