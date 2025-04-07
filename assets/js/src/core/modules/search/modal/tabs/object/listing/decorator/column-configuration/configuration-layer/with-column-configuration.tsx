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

import React from 'react'
import { type AbstractDecoratorProps } from '@Pimcore/modules/element/listing/decorators/abstract-decorator'
import { ColumnConfigLoader } from './components/column-config-loader/column-config-loader'

export const WithColumnConfiguration = (Component: AbstractDecoratorProps['ConfigurationComponent']): AbstractDecoratorProps['ConfigurationComponent'] => {
  const availableColumnsConfigurationComponent = (): React.JSX.Element => {
    return (
      <ColumnConfigLoader Component={ Component } />
    )
  }

  return availableColumnsConfigurationComponent
}
