/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { createFilterContext } from '@Pimcore/components/grid/contexts/filter-context'
import { type IGridFilter } from '@Pimcore/modules/reports/reports-view/types'

export const {
  FilterProvider: GridFilterProvider,
  useFilterContext: useGridFilterContext
} = createFilterContext<IGridFilter>()
