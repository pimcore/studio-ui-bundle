/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useContext } from 'react'
import { type TreeNodeProps } from '../node/tree-node'
import { TreeContext } from '../element-tree'
import { theme } from 'antd'
import { useStyles } from './tree-list.styles'
import { Skeleton } from './../skeleton/skeleton'
import { useElementTreeNode } from '../hooks/use-element-tree-node'
import { TreeListNode } from './tree-list-node'

interface TreeListProps {
  node: TreeNodeProps
}

const { useToken } = theme

export const TreeList = ({ node }: TreeListProps): React.JSX.Element => {
  const { token } = useToken()
  const { styles } = useStyles()
  const { renderFilter: RenderFilter, renderPager: RenderPager } = useContext(TreeContext)
  const { isLoading, isFetching, getChildren, total } = useElementTreeNode(node.id)

  if (isLoading === true) {
    return (
      <Skeleton style={ { paddingLeft: token.paddingSM + (node.level + 1.5) * 24 } } />
    )
  }

  const childrenIds = getChildren()

  return (
    <>
      {RenderFilter !== undefined && (
        <div
          className={ ['tree-list__search', styles['tree-list__search']].join(' ') }
          data-testid={ `tree-list-search-level-${node.id}` }
          style={ { paddingLeft: token.paddingSM + (node.level + 1) * 24 } }
        >
          <RenderFilter
            isLoading={ isFetching }
            node={ node }
            total={ total ?? 0 }
          />
        </div>
      )}

      <div
        className='tree-list'
        data-testid={ `tree-list-${node.id}` }
      >
        {childrenIds.map((childId) => (
          <TreeListNode
            key={ childId }
            level={ node.level + 1 }
            nodeId={ childId }
          />
        ))}
      </div>

      {RenderPager !== undefined && (
        <div
          className={ ['tree-list__pager', styles['tree-list__pager']].join(' ') }
          data-testid={ `tree-list-pager-${node.id}` }
          style={ { paddingLeft: token.paddingSM + (node.level + 1) * 24 } }
        >
          <RenderPager
            node={ node }
            total={ total ?? 0 }
          />
        </div>
      )}
    </>
  )
}
