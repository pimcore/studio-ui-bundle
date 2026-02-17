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
import { useClassDefinitionGetTreeQuery } from '@sdk/api/class-definition'

export const useClassDefinitionOptions = (includeFolder: boolean = false): { options: Array<{ label: string, value: string }>, refetch: () => void, isLoading: boolean } => {
  const { data: selectOptionsTree, refetch, isFetching, status } = useClassDefinitionGetTreeQuery({ withGroup: true })

  const options = useMemo(() => {
    const result: Array<{ label: string, value: string }> = []

    if (includeFolder) {
      result.push({ label: 'folder', value: 'folder' })
    }

    const walk = (items: any[]): void => {
      items.forEach((item) => {
        result.push({ label: item.name, value: item.id })
        if (Array.isArray(item.children) && item.children.length > 0) {
          walk(item.children as any[])
        }
      })
    }

    if (selectOptionsTree?.items !== undefined) {
      walk(selectOptionsTree.items)
    }

    return result
  }, [selectOptionsTree, includeFolder])

  return {
    options,
    refetch: status === 'uninitialized' ? () => {} : refetch,
    isLoading: isFetching
  }
}
