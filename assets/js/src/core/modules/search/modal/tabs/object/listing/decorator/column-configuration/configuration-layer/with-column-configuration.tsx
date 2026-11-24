/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { type AbstractDecoratorProps } from '@Pimcore/modules/element/listing/decorators/abstract-decorator'
import { ColumnConfigLoader } from './components/column-config-loader/column-config-loader'

export interface WithColumnConfigurationSettings {
  saveEnabled?: boolean
}

export const WithColumnConfiguration = (Component: AbstractDecoratorProps['ConfigurationComponent'], settings: WithColumnConfigurationSettings = {}): AbstractDecoratorProps['ConfigurationComponent'] => {
  const availableColumnsConfigurationComponent = (): React.JSX.Element => {
    return (
      <ColumnConfigLoader
        Component={ Component }
        saveEnabled={ settings.saveEnabled }
      />
    )
  }

  return availableColumnsConfigurationComponent
}
