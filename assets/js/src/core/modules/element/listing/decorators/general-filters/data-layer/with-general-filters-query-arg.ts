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
import { useFilterQuery } from '@Pimcore/components/filters'
import { useAppliedFilters, elementFilterSetup } from '../element-filters'
import { type ElementListingQueryArgs } from '../element-filters/element-filter-types'
import { useDropVanishedModeColumnFilters } from '../search-modes/use-drop-vanished-mode-column-filters'

export { unreferencedFilterType } from '../element-filters/definitions/unreferenced-filter'

export const withGeneralFiltersQueryArg = (useBaseHook: AbstractDecoratorProps['useDataQueryHelper']): AbstractDecoratorProps['useDataQueryHelper'] => {
  const useDataQueryHelperGeneralFiltersExtension: AbstractDecoratorProps['useDataQueryHelper'] = () => {
    const { getArgs: baseGetArgs, ...baseMethods } = useBaseHook()
    const { values } = useAppliedFilters()
    const applyFilters = useFilterQuery(elementFilterSetup, values)
    // mounted with the listing, unlike the filter panel which cleans the draft
    useDropVanishedModeColumnFilters('applied')

    const getArgs: typeof baseGetArgs = () => {
      const baseArgs = baseGetArgs()

      return applyFilters(baseArgs as unknown as ElementListingQueryArgs) as ReturnType<typeof baseGetArgs>
    }

    return {
      ...baseMethods,
      getArgs
    }
  }

  return useDataQueryHelperGeneralFiltersExtension
}
