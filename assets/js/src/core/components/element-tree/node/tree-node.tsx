/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Flex } from 'antd'
import React, { forwardRef, type MutableRefObject, useContext, useEffect } from 'react'
import { useStyles } from './tree-node.styles'
import { TreeContext } from '../element-tree'
import { TreeList } from '../list/tree-list'
import { TreeExpander } from '../expander/tree-expander'
import { type ElementPermissions } from '@Pimcore/modules/element/element-api-slice-enhanced'
import { type ElementIcon } from '@Pimcore/modules/asset/asset-api-slice.gen'
import { useElementTreeNode } from '../hooks/use-element-tree-node'
import { isNil } from 'lodash'
import { scrollToNodeElement } from '@Pimcore/modules/widget-manager/widget/utils/widget-content-scroll'
import { createNodeTestId } from '@Pimcore/utils/test-id-generator'
import { useTreeNodeInteraction } from './use-tree-node-interaction'
import { ComponentRenderer } from '@Pimcore/modules/app/component-registry/component-renderer'
import cn from 'classnames'
import { useTreeNodeHighlight } from '../hooks/use-tree-node-highlight'

export type TreeNodeWrapper = (children: React.ReactNode) => React.ReactNode
export interface TreeNodeProps {
  id: string
  icon: ElementIcon
  label: string
  // Real element key (not the display label, which may be overridden by customAttributes.key)
  realKey?: string
  labelAddon?: string
  internalKey: string
  children?: TreeNodeProps[]
  level: number
  permissions: ElementPermissions
  locked: string | null
  isLocked: boolean
  elementType?: string
  hasChildren?: boolean
  fullPath?: string
  metaData?: any
  type?: string
  parentId?: string
  isRoot?: boolean
  isLoading?: boolean
  /** Briefly highlights a node that was just added to its list, e.g. after creating or pasting it. */
  isRecentlyAdded?: boolean
  danger?: boolean
  ref?: MutableRefObject<HTMLDivElement>
  isPublished?: boolean
  isSite?: boolean
  wrapNode?: TreeNodeWrapper
}

export const defaultProps: TreeNodeProps = {
  id: Math.random().toString(16).slice(2),
  internalKey: '',
  icon: {
    type: 'name',
    value: 'folder'
  },
  label: '',
  labelAddon: undefined,
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

const TreeNode = forwardRef(function ForwardedTreeNode ({
  id = defaultProps.id,
  internalKey = defaultProps.internalKey,
  icon = defaultProps.icon,
  label = defaultProps.label,
  level = defaultProps.level,
  isRoot = defaultProps.isRoot,
  isLoading = false,
  danger = false,
  wrapNode = (children: React.ReactNode): React.ReactNode => children,
  ...props
}: TreeNodeProps, forwardRef: MutableRefObject<HTMLDivElement>): React.JSX.Element {
  const { styles } = useStyles()
  const {
    renderNodeContent: RenderNodeContent,
    nodesRefs,
    hasRootNode,
    tooltipSlotName
  } = useContext(TreeContext)
  const nodeState = useElementTreeNode(id)
  const { isExpanded, setExpanded, isSelected, isActive, isScrollTo, setScrollTo } = nodeState
  const { isHighlighted, highlight } = useTreeNodeHighlight(props.isRecentlyAdded === true)
  const treeNodeProps = { id, icon, label, internalKey, level, isLoading, isRoot, danger, ...props }
  const { onClick, onContextMenu, onKeyDown } = useTreeNodeInteraction(treeNodeProps, nodeState)

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
        highlight()
      }
    }
  }, [isScrollTo, nodesRefs, internalKey, setScrollTo])

  const contentClassName = cn('tree-node__content', { 'tree-node__content--selected': isSelected, 'tree-node__content--active': isActive, 'tree-node__content--highlighted': isHighlighted })

  function getClasses (): string {
    const classes = ['tree-node', styles.treeNode]

    if (danger) {
      classes.push('tree-node--danger')
    }

    if (isRoot === true) {
      classes.push('tree-node--is-root')
    }

    return classes.join(' ')
  }

  function setRef (el: HTMLElement): void {
    nodesRefs!.current[internalKey] = { el, node: treeNodeProps }
  }

  const isExpandable = props.hasChildren === true

  // the visible root is rendered with level -1 and its children with level 0,
  // so shift by one more when the root is shown to keep aria-level starting at 1
  const ariaLevel = level + (hasRootNode === true ? 2 : 1)

  const nodeContent = (
    <Flex
      align="center"
      aria-expanded={ isExpandable ? isExpanded : undefined }
      aria-level={ ariaLevel }
      aria-selected={ isSelected }
      className={ cn('tree-node__content-inner') }
      gap="small"
      justify="center"
      onClick={ onClick }
      onContextMenu={ onContextMenu }
      onKeyDown={ onKeyDown }
      ref={ setRef }
      role='treeitem'
      // The tree container moves the one Tab stop to the selected (else first) node; see useRovingTabStop.
      tabIndex={ -1 }
    >
      <Flex
        align="center"
        className='tree-node__content-wrapper-outer w-full'
        justify="center"
      >
        {isRoot !== true && (
        <TreeExpander
          node={ treeNodeProps }
          state={ [isExpanded, setExpanded] }
        />
        )}
        <div className="tree-node__content-wrapper">
          <RenderNodeContent node={ treeNodeProps } />
        </div>
      </Flex>
    </Flex>
  )

  return (
    <div
      className={ getClasses() }
      data-testid={ createNodeTestId(id, props.elementType) }
      ref={ forwardRef }
    >
      {!isNil(tooltipSlotName)
        ? (
          <ComponentRenderer
            component={ tooltipSlotName }
            props={ {
              node: treeNodeProps,
              children: (
                <div className={ contentClassName }>
                  {wrapNode(nodeContent)}
                </div>
              )
            } }
          />
          )
        : (
          <div className={ contentClassName }>
            {wrapNode(nodeContent)}
          </div>
          )}

      {isExpanded && (
        <TreeList node={ treeNodeProps } />
      )}
    </div>
  )
})

export { TreeNode }
