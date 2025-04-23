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

import { Flex, theme } from 'antd'
import React, { forwardRef, type KeyboardEvent, type MouseEvent, type MutableRefObject, useContext, useEffect } from 'react'
import { useStyles } from './tree-node.styles'
import { type INodeRef, TreeContext } from '../element-tree'
import { TreeList } from '../list/tree-list'
import { TreeExpander } from '../expander/tree-expander'
import { type ElementPermissions } from '@Pimcore/modules/element/element-api-slice-enhanced'
import { type ElementIcon } from '@Pimcore/modules/asset/asset-api-slice.gen'
import { useElementTreeNode } from '../hooks/use-element-tree-node'
import { isNil } from 'lodash'
import { scrollToNodeElement } from '@Pimcore/modules/widget-manager/widget/utils/widget-content-scroll'
import { DndUpload } from '@Pimcore/components/element-tree/dnd-upload/dnd-upload'
import { type ElementType } from '@Pimcore/types/enums/element/element-type'

export interface TreeNodeProps {
  id: string
  icon: ElementIcon
  label: string
  internalKey: string
  children?: TreeNodeProps[]
  level: number
  permissions: ElementPermissions
  locked: string | null
  isLocked: boolean
  elementType?: ElementType
  hasChildren?: boolean
  metaData?: any
  type?: string
  parentId?: string
  isRoot?: boolean
  isLoading?: boolean
  danger?: boolean
  ref?: MutableRefObject<HTMLDivElement>
  isPublished?: boolean
}

export const defaultProps: TreeNodeProps = {
  id: Math.random().toString(16).slice(2),
  internalKey: '',
  icon: {
    type: 'name',
    value: 'folder'
  },
  label: '',
  children: [],
  permissions: {
    list: false,
    view: false,
    publish: false,
    delete: false,
    rename: false,
    create: false,
    settings: false,
    versions: false,
    properties: false
  },
  level: 0,
  locked: null,
  isLocked: false,
  isRoot: false
}

const { useToken } = theme

const TreeNode = forwardRef(function ForwardedTreeNode ({
  id = defaultProps.id,
  internalKey = defaultProps.internalKey,
  icon = defaultProps.icon,
  label = defaultProps.label,
  level = defaultProps.level,
  isRoot = defaultProps.isRoot,
  isLoading = false,
  danger = false,
  ...props
}: TreeNodeProps, forwardRef: MutableRefObject<HTMLDivElement>): React.JSX.Element {
  const { token } = useToken()
  const { metaData } = props
  const { styles } = useStyles()
  const {
    renderNodeContent: RenderNodeContent,
    onSelect,
    onRightClick,
    nodesRefs,
    nodeOrder
  } = useContext(TreeContext)
  const { isExpanded, setExpanded, isSelected, isScrollTo, setScrollTo, setSelectedIds } = useElementTreeNode(id)
  const treeNodeProps = { id, icon, label, internalKey, level, isLoading, isRoot, danger, ...props }

  useEffect(() => {
    return () => {
      if (nodesRefs !== undefined) {
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete nodesRefs.current[internalKey]
      }
    }
  }, [])

  useEffect(() => {
    if (isScrollTo) {
      const nodeElement = nodesRefs?.current[internalKey]?.el

      if (!isNil(nodeElement)) {
        scrollToNodeElement(nodeElement)
        setScrollTo(false)
      }
    }
  }, [isScrollTo, nodesRefs, internalKey, setScrollTo])

  function getClasses (): string {
    const classes = ['tree-node', styles.treeNode]

    if (isSelected) {
      classes.push('tree-node--selected')
    }

    if (danger) {
      classes.push('tree-node--danger')
    }

    if (isRoot === true) {
      classes.push('tree-node--is-root')
    }

    return classes.join(' ')
  }

  function selectNode (): void {
    setSelectedIds([id])

    if (onSelect !== undefined) {
      onSelect(treeNodeProps)
    }
  }

  function onClick (event: MouseEvent): void {
    selectNode()
  }

  function onContextMenu (event: MouseEvent): void {
    if (onRightClick !== undefined) {
      onRightClick(event, treeNodeProps)
    }
  }

  function onKeyDown (event: React.KeyboardEvent): void {
    if (event.key === 'Enter') {
      selectNode()
    }

    if (event.key === 'ArrowRight') {
      expandItem()
    }

    if (event.key === 'ArrowLeft') {
      collapseItem()
    }

    if (event.key === 'ArrowDown') {
      gotoNextNode(event)
    }

    if (event.key === 'ArrowUp') {
      gotoPreviousNode(event)
    }
  }

  function expandItem (): void {
    setExpanded(true)
  }

  function collapseItem (): void {
    setExpanded(false)
  }

  function gotoNextNode (event: KeyboardEvent): void {
    event.preventDefault()

    const index = nodeOrder!().indexOf(internalKey)

    if (index < nodeOrder!().length - 1) {
      nodesRefs!.current[nodeOrder!()[index + 1]].el.focus()
    }
  }

  function gotoPreviousNode (event: KeyboardEvent): void {
    event.preventDefault()

    const index = nodeOrder!().indexOf(internalKey)

    if (index > 0) {
      nodesRefs!.current[nodeOrder!()[index - 1]].el.focus()
    }
  }

  function setRef (el: HTMLElement): void {
    registerNode(el)
  }

  function registerNode (el: HTMLElement): void {
    const nodeRef: INodeRef = { el, node: treeNodeProps }
    nodesRefs!.current[internalKey] = nodeRef
  }

  function onDragOver (event: MouseEvent): void {
    const assetMetaData = metaData?.asset

    if (assetMetaData !== undefined && assetMetaData.type === 'folder') {
      setSelectedIds([id])
    }
  }

  return (
    <div
      className={ getClasses() }
      onDragOver={ onDragOver }
      ref={ forwardRef }
    >
      <Flex
        className='tree-node__content'
        gap="small"
        onClick={ onClick }
        onContextMenu={ onContextMenu }
        onKeyDown={ onKeyDown }
        ref={ setRef }
        role='button'
        style={
          {
            paddingLeft: token.paddingSM + 20 * level,
            minWidth: `${20 * level + 200}px`
          }
        }
        tabIndex={ -1 }
      >
        {isRoot !== true && (
          <TreeExpander
            node={ treeNodeProps }
            state={ [isExpanded, setExpanded] }
          />
        )}

        <DndUpload
          nodeId={ id }
          nodeType={ props.elementType! }
        >
          <div className="tree-node__content-wrapper">
            <RenderNodeContent node={ treeNodeProps } />
          </div>
        </DndUpload>
      </Flex>

      {isExpanded && (
        <TreeList node={ treeNodeProps } />
      )}
    </div>
  )
})

export { TreeNode }
