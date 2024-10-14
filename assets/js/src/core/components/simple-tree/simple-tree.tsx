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

import React, { type Key } from 'react'
import { Tree, type TreeDataNode } from 'antd'
import { Icon } from '@Pimcore/components/icon/icon'
import { SimpleTreeItem } from './simple-tree-item'
import { useStyles } from './simple-tree.styles'

interface ExtendedTreeDataNode extends TreeDataNode {
  actions?: Array<{ key: string, icon: string }>
}
interface SimpleTreeProps {
  treeData: ExtendedTreeDataNode[]
  className?: string
  searchable?: boolean
  expandedKeys?: string[]
  onCheck?: (checkedKeys: any) => void
  onContextMenuClick?: (key: any, action: string) => void
  onDragAndDrop?: (params: { node: ExtendedTreeDataNode, dragNode: ExtendedTreeDataNode, dropPosition: number }) => void
  onSelected?: (key: any) => void
  onLoadData?: (node: ExtendedTreeDataNode) => Promise<void>
}

const SimpleTree = ({ className, ...props }: SimpleTreeProps): React.JSX.Element => {
  const { styles } = useStyles()
  const classNames = [styles.tree, className]
  const [selectedKeys, setSelectedKeys] = React.useState<Key[]>([])
  const [expandedKeys, setExpandedKeys] = React.useState<Key[]>(props.expandedKeys ?? [])

  return (
    <Tree
      blockNode
      checkable={ props.onCheck !== undefined }
      className={ classNames.join(' ') }
      draggable
      expandedKeys={ expandedKeys }
      loadData={ props.onLoadData !== null ? props.onLoadData : undefined }
      onCheck={ (checkedKeys): void => props.onCheck?.(checkedKeys) }
      onDrop={ (evt): void => {
        props.onDragAndDrop?.({
          node: evt.node as ExtendedTreeDataNode,
          dragNode: evt.dragNode as ExtendedTreeDataNode,
          dropPosition: evt.dropPosition
        })
      } }
      onExpand={ (keys): void => { setExpandedKeys(keys) } }
      selectedKeys={ selectedKeys }
      showIcon
      switcherIcon={ <Icon name={ 'chevron-down-small' } /> }
      titleRender={ (node) => (
        <SimpleTreeItem
          actions={ node.actions }
          onContextMenuClick={ (action) => props.onContextMenuClick?.(node.key, action) }
          onSelected={ () => {
            setSelectedKeys([node.key])
            props.onSelected?.(node.key)
          } }
          title={ node.title as string }
        />
      ) }
      treeData={ props.treeData }
    />
  )
}
export { SimpleTree }
