/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useTypeSelect } from '@Pimcore/modules/element/components/type-select/provider/use-type-select'
import { type AbstractDecoratorProps } from '@Pimcore/modules/element/listing/decorators/abstract-decorator'

export const withTypeFilter = (useBaseHook: AbstractDecoratorProps['useDataQueryHelper']): AbstractDecoratorProps['useDataQueryHelper'] => {
  const useWithFilters: typeof useBaseHook = () => {
    const { getArgs: baseGetArgs, ...baseProps } = useBaseHook()
    const { value } = useTypeSelect()

    const getArgs: typeof baseGetArgs = () => {
      const baseArgs = baseGetArgs()

      return {
        ...baseArgs,
        body: {
          ...baseArgs.body ?? {},
          filters: {
            ...baseArgs.body.filters ?? {},
            columnFilters: [
              ...(baseArgs.body.filters?.columnFilters ?? []),
              ...(value === null
                ? []
                : [{
                    key: 'type',
                    filterValue: value,
                    type: 'system.string'
                  }])
            ]
          }
        }
      }
    }

    return {
      ...baseProps,
      getArgs
    }
  }

  return useWithFilters
}
