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
