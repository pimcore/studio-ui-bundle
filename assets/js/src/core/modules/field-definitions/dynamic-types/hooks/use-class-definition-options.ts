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

export const useClassDefinitionOptions = (includeFolder: boolean = false): Array<{ label: string, value: string }> => {
  const { data: selectOptionsTree } = useClassDefinitionGetTreeQuery({ withGroup: true })

  return useMemo(() => {
    const options: Array<{ label: string, value: string }> = []

    if (includeFolder) {
      options.push({ label: 'folder', value: 'folder' })
    }

    const walk = (items: any[]): void => {
      items.forEach((item) => {
        options.push({ label: item.name, value: item.id })
        if (Array.isArray(item.children) && item.children.length > 0) {
          walk(item.children as any[])
        }
      })
    }

    if (selectOptionsTree?.items !== undefined) {
      walk(selectOptionsTree.items)
    }

    return options
  }, [selectOptionsTree])
}
