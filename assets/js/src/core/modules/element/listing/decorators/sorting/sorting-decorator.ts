/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type AbstractDecorator } from '../abstract-decorator'
import { withSortingContext } from './context-layer/with-sorting-context'
import { withSortingDataQueryArg } from './data-layer/with-sorting-data-query-arg'
import { withSortingGridOptions } from './view-layer/components/grid/hooks/with-sorting-grid-options'

export const SortingDecorator: AbstractDecorator = (props) => {
  const { useGridOptions, ContextComponent, useDataQueryHelper, ...baseProps } = props

  const newProps = {
    ...baseProps,
    ContextComponent: withSortingContext(ContextComponent),
    useGridOptions: withSortingGridOptions(useGridOptions),
    useDataQueryHelper: withSortingDataQueryArg(useDataQueryHelper)
  }

  return newProps
}
