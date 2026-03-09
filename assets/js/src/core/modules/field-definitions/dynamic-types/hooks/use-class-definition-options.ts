/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useMemo } from 'react'
import { useClassDefinitionGetTreeQuery, type ClassDefinitionTreeNodeItem, type ClassDefinitionTreeNodeFolder } from '@sdk/api/class-definition'
import { flatMap, isArray, isEmpty, isUndefined } from 'lodash'

export interface SelectOption {
  label: string
  value: string
}

export interface UseClassDefinitionOptionsReturn {
  options: SelectOption[]
  refetch: () => void
  isLoading: boolean
}

type TreeNode = ClassDefinitionTreeNodeItem | ClassDefinitionTreeNodeFolder

const hasChildren = (node: TreeNode): node is ClassDefinitionTreeNodeFolder => {
  return 'children' in node && isArray(node.children) && !isEmpty(node.children)
}

const flattenTreeNodes = (nodes: TreeNode[]): SelectOption[] => {
  return flatMap(nodes, (node) => {
    const currentNode: SelectOption = { label: node.name, value: node.name }

    if (hasChildren(node)) {
      return [currentNode, ...flattenTreeNodes(node.children)]
    }

    return [currentNode]
  })
}

export const useClassDefinitionOptions = (includeFolder: boolean = false): UseClassDefinitionOptionsReturn => {
  const { data: selectOptionsTree, refetch, isFetching } = useClassDefinitionGetTreeQuery({ withGroup: true })

  const options = useMemo(() => {
    const result: SelectOption[] = []

    if (includeFolder) {
      result.push({ label: 'folder', value: 'folder' })
    }

    if (!isUndefined(selectOptionsTree?.items)) {
      result.push(...flattenTreeNodes(selectOptionsTree.items))
    }

    return result
  }, [selectOptionsTree, includeFolder])

  return {
    options,
    refetch: refetch ?? (() => {}),
    isLoading: isFetching
  }
}
