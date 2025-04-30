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
