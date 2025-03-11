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

import React, { useContext } from 'react'
import { type TreeNodeProps } from '../node/tree-node'
import { TreeContext } from '../element-tree'
import { theme } from 'antd'
import { useStyles } from './tree-list.styles'
import { Skeleton } from './../skeleton/skeleton'
import { useElementTreeNode } from '../hooks/use-element-tree-node'

interface TreeListProps {
  node: TreeNodeProps
}

const { useToken } = theme

export const TreeList = ({ node }: TreeListProps): React.JSX.Element => {
  const { token } = useToken()
  const { styles } = useStyles()
  const { renderFilter: RenderFilter, renderPager: RenderPager, renderNode: RenderNode } = useContext(TreeContext)
  const { isLoading, isFetching, getChildren, total } = useElementTreeNode(node.id)

  if (isLoading === true) {
    return (
      <Skeleton style={ { paddingLeft: token.paddingSM + (node.level + 1.5) * 24 } } />
    )
  }

  const children = getChildren()

  return (
    <>
      {RenderFilter !== undefined && (
        <div
          className={ ['tree-list__search', styles['tree-list__search']].join(' ') }
          style={ { paddingLeft: token.paddingSM + (node.level + 1) * 24 } }
        >
          <RenderFilter
            isLoading={ isFetching }
            node={ node }
            total={ total ?? 0 }
          />
        </div>
      )}

      <div className='tree-list'>
        {children?.map((item, index) => (
          <RenderNode
            key={ item.id }
            { ...item }
            level={ node.level + 1 }
          />
        ))}
      </div>

      {RenderPager !== undefined && (
        <div
          className={ ['tree-list__pager', styles['tree-list__pager']].join(' ') }
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
