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
import { useTagFilter } from '../context-layer/provider/tag-filter/use-tag-filter'
import { tagFilterType, untaggedPqlCondition } from '../context-layer/provider/tag-filter/tag-filter-provider'
import { addPqlCondition } from '@Pimcore/modules/element/listing/decorators/general-filters/element-filters/pql-condition'
import { type ColumnFilter } from '@Pimcore/modules/app/types/column-filter'

export const withTagFilterQueryArg = (useBaseHook: AbstractDecoratorProps['useDataQueryHelper']): AbstractDecoratorProps['useDataQueryHelper'] => {
  const useDataQueryHelperTagFilterExtension: AbstractDecoratorProps['useDataQueryHelper'] = () => {
    const { getArgs: baseGetArgs, ...baseMethods } = useBaseHook()
    const { getDataQueryArg, tags, onlyUntagged } = useTagFilter()

    const getArgs: typeof baseGetArgs = () => {
      const baseArgs = baseGetArgs()
      const tagFilter = getDataQueryArg()

      const currentColumnFilters = baseArgs.body.filters.columnFilters ?? []
      let newColumnFilters = [
        ...currentColumnFilters.filter((currentFilter) => currentFilter.type !== tagFilterType)
      ]

      if (tags.length > 0 && !onlyUntagged) {
        newColumnFilters.push(tagFilter)
      }

      if (onlyUntagged) {
        newColumnFilters = addPqlCondition(newColumnFilters as ColumnFilter[], untaggedPqlCondition)
      }

      return {
        ...baseArgs,
        body: {
          ...baseArgs.body,
          filters: {
            ...baseArgs.body.filters,
            columnFilters: newColumnFilters
          }
        }
      }
    }

    return {
      ...baseMethods,
      getArgs
    }
  }

  return useDataQueryHelperTagFilterExtension
}
