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
