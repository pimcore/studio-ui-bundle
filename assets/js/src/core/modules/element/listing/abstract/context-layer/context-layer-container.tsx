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
import { useSettings } from '../settings/use-settings'
import { DataProvider } from '../data-layer/provider/data/data-provider'
import { SelectedColumnsProvider } from '../configuration-layer/provider/selected-columns/selected-columns-provider'

export const ContextLayerComponent = (): React.JSX.Element => {
  const { ConfigurationComponent } = useSettings()

  return (
    <SelectedColumnsProvider>
      <DataProvider>
        <ConfigurationComponent />
      </DataProvider>
    </SelectedColumnsProvider>
  )
}
