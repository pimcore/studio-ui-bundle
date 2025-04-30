/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type TypeSelectProps } from '@Pimcore/modules/element/components/type-select/type-select'
import { type AbstractDecorator } from '@Pimcore/modules/element/listing/decorators/abstract-decorator'
import { withTypeFilterProvider } from './context-layer/with-type-filter-provider'
import { withTypeFilter } from './data-layer/with-type-filter'
import { type ElementType } from '@Pimcore/types/enums/element/element-type'

export interface TypeFilterDecoratorConfig {
  restrictedOptions?: TypeSelectProps['restrictOptions']
  elementType: ElementType
}

export const TypeFilterDecorator: AbstractDecorator<TypeFilterDecoratorConfig> = (props, config) => {
  const { ContextComponent, useDataQueryHelper, ...baseProps } = props

  return {
    ...baseProps,
    ContextComponent: withTypeFilterProvider(ContextComponent, config),
    useDataQueryHelper: withTypeFilter(useDataQueryHelper)
  }
}
