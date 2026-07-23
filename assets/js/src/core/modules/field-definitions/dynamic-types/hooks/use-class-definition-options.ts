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
import { flatMap, isArray, isUndefined } from 'lodash'

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

const isFolderNode = (node: TreeNode): node is ClassDefinitionTreeNodeFolder => {
  return 'children' in node && isArray(node.children)
}

const flattenTreeNodes = (nodes: TreeNode[]): SelectOption[] => {
  return flatMap(nodes, (node) => {
    // Folder nodes are grouping containers, not selectable class definitions.
    // Including them would produce options that duplicate class names (a group
    // is often named after an existing class) or reference non-existent classes.
    if (isFolderNode(node)) {
      return flattenTreeNodes(node.children)
    }

    return [{ label: node.name, value: node.name }]
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
