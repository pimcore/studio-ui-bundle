import React, { useContext } from 'react'
import { type TreeNodeProps } from '../node/tree-node'
import { TreeContext } from '../tree'
import { Icon } from '@Pimcore/components/icon/icon'

export interface TreeExpanderProps {
  node: TreeNodeProps
  state: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
}

export const TreeExpander = ({ node, state }: TreeExpanderProps): React.JSX.Element => {
  const { hasChildren, children } = node
  const { onLoad } = useContext(TreeContext)
  const [isExapanded, setIsExpanded] = state

  async function onClick (): Promise<void> {
    if (hasChildren === true) {
      const newExpandedValue = !isExapanded

      if (newExpandedValue && onLoad !== undefined && children.length === 0) {
        await onLoad(node)
      }

      setIsExpanded(newExpandedValue)
    }
  }

  return (
    <div className='tree-expander' style={{ width: 16, height: 16 }}>
      {node.hasChildren === true && (
        <span onClick={onClick}>
          {isExapanded ? <Icon name="chevron-up" /> : <Icon name="chevron-down" />}
        </span>
      )}
    </div>
  )
}
