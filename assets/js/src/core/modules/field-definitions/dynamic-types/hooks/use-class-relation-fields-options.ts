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
import { useClassGetFieldsByTypeQuery, useClassDefinitionGetTreeQuery, type ClassDefinitionTreeNodeItem, type ClassDefinitionTreeNodeFolder } from '@Pimcore/modules/class-definition/class-definition-slice-enhanced'
import { flatMap, isArray, isEmpty } from 'lodash'

const RELATION_FIELD_TYPES = 'manyToManyObjectRelation,manyToOneRelation'

type TreeNode = ClassDefinitionTreeNodeItem | ClassDefinitionTreeNodeFolder

const flattenTreeNodes = (nodes: TreeNode[]): ClassDefinitionTreeNodeItem[] => {
  return flatMap(nodes, (node) => {
    if ('children' in node && isArray(node.children) && !isEmpty(node.children)) {
      return [...flattenTreeNodes(node.children)]
    }
    return [node as ClassDefinitionTreeNodeItem]
  })
}

export const useClassRelationFieldsOptions = (className: string | undefined): { options: Array<{ label: string, value: string }>, isLoading: boolean } => {
  const { data: treeData, isFetching: isFetchingTree } = useClassDefinitionGetTreeQuery({ withGroup: true }, { skip: className === undefined || className === '' })

  const classId = useMemo(() => {
    if (treeData === undefined) return undefined
    const allNodes = flattenTreeNodes(treeData.items)
    return allNodes.find((node) => node.name === className)?.id
  }, [treeData, className])

  const { data, isFetching: isFetchingFields } = useClassGetFieldsByTypeQuery(
    { classId: classId!, type: RELATION_FIELD_TYPES },
    { skip: classId === undefined }
  )

  const options = useMemo(() => {
    return data?.items.map((item) => ({
      label: item.key,
      value: item.key
    })) ?? []
  }, [data])

  return {
    options,
    isLoading: isFetchingTree || isFetchingFields
  }
}
