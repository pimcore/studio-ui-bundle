/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import { type AbstractDecoratorProps } from '@Pimcore/modules/element/listing/decorators/abstract-decorator'
import { useSorting } from '../context-layer/provider/sorting-provider/use-sorting'
import { useSelectedColumns } from '../../../abstract/configuration-layer/provider/selected-columns/use-selected-columns'

export const withSortingDataQueryArg = (useBaseHook: AbstractDecoratorProps['useDataQueryHelper']): AbstractDecoratorProps['useDataQueryHelper'] => {
  const useDataQueryHelperSortingExtension: AbstractDecoratorProps['useDataQueryHelper'] = () => {
    const { getArgs: baseGetArgs, ...baseMethods } = useBaseHook()
    const { sorting } = useSorting()
    const { decodeColumnIdentifier } = useSelectedColumns()

    const getArgs: typeof baseGetArgs = () => {
      const baseArgs = baseGetArgs()
      const sortingFilter = sorting?.map((sort) => {
        const selectedColumn = decodeColumnIdentifier(sort.id)

        return {
          key: selectedColumn!.key,
          locale: selectedColumn!.locale,
          direction: sort.desc ? 'desc' : 'asc'
        }
      })[0]

      return {
        ...baseArgs,
        body: {
          ...baseArgs.body,
          filters: {
            ...baseArgs.body.filters,
            ...(sortingFilter !== undefined ? { sortFilter: sortingFilter } : {})
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
