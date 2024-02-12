import React from 'react'
import { type TreeNodeProps } from '../tree-node'
import { Space } from 'antd'
import { Icon } from '@Pimcore/components/icon/icon'

export interface TreeNodeContentProps {
  node: TreeNodeProps
}

const TreeNodeContent = (props: TreeNodeContentProps): React.JSX.Element => {
  const { icon, label } = props.node

  return (
    <Space>
      <Icon name={icon} />
      <span>{label}</span>
    </Space>
  )
}

export { TreeNodeContent }
