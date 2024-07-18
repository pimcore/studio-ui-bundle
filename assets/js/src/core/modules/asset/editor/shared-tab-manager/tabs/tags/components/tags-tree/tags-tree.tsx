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

import React, { type Key, useMemo, useState } from 'react'
import { Input, Tree, type TreeDataNode } from 'antd'
import { type Tag } from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/tags/tags-api-slice.gen'
import {
  useCreateTreeStructure
} from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/tags/components/tags-tree/hooks/use-create-tree-structure'
import {
  useStyle
} from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/tags/components/tags-tree/tags-tree.styles'

type TreeDataNodeWithCustomData = TreeDataNode & {
  customData?: {
    parentId: number
    hasChildren: boolean
  }
}

export const TagsTree = ({ tags }: { tags: Tag[] }): React.JSX.Element => {
  const { styles } = useStyle()
  const [expandedKeys, setExpandedKeys] = useState<Key[]>([])
  const [searchValue, setSearchValue] = useState('')
  const [autoExpandParent, setAutoExpandParent] = useState(true)
  const { createTreeStructure } = useCreateTreeStructure()

  const initialData = createTreeStructure({ tags })

  const dataList: Array<{ key: React.Key, title: string, parentId?: number, hasParent?: boolean }> = []
  const generateList = (data: TreeDataNode[]): void => {
    for (let i = 0; i < data.length; i++) {
      const node = data[i]
      const { key, customData } = node as TreeDataNodeWithCustomData
      dataList.push({
        key,
        title: node.title as string,
        ...customData
      })
      if (node.children!.length > 0) {
        generateList(node.children!)
      }
    }
  }
  generateList(initialData)

  const getParentKey = (key: React.Key, tree: TreeDataNode[]): React.Key => {
    let parentKey: React.Key
    const element = dataList.find((item) => item.key === key)
    if (element !== undefined) {
      parentKey = element.key!
    }

    return parentKey!

    /* let parentKey: React.Key
    for (let i = 0; i < tree.length; i++) {
      const node = tree[i]
      if (node.children!.length > 0) {
        if (node.children!.some((item) => item.key === key)) {
          parentKey = node.key
        } else if (getParentKey(key, node.children!) !== null) {
          parentKey = getParentKey(key, node.children!)
        }
      }
    }
    return parentKey! */
  }

  const onExpand = (newExpandedKeys: React.Key[]): void => {
    setExpandedKeys(newExpandedKeys)
    setAutoExpandParent(false)
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target
    const newExpandedKeys = dataList
      .map((item) => {
        if (item.title.toLowerCase().includes(value.toLowerCase())) {
          return getParentKey(item.key, initialData)
        }
        return null
      })
      .filter((item, i, self): item is React.Key => {
        console.log('item', item)
        console.log('self', self.indexOf(item))
        console.log('i', i)

        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        return !!(item && self.indexOf(item) === i)
      })
    setExpandedKeys(newExpandedKeys)
    setSearchValue(value)
    setAutoExpandParent(true)
  }

  const treeData = useMemo(() => {
    const loop = (data: TreeDataNode[]): TreeDataNode[] =>
      data.map((item) => {
        const strTitle = item.title as string
        const index = strTitle.indexOf(searchValue)
        const beforeStr = strTitle.substring(0, index)
        const afterStr = strTitle.slice(index + searchValue.length)
        const title =
          index > -1
            ? (
              <span key={ item.key }>
                {beforeStr}
                <span className="site-tree-search-value">{searchValue}</span>
                {afterStr}
              </span>
              )
            : (
              <span key={ item.key }>{strTitle}</span>
              )
        if (item.children !== null) {
          return { title, key: item.key, children: loop(item.children!) }
        }

        return {
          title,
          key: item.key
        }
      })

    return loop(initialData)
  }, [searchValue])

  return (
    <>
      <Input
        onChange={ onChange }
        placeholder="Search"
        style={ { marginBottom: 8 } }
      />

      <Tree
        autoExpandParent={ autoExpandParent }
        checkable
        className={ styles.tree }
        expandedKeys={ expandedKeys }
        onExpand={ onExpand }
        showIcon
        treeData={ treeData }
      />
    </>
  )
}
