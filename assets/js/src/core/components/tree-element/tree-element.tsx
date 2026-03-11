/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useState, type Key, useEffect } from 'react'
import { Tree, type TreeDataNode, type TreeProps } from 'antd'
import cn from 'classnames'
import { Icon } from '@Pimcore/components/icon/icon'
import { TreeElementItem } from './tree-element-item'
import { useStyles } from './tree-element.styles'
import { type IconColorGroup } from '@sdk/components'

export interface TreeAction {
  key: string
  icon: string
  iconColorGroup?: IconColorGroup
  actions?: TreeAction[]
  translationKey?: string
  menuKey?: string
}

export interface TreeDataItem extends TreeDataNode {
  actions?: TreeAction[]
  meta?: Record<string, any>
  allowDrop?: boolean | ((params: { dropNode: TreeDataItem, dropPosition: number, dragNode: TreeDataItem }) => boolean)
  allowDrag?: boolean | ((params: { node: TreeDataItem }) => boolean)
}

type OriginalTitleRender = NonNullable<TreeProps['titleRender']>

// Create a new type with an additional parameter
type ExtendedTitleRender = (
  node: Parameters<OriginalTitleRender>[0],
  initialComponent: React.ReactElement
) => ReturnType<OriginalTitleRender>

export interface ITreeElementProps extends Omit<TreeProps, 'titleRender'> {
  treeData: TreeDataItem[]
  className?: string
  onActionsClick?: (key: string, action: string, node: TreeDataItem) => void
  onDragAndDrop?: (params: { node: TreeDataItem, dragNode: TreeDataItem, dropPosition: number, dropToGap: boolean }) => void
  selectedKeys?: Key[]
  onSelected?: (key: any, node: TreeDataItem) => void
  onLoadData?: (node: any) => Promise<any>
  onExpand?: (keys: Key[]) => void
  withCustomSwitcherIcon?: boolean
  isHideRootChecker?: boolean
  defaultExpandAll?: boolean
  hasRoot?: boolean
  hideExpanders?: boolean
  titleRender?: ExtendedTitleRender
}

const TreeElement = (props: ITreeElementProps): React.JSX.Element => {
  const {
    checkStrictly,
    checkedKeys,
    treeData,
    className,
    defaultExpandedKeys,
    draggable,
    selectedKeys: propSelectedKeys,
    onCheck,
    onActionsClick,
    onDragAndDrop,
    onSelected,
    onLoadData,
    onExpand,
    defaultExpandAll,
    withCustomSwitcherIcon,
    isHideRootChecker = true,
    hasRoot = true,
    hideExpanders,
    titleRender
  } = props

  const { styles } = useStyles({ isHideRootChecker, hasRoot, hideExpanders })

  const [selectedKeys, setSelectedKeys] = useState<Key[]>([])
  const [expandedKeys, setExpandedKeys] = useState<Key[]>(defaultExpandedKeys ?? [0])

  useEffect(() => {
    if (propSelectedKeys !== undefined) {
      setSelectedKeys(propSelectedKeys)
    }
  }, [propSelectedKeys])

  const handleCustomSwitcherIcon = (): React.JSX.Element | undefined => {
    if (hideExpanders === true) return undefined
    if (withCustomSwitcherIcon === false) return undefined

    return (
      <Icon
        options={ {
          width: 16,
          height: 16
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

  const optionalProps = {
    ...(defaultExpandedKeys !== undefined ? { expandedKeys } : {})
  }

  return (
    <>
      {treeData.length > 0 && (
        <Tree
          { ...optionalProps }
          allowDrop={ ({ dropNode, dropPosition, dragNode }): boolean => {
            if (typeof dropNode.allowDrop === 'boolean') {
              return dropNode.allowDrop && dropPosition === 0
            }

            return dropNode.allowDrop !== undefined ? dropNode.allowDrop({ dropNode, dropPosition, dragNode }) : false
          } }
          blockNode
          checkStrictly={ checkStrictly }
          checkable={ onCheck !== undefined }
          checkedKeys={ checkedKeys }
          className={ cn(styles.treeContainer, className) }
          defaultExpandAll={ defaultExpandAll }
          draggable={ draggable }
          loadData={ onLoadData !== null ? onLoadData : undefined }
          onCheck={ (checkedKeys, event): void => onCheck?.(checkedKeys, event) }
          onDragStart={ (evt): void => {
            if (typeof evt.node.allowDrag === 'function') {
              if (!evt.node.allowDrag({ node: evt.node as TreeDataItem })) {
                evt.event.preventDefault()
              }
            }

            if (evt.node.allowDrag === false) {
              evt.event.preventDefault()
            }
          } }
          onDrop={ (evt): void => {
            onDragAndDrop?.({
              node: evt.node as TreeDataItem,
              dragNode: evt.dragNode as TreeDataItem,
              dropPosition: evt.dropPosition,
              dropToGap: evt.dropToGap
            })
          } }
          onExpand={ (keys): void => { onExpand !== null && onExpand !== undefined ? onExpand(keys) : setExpandedKeys(keys) } }
          selectable={ onSelected !== undefined }
          selectedKeys={ selectedKeys }
          showIcon
          switcherIcon={ handleCustomSwitcherIcon }
          titleRender={ (node) => {
            const component = (
              <TreeElementItem
                actions={ node.actions }
                onActionsClick={ (action) => onActionsClick?.(node.key.toString(), action, node) }
                onSelected={ () => {
                  setSelectedKeys([node.key])
                  onSelected?.(node.key, node)
                } }
                title={ node.title as string }
              />
            )

            return (
              <>{titleRender !== undefined ? titleRender(node, component) : component}</>
            )
          } }
          treeData={ treeData }
        />
      )}
    </>
  )
}
export { TreeElement }
