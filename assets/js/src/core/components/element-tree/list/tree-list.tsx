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
// import { UploadProgress } from '@Pimcore/components/upload/upload-progress/upload-progress'
import { UploadContext } from '@Pimcore/modules/element/upload/upload-provider'
import { Skeleton } from './../skeleton/skeleton'
import { UploadProgress } from '@Pimcore/components/upload/upload-progress/upload-progress'

interface TreeListProps {
  node: TreeNodeProps
}

const { useToken } = theme

export const TreeList = ({ node }: TreeListProps): React.JSX.Element => {
  const { token } = useToken()
  const { styles } = useStyles()
  const { renderFilter: RenderFilter, renderPager: RenderPager, renderNode: RenderNode, nodeApiHook } = useContext(TreeContext)
  const { apiHookResult, dataTransformer, mergeAdditionalQueryParams } = nodeApiHook(node)
  const { isLoading, isFetching, isError, data } = apiHookResult
  const { uploadFileList, uploadingNode } = useContext(UploadContext)!

  if (isLoading === true) {
    return (
      <Skeleton style={ { paddingLeft: token.paddingSM + (node.level + 1.5) * 24 } } />
    )
  }

  if (isError === true) {
    return <>{'Error'}</>
  }

  const { nodes: children, total } = dataTransformer(data)

  /* saved: uploadFileList.length > 0 && item.parentId === uploadingNode */

  return (
    <>
      {RenderFilter !== undefined && (
        <div
          className={ ['tree-list__search', styles['tree-list__search']].join(' ') }
          style={ { paddingLeft: token.paddingSM + (node.level + 1) * 24 } }
        >
          <RenderFilter
            isLoading={ isFetching }
            mergeAdditionalQueryParams={ mergeAdditionalQueryParams }
            node={ node }
            total={ total }
          />
        </div>
      )}

      <div className='tree-list'>
        {/* eslint-disable-next-line @typescript-eslint/no-confusing-void-expression */}
        {/* console.log(node.id, ' === ', uploadingNode) */}
        {/* uploadFileList.length > 0 && node.id === uploadingNode && (
          <div
            className={ ['tree-list__upload', styles['tree-list__search']].join(' ') }
            style={ { paddingLeft: token.paddingSM + (node.level + 1) * 24 } }
          >
            <UploadProgress
              items={ uploadFileList }
              locale={ { uploading: 'uploading' } }
              showRemoveIcon={ false }
            />
          </div>
        ) */}

        {(Boolean(children.some(item => item.parentId === uploadingNode))) && (
          <div
            className={ ['tree-list__upload', styles['tree-list__search']].join(' ') }
            style={ { paddingLeft: token.paddingSM + (node.level + 1) * 24 } }
          >
            <UploadProgress
              items={ uploadFileList }
              locale={ { uploading: 'uploading' } }
              showRemoveIcon={ false }
            />
          </div>
        )}

        {children?.map((item, index) => (
          <>
            {item.parentId !== uploadingNode && (
            <RenderNode
              internalKey={ `${node.internalKey}-${index}` }
              key={ item.id }
              { ...item }
            />
            )}
          </>
        ))}
      </div>

      {RenderPager !== undefined && (
        <div
          className={ ['tree-list__pager', styles['tree-list__pager']].join(' ') }
          style={ { paddingLeft: token.paddingSM + (node.level + 1) * 24 } }
        >
          <RenderPager
            mergeAdditionalQueryParams={ mergeAdditionalQueryParams }
            node={ node }
            total={ total }
          />
        </div>
      )}
    </>
  )
}
