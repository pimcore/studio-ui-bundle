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

export interface TreeDataItem extends TreeDataNode {
  actions?: Array<{ key: string, icon: string }>
}

interface SimpleTreeProps {
  treeData: TreeDataItem[]
  className?: string
  defaultExpandedKeys?: string[]
  onCheck?: (checkedKeys: any) => void
  onActionsClick?: (key: any, action: string) => void
  onDragAndDrop?: (params: { node: TreeDataItem, dragNode: TreeDataItem, dropPosition: number }) => void
  onSelected?: (key: any) => void
  onLoadData?: (node) => Promise<any>
}

const SimpleTree = ({ treeData, className, defaultExpandedKeys, onCheck, onActionsClick, onDragAndDrop, onSelected, onLoadData, ...props }: SimpleTreeProps): React.JSX.Element => {
  const { styles } = useStyles()
  const classNames = [styles.tree, className]
  const [selectedKeys, setSelectedKeys] = React.useState<Key[]>([])
  const [expandedKeys, setExpandedKeys] = React.useState<Key[]>(defaultExpandedKeys ?? [])

  React.useEffect(() => {
    setExpandedKeys(defaultExpandedKeys ?? [])
  }, [defaultExpandedKeys])

  return (
    <Tree
      blockNode
      checkable={ onCheck !== undefined }
      className={ classNames.join(' ') }
      draggable
      expandedKeys={ expandedKeys }
      loadData={ onLoadData !== null ? onLoadData : undefined }
      onCheck={ (checkedKeys): void => onCheck?.(checkedKeys) }
      onDrop={ (evt): void => {
        onDragAndDrop?.({
          node: evt.node as TreeDataItem,
          dragNode: evt.dragNode as TreeDataItem,
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
          onActionsClick={ (action) => onActionsClick?.(node.key, action) }
          onSelected={ () => {
            setSelectedKeys([node.key])
            onSelected?.(node.key)
          } }
          title={ node.title as string }
        />
      ) }
      treeData={ treeData }
    />
  )
}
export { SimpleTree }
