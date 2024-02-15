import React from 'react'
import { type TreeNodeProps } from '../tree-node'
import { Flex } from 'antd'
import { Icon } from '@Pimcore/components/icon/icon'

export interface TreeNodeContentProps {
  node: TreeNodeProps
}

const TreeNodeContent = (props: TreeNodeContentProps): React.JSX.Element => {
  const { icon, label } = props.node

  return (
    <Flex gap={'small'}>
      <Icon name={icon} />
      <span className="tree-node-content__label">{label}</span>
    </Flex>
  )
}

export { TreeNodeContent }
