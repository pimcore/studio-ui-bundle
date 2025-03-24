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

import { type AbstractDecoratorProps } from '../../../../abstract-decorator'
import { usePaging } from '../../../context-layer/paging/provider/use-paging'

export const withFilters = (useBaseHook: AbstractDecoratorProps['useDataQueryHelper']): AbstractDecoratorProps['useDataQueryHelper'] => {
  const useWithFilters: typeof useBaseHook = () => {
    const { getArgs: baseGetArgs, hasRequiredArgs, ...baseProps } = useBaseHook()
    const context = usePaging()

    const getArgs: typeof baseGetArgs = () => {
      const baseArgs = baseGetArgs()

      return {
        ...baseArgs,
        body: {
          ...baseArgs.body ?? {},
          filters: {
            ...baseArgs.body.filters ?? {},
            ...{
              page: context?.page ?? 1,
              pageSize: context?.pageSize ?? 10
            }
          }
        }
      }
    }

    return {
      ...baseProps,
      hasRequiredArgs,
      getArgs
    }
  }

  return useWithFilters
}
