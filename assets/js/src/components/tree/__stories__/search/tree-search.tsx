import React, { Dispatch, useContext } from 'react'
import { TreeNodeProps } from '../../node/tree-node'
import { Input, TabsProps } from 'antd'
import { TreeContext } from '../../tree';

const { Search } = Input;

export interface TreeSearchProps {
  node: TreeNodeProps,
  setAdditionalQueryParams?: Dispatch<any>
}

export interface tabstest {
  items: TabsProps[]
}

export const TreeSearch = (props: TreeSearchProps): React.JSX.Element => {
  const { maxItemsPerNode } = useContext(TreeContext);
  const { children } = props.node;

  if (!children || children.length <= maxItemsPerNode) {
    return <></>;
  }

  return <Search />
}
