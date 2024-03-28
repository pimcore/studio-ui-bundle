import React, { useContext } from 'react'
import { TreeNode, type TreeNodeProps } from '../node/tree-node'
import { TreeContext } from '../tree'
import { theme } from 'antd'
import { useStyles } from './tree-list.styles'

interface TreeListProps {
  node: TreeNodeProps
}

const { useToken } = theme

export const TreeList = ({ node }: TreeListProps): React.JSX.Element => {
  const { token } = useToken()
  const { styles } = useStyles()
  const { renderFilter: RenderFilter, renderPager: RenderPager, nodeApiHook } = useContext(TreeContext)
  const { apiHookResult, dataTransformer, setAdditionalQueryParams } = nodeApiHook(node)
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
      {RenderFilter !== undefined && (
        <RenderFilter
          node={ node }
          setAdditionalQueryParams={ setAdditionalQueryParams }
        />
      )}

      <div className='tree-list'>
        {children?.map((item) => (
          <TreeNode
            key={ item.id }
            { ...item }
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
            setAdditionalQueryParams={ setAdditionalQueryParams }
            total={ total }
          />
        </div>
      )}
    </>
  )
}
