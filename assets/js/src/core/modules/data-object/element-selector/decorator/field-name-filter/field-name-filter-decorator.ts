/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type AbstractDecorator } from '@Pimcore/modules/element/listing/decorators/abstract-decorator'
import { withFieldNameFilterQueryArg } from './data-layer/with-field-name-filter-query-arg'

export const FieldNameFilterDecorator: AbstractDecorator = (props) => {
  const { useDataQueryHelper, ...baseProps } = props

  return {
    useDataQueryHelper: withFieldNameFilterQueryArg(useDataQueryHelper),
    ...baseProps
  }
}
