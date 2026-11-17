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

      // PQL has no documented escape sequence for quotes or its own "*"/"?" wildcards, so a
      // folder name containing them is a known limitation here, same as typing it into the
      // PQL box directly would be.
      const folderCondition = `fullPath LIKE "${folderPath}/*"`
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
