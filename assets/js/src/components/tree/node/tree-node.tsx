import { Flex, theme } from 'antd'
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
  level: number
  hasChildren?: boolean
  metaData?: any
}

const defaultProps: TreeNodeProps = {
  id: Math.random().toString(16).slice(2),
  icon: 'folder',
  label: 'Node',
  children: [],
  level: 0
}

const { useToken } = theme

const TreeNode = (props: TreeNodeProps): React.JSX.Element => {
  const { token } = useToken()
  const { children } = props
  const { styles } = useStyles()
  const { renderNodeContent: RenderNodeContent, onSelect, selectedIdsState } = useContext(TreeContext)
  const [isExapanded, setIsExpanded] = React.useState(children.length !== 0)
  const [selectedIds, setSelectedIds] = selectedIdsState!

  function getClasses (): string {
    const classes = ['tree-node', styles.treeNode]

    if (selectedIds.includes(props.id)) {
      classes.push('tree-node--selected')
    }

    return classes.join(' ')
  }

  function onClick (): void {
    setSelectedIds([props.id])

    if (onSelect !== undefined) {
      onSelect({ ...props })
    }
  }

  return (
    <div className={ getClasses() }>
      <Flex
        className='tree-node__content'
        gap="small"
        onClick={ onClick }
        style={
          {
            paddingLeft: token.paddingSM + 20 * props.level,
            minWidth: `${20 * props.level + 200}px`
          }
        }
      >
        <TreeExpander
          node={ props }
          state={ [isExapanded, setIsExpanded] }
        />

        <div className="tree-node__content-wrapper">
          <RenderNodeContent node={ props } />
        </div>
      </Flex>

      {isExapanded && (
        <TreeList node={ props } />
      )}
    </div>
  )
}

TreeNode.defaultProps = defaultProps

export { TreeNode }
