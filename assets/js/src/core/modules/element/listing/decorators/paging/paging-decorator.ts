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
import { withPagingContext } from './context-layer/paging/with-paging-context'
import { withFilters } from './data-layer/hooks/use-query-data-helper/with-filters'

export const PagingDecorator: AbstractDecorator = (props) => {
  const { useDataQueryHelper, ContextComponent, ...baseProps } = props

  return {
    ...baseProps,
    ContextComponent: withPagingContext(ContextComponent),
    useDataQueryHelper: withFilters(useDataQueryHelper)
  }
}
