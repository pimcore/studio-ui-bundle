import React from 'react'
import { TreeProps } from '../tree'

export interface AdvancedTreeProps extends TreeProps {}

const AdvancedTree = (props: AdvancedTreeProps): React.JSX.Element => {
  return (
    <div>
      AdvancedTree
    </div>
  )
}

export { AdvancedTree }
