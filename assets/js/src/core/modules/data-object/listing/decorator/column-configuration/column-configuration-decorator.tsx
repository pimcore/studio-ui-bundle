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
import { WithColumnConfiguration } from './configuration-layer/with-column-configuration'

export const ColumnConfigurationDecorator: AbstractDecorator = (props) => {
  const { ConfigurationComponent, ...baseProps } = props

  return {
    ...baseProps,
    ConfigurationComponent: WithColumnConfiguration(ConfigurationComponent)
  }
}
