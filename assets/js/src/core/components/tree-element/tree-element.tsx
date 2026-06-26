/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useState, type Key, useEffect, useRef } from 'react'
import { Dropdown, type MenuProps, Tree, type TreeDataNode, type TreeProps } from 'antd'
import cn from 'classnames'
import { useTranslation } from 'react-i18next'
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

  const { t } = useTranslation()
  const { styles } = useStyles({ isHideRootChecker, hasRoot, hideExpanders })

  const [selectedKeys, setSelectedKeys] = useState<Key[]>([])
  const [expandedKeys, setExpandedKeys] = useState<Key[]>(defaultExpandedKeys ?? [0])
  const [contextMenuNode, setContextMenuNode] = useState<TreeDataItem | null>(null)
  const [contextMenuOpen, setContextMenuOpen] = useState<boolean>(false)
  const contextMenuNodeRef = useRef<TreeDataItem | null>(null)

  // handle nested actions
  const buildMenuItems = (node: TreeDataItem, actionsList: TreeAction[]): MenuProps['items'] => {
    return actionsList.map((action) => {
      const translationKey = action.translationKey ?? `tree.actions.${action.key}`
      const reactKey = action.menuKey ?? action.key

      if (action.actions !== undefined && action.actions.length > 0) {
        return {
          key: reactKey,
          label: t(translationKey),
          icon: <Icon
            iconColorGroup={ action.iconColorGroup }
            value={ action.icon }
                />,
          children: buildMenuItems(node, action.actions)
        }
      }

      return {
        key: reactKey,
        label: t(translationKey),
        icon: <Icon
          iconColorGroup={ action.iconColorGroup }
          value={ action.icon }
              />,
        onClick: () => {
          onActionsClick?.(node.key.toString(), action.key, node)
        }
      }
    })
  }

  const contextMenuItems: MenuProps['items'] = contextMenuNode?.actions !== undefined
    ? buildMenuItems(contextMenuNode, contextMenuNode.actions)
    : []

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
        <Dropdown
          menu={ { items: contextMenuItems } }
          onOpenChange={ (open) => {
            setContextMenuOpen(open && (contextMenuNodeRef.current?.actions?.length ?? 0) > 0)
          } }
          open={ contextMenuOpen }
          trigger={ ['contextMenu'] }
        >
          <div>
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
              onRightClick={ ({ node }): void => {
                const treeDataItem = node as TreeDataItem
                contextMenuNodeRef.current = treeDataItem
                setContextMenuNode(treeDataItem)
              } }
              selectable={ onSelected !== undefined }
              selectedKeys={ selectedKeys }
              showIcon
              switcherIcon={ handleCustomSwitcherIcon }
              titleRender={ (node) => {
                const component = (
                  <TreeElementItem
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
          </div>
        </Dropdown>
      )}
    </>
  )
}
export { TreeElement }
