/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type AbstractDecoratorProps } from '@Pimcore/modules/element/listing/decorators/abstract-decorator'
import { AvailableColumnsProvider } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/available-columns-provider'
import { GridConfigProvider } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/grid-config/grid-config-provider'
import { SelectedGridConfigIdProvider } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/selected-grid-config-id/selected-grid-config-id-provider'
import React from 'react'

export const WithAvailableColumnsContext = (Component: AbstractDecoratorProps['ContextComponent']): AbstractDecoratorProps['ContextComponent'] => {
  const AvailableColumnsContextComponent = (): React.JSX.Element => {
    return (
      <GridConfigProvider>
        <AvailableColumnsProvider>
          <SelectedGridConfigIdProvider>
            <Component />
          </SelectedGridConfigIdProvider>
        </AvailableColumnsProvider>
      </GridConfigProvider>
    )
  }

  return AvailableColumnsContextComponent
}
