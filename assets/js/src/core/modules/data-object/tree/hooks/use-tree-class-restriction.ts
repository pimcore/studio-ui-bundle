/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type TreeNodeProps } from '@Pimcore/components/element-tree/node/tree-node'
import { useTreeFilter } from '@Pimcore/components/element-tree/provider/tree-filter-provider/use-tree-filter'
import { type Element } from '@Pimcore/modules/element/element-helper'
import { type ClipboardEntry, useTreeCopyPasteContext } from '@Pimcore/modules/element/actions/copy-paste/tree-copy-paste-context'
import { useClassDefinitions } from '@Pimcore/modules/data-object/utils/provider/class-defintions/use-class-definitions'
import { isEmpty, isUndefined } from 'lodash'

type Source = TreeNodeProps | Element | ClipboardEntry | undefined

export interface UseTreeClassRestrictionReturn {
  isClassAllowed: (source: Source) => boolean
  isPasteHiddenForClass: () => boolean
}

const getClassName = (source: Source): string | undefined => {
  if (isUndefined(source)) {
    return undefined
  }

  if ('className' in source) {
    return source.className
  }

  return (source as TreeNodeProps).metaData?.dataObject?.className
}

/**
 * Element tree widgets can restrict the visible classes via their `classes` allowlist.
 * Pasting or moving an object of another class into such a tree would make it invisible there.
 */
export const useTreeClassRestriction = (): UseTreeClassRestrictionReturn => {
  const { classIds } = useTreeFilter()
  const { getByName } = useClassDefinitions()
  const { getStoredNode, getStoredNodes } = useTreeCopyPasteContext('data-object')

  const isClassAllowed = (source: Source): boolean => {
    if (isUndefined(classIds) || classIds.length === 0) {
      return true
    }

    if (!isUndefined(source) && 'type' in source && source.type === 'folder') {
      return true
    }

    const className = getClassName(source)

    if (isUndefined(className) || isEmpty(className)) {
      return true
    }

    const classId = getByName(className)?.id

    return !isUndefined(classId) && classIds.includes(classId)
  }

  /**
   * A single copy or cut keeps the full node; a cut selection only keeps its entries.
   * A selection stays pastable while at least one of them fits - the rest is skipped.
   */
  const isPasteHiddenForClass = (): boolean => {
    const storedNode = getStoredNode()

    if (!isUndefined(storedNode)) {
      return !isClassAllowed(storedNode)
    }

    const storedEntries = getStoredNodes()

    return storedEntries.length > 0 && !storedEntries.some(isClassAllowed)
  }

  return {
    isClassAllowed,
    isPasteHiddenForClass
  }
}
