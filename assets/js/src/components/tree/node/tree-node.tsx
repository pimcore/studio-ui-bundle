import { Space } from 'antd'
import React, { useContext } from 'react'
import { useStyles } from './tree-node.styles'
import { TreeContext } from '../tree'
import { TreeList } from '../list/tree-list'
import { TreeExpander } from '../expander/tree-expander'

export interface TreeNodeProps {
  id: string
  icon: string
  label: string
  children: TreeNodeProps[]
  hasChildren?: boolean
  metaData?: any
}

const defaultProps: TreeNodeProps = {
  id: Math.random().toString(16).slice(2),
  icon: 'folder',
  label: 'Node',
  children: []
}

const TreeNode = (props: TreeNodeProps): React.JSX.Element => {
  const { children } = props
  const { styles } = useStyles()
  const { renderNodeContent: RenderNodeContent, onSelect } = useContext(TreeContext)
  const [isExapanded, setIsExpanded] = React.useState(children.length !== 0)

  function onClick (): void {
    if (onSelect !== undefined) {
      onSelect({ ...props })
    }
  }

  return (
    <div className={['tree-node-item', styles.treeNode].join(' ')}>
      <Space>
        <TreeExpander node={props} state={[isExapanded, setIsExpanded]} />

        <div onClick={onClick}>
          <RenderNodeContent node={props} />
        </div>
      </Space>

      {isExapanded && (
        <TreeList node={props} />
      )}
    </div>
  )
}

TreeNode.defaultProps = defaultProps

export { TreeNode }
