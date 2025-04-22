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

import React, { useState, type Key, useEffect } from 'react'
import { Tree, type TreeDataNode, type TreeProps } from 'antd'
import cn from 'classnames'
import { Icon } from '@Pimcore/components/icon/icon'
import { TreeElementItem } from './tree-element-item'
import { useStyles } from './tree-element.styles'

export interface TreeDataItem extends TreeDataNode {
  actions?: Array<{ key: string, icon: string }>
  allowDrop?: boolean
}

interface ITreeElementProps extends TreeProps {
  treeData: TreeDataItem[]
  className?: string
  onActionsClick?: (key: string, action: string) => void
  onDragAndDrop?: (params: { node: TreeDataItem, dragNode: TreeDataItem, dropPosition: number }) => void
  onSelected?: (key: any) => void
  onLoadData?: (node: any) => Promise<any>
  onExpand?: (keys: Key[]) => void
  withCustomSwitcherIcon?: boolean
  isHideRootChecker?: boolean
}

const TreeElement = (props: ITreeElementProps): React.JSX.Element => {
  const {
    checkStrictly,
    checkedKeys,
    treeData,
    className,
    defaultExpandedKeys,
    draggable,
    onCheck,
    onActionsClick,
    onDragAndDrop,
    onSelected,
    onLoadData,
    onExpand,
    withCustomSwitcherIcon,
    isHideRootChecker = true
  } = props

  const { styles } = useStyles({ isHideRootChecker })

  const [selectedKeys, setSelectedKeys] = useState<Key[]>([])
  const [expandedKeys, setExpandedKeys] = useState<Key[]>(defaultExpandedKeys ?? [0])

  const handleCustomSwitcherIcon = (): React.JSX.Element | undefined => {
    if (withCustomSwitcherIcon === false) return undefined

    return (
      <Icon
        options={ {
          width: 12,
          height: 12
        } }
        value="chevron-down"
      />
    )
  }

  useEffect(() => {
    if (defaultExpandedKeys !== undefined) {
      setExpandedKeys(defaultExpandedKeys)
    }
  }, [defaultExpandedKeys])

  return (
    <Tree
      allowDrop={ ({ dropNode, dropPosition }): boolean => {
        return dropNode.allowDrop !== false && dropPosition === 0
      } }
      blockNode
      checkStrictly={ checkStrictly }
      checkable={ onCheck !== undefined }
      checkedKeys={ checkedKeys }
      className={ cn(styles.treeContainer, className) }
      draggable={ draggable }
      expandedKeys={ expandedKeys }
      loadData={ onLoadData !== null ? onLoadData : undefined }
      onCheck={ (checkedKeys, event): void => onCheck?.(checkedKeys, event) }
      onDrop={ (evt): void => {
        onDragAndDrop?.({
          node: evt.node as TreeDataItem,
          dragNode: evt.dragNode as TreeDataItem,
          dropPosition: evt.dropPosition
        })
      } }
      onExpand={ (keys): void => { onExpand !== null && onExpand !== undefined ? onExpand(keys) : setExpandedKeys(keys) } }
      selectable={ onSelected !== undefined }
      selectedKeys={ selectedKeys }
      showIcon
      switcherIcon={ handleCustomSwitcherIcon }
      titleRender={ (node) => (
        <TreeElementItem
          actions={ node.actions }
          onActionsClick={ (action) => onActionsClick?.(node.key.toString(), action) }
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
export { TreeElement }
