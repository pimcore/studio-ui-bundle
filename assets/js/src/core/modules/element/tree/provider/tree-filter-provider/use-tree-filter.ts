/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useContext } from 'react'
import { TreeFilterContext, type ITreeFilterContext } from './tree-filter-provider'

export const useTreeFilter = (): ITreeFilterContext & {
  treeFilterArgs: {
    classIds?: string
    pqlQuery?: string
  }
} => {
  let context = useContext(TreeFilterContext)

  if (context === undefined) {
    context = { pageSize: 30 }
  }

  return {
    ...context,
    treeFilterArgs: {
      classIds: context.classIds === undefined || context.classIds.length === 0 ? undefined : JSON.stringify(context.classIds),
      pqlQuery: context.pqlQuery
    }
  }
}
