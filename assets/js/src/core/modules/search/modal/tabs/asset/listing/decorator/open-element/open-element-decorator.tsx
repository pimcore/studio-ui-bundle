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

import { type AbstractDecorator } from '@Pimcore/modules/element/listing/decorators/abstract-decorator'
import { type ElementType } from '@Pimcore/types/enums/element/element-type'
import { withOpenElementEvent } from './view-layer/with-open-element-event'

export interface OpenElementDecoratorConfig {
  elementType?: ElementType
}

export const OpenElementDecorator: AbstractDecorator<OpenElementDecoratorConfig> = (props, config) => {
  const { useGridOptions, ...baseProps } = props

  if (config === undefined) {
    throw new Error('OpenElementDecorator requires an elementType prop')
  }

  return {
    ...baseProps,
    useGridOptions: withOpenElementEvent(useGridOptions, config)
  }
}
