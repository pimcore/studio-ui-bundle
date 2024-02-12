import { Pagination, PaginationProps } from 'antd';
import React, { Dispatch, useContext } from 'react'
import { TreeContext } from '../../tree';
import { TreeNodeProps } from '../../node/tree-node';

export interface TreePagerProps {
  node: TreeNodeProps,
  setAdditionalQueryParams: Dispatch<any>,
  total: number
}

const TreePager = (props: TreePagerProps): React.JSX.Element => {
  const { maxItemsPerNode } = useContext(TreeContext);
  const { children } = props.node;

  if (!children || children.length <= maxItemsPerNode) {
    return <></>;
  }

  return (
    <Pagination simple pageSize={maxItemsPerNode} total={children.length} />
  )
}

export {TreePager};
