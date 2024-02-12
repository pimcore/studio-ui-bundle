import React, { useContext } from 'react'
import { TreeNode, type TreeNodeProps } from '../node/tree-node'
import { TreeContext } from '../tree'

interface TreeListProps {
  node: TreeNodeProps
}

export const TreeList = ({ node }: TreeListProps): React.JSX.Element => {
  const { renderFilter: RenderFilter, renderPager: RenderPager, nodeApiHook } = useContext(TreeContext)
  const { apiHookResult, dataTransformer, setAdditionalQueryParams } = nodeApiHook(node.id)
  const { isLoading, isError, data } = apiHookResult

  if (isLoading === true) {
    return <></>
  }

  if (isError === true) {
    return <>{'Error'}</>
  }

  const { nodes: children, total } = dataTransformer(data)

  return (
    <>
      {RenderFilter !== undefined && (<RenderFilter node={node} setAdditionalQueryParams={setAdditionalQueryParams} />)}

      <div className='tree-list'>
        {children?.map((item) => (
          <TreeNode key={item.id} {...item} />
        ))}
      </div>

      {RenderPager !== undefined && (<RenderPager node={node} total={total} setAdditionalQueryParams={setAdditionalQueryParams} />)}
    </>
  )
}
