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
import { GridConfigProvider } from './grid-config-provider'
import { GridConfigInner } from './grid-config-inner'
import { ClassificationStoreModalProvider } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/provider/classifcation-store-modal-provider'
import { type Settings } from '../../hooks/with-configuration-sidebar-entry'
import { SettingsProvider } from '@Pimcore/modules/asset/listing/decorator/column-configuration/view-layer/components/sidebar/tabs/grid-config/povider/settings/settings-provider'

export interface GridConfigProps {
  settings?: Settings
}

export const GridConfig = ({ settings }: GridConfigProps): React.JSX.Element => {
  return (
    <SettingsProvider settings={ settings }>
      <GridConfigProvider>
        <ClassificationStoreModalProvider>
          <GridConfigInner />
        </ClassificationStoreModalProvider>
      </GridConfigProvider>
    </SettingsProvider>
  )
}
