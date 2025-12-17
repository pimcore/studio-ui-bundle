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
import { useSorting } from '../context-layer/provider/sorting-provider/use-sorting'
import { useSelectedColumns } from '../../../abstract/configuration-layer/provider/selected-columns/use-selected-columns'
import { useLanguageSelection } from '@Pimcore/components/language-selection/provider/use-language-selection'

export interface SortingFilter {
  key: string
  locale?: string
  direction: 'asc' | 'desc'
}

export const withSortingDataQueryArg = (useBaseHook: AbstractDecoratorProps['useDataQueryHelper']): AbstractDecoratorProps['useDataQueryHelper'] => {
  const useDataQueryHelperSortingExtension: AbstractDecoratorProps['useDataQueryHelper'] = () => {
    const { getArgs: baseGetArgs, ...baseMethods } = useBaseHook()
    const { sorting } = useSorting()
    const { decodeColumnIdentifier } = useSelectedColumns()
    const { currentLanguage } = useLanguageSelection()

    const getArgs: typeof baseGetArgs = () => {
      const baseArgs = baseGetArgs()
      const isDataObject = 'classId' in baseArgs

      const sortingFilter: SortingFilter[] = []

      for (const sort of sorting ?? []) {
        const selectedColumn = decodeColumnIdentifier(sort.id)

        if (selectedColumn === undefined) {
          continue
        }

        sortingFilter.push({
          key: selectedColumn?.config?.filters?.key ?? selectedColumn.key,
          locale: selectedColumn.localizable ? selectedColumn.locale ?? (isDataObject ? currentLanguage : undefined) : undefined,
          direction: sort.desc ? 'desc' : 'asc'
        })
      }

      return {
        ...baseArgs,
        body: {
          ...baseArgs.body,
          filters: {
            ...baseArgs.body.filters,
            ...(sortingFilter.length > 0 ? { sortFilter: sortingFilter[0] } : {})
          }
        }
      }
    }

    return {
      ...baseMethods,
      getArgs
    }
  }

  return useDataQueryHelperSortingExtension
}
