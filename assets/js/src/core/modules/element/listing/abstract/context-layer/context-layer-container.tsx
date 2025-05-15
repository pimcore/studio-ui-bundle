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
