/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */


import { type AbstractDecoratorProps } from '@Pimcore/modules/element/listing/decorators/abstract-decorator'
import { pqlFilterType } from '@Pimcore/modules/element/listing/decorators/general-filters/context-layer/provider/pql-filter/pql-filter-provider'
import { useFolderNavigation } from '../context-layer/provider/folder-navigation/use-folder-navigation'
import { elementRootId } from '../context-layer/provider/folder-navigation/folder-navigation-provider'
import { escapePqlLikeValue } from './escape-pql-like-value'

/**
 * The search endpoints behind the element selector (asset/document/data-object pickers)
 * have no folder-scoping parameter of their own - unlike the regular browsing grid, which
 * is scoped to whatever folder its routed tab is open on. The only way to restrict a search
 * to a folder is a PQL "fullPath LIKE" condition, so that's what folder navigation (PEES-1975)
 * contributes here, combined with any PQL the user typed themselves rather than replacing it.
 */
export const withFolderNavigationQueryArg = (useBaseHook: AbstractDecoratorProps['useDataQueryHelper']): AbstractDecoratorProps['useDataQueryHelper'] => {
  const useDataQueryHelperFolderNavigationExtension: AbstractDecoratorProps['useDataQueryHelper'] = () => {
    const { getArgs: baseGetArgs, ...baseMethods } = useBaseHook()
    const { folderId, folderPath } = useFolderNavigation()

    const getArgs: typeof baseGetArgs = () => {
      const baseArgs = baseGetArgs()

      if (folderId === elementRootId) {
        return baseArgs
      }

      const currentColumnFilters = baseArgs.body.filters?.columnFilters ?? []
      const existingPqlFilter = currentColumnFilters.find((filter: { type: string }) => filter.type === pqlFilterType)
      const otherColumnFilters = currentColumnFilters.filter((filter: { type: string }) => filter.type !== pqlFilterType)

      // A folder name can contain a quote or a wildcard metacharacter, so it has to be escaped
      // before it's interpolated into the PQL string - otherwise it could break out of the
      // literal or widen the match to assets outside the selected folder.
      const escapedPath = escapePqlLikeValue(folderPath)
      const includeDescendants = baseArgs.body.filters?.includeDescendants ?? true
      const folderCondition = includeDescendants
        ? `fullPath LIKE "${escapedPath}/*"`
        : `(fullPath LIKE "${escapedPath}/*") AND (fullPath NOT LIKE "${escapedPath}/*/*")`
      const pqlQuery = existingPqlFilter?.filterValue
        ? `(${existingPqlFilter.filterValue}) AND (${folderCondition})`
        : folderCondition

      return {
        ...baseArgs,
        body: {
          ...baseArgs.body,
          filters: {
            ...baseArgs.body.filters,
            columnFilters: [
              ...otherColumnFilters,
              { type: pqlFilterType, filterValue: pqlQuery }
            ]
          }
        }
      }
    }

    return {
      ...baseMethods,
      getArgs
    }
  }

  return useDataQueryHelperFolderNavigationExtension
}
