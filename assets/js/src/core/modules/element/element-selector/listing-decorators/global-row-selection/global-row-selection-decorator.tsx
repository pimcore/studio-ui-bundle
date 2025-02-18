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
