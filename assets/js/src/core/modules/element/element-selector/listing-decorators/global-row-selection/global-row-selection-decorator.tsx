/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type AbstractDecoratorWithRequiredConfig } from '@Pimcore/modules/element/listing/decorators/abstract-decorator'
import { type ElementType } from '@Pimcore/types/enums/element/element-type'
import { withGlobalRowSelection } from './configuration-layer/with-global-row-selection'

export interface IGlobalRowSelectionConfig {
  rowSelectionMode: 'single' | 'multiple'
  elementType: ElementType
}

export type IGlobalRowSelectionDecorator = AbstractDecoratorWithRequiredConfig<IGlobalRowSelectionConfig>

export type IGlobalRowSelectionDecoratorProps = Parameters<IGlobalRowSelectionDecorator>[0]

export const GlobalRowSelectionDecorator: IGlobalRowSelectionDecorator = (props, config) => {
  const { ConfigurationComponent, ...baseProps } = props

  const newProps = {
    ...baseProps,
    ConfigurationComponent: withGlobalRowSelection(ConfigurationComponent, config)
  }

  return newProps
}
