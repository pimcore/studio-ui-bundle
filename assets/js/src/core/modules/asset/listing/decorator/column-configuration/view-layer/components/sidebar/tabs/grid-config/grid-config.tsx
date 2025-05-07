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
import { type Settings } from '../../hooks/with-configuration-sidebar-entry'
import { SettingsProvider } from './povider/settings/settings-provider'

export interface GridConfigProps {
  settings?: Settings
}

export const GridConfig = (props: GridConfigProps): React.JSX.Element => {
  return (
    <SettingsProvider settings={ props.settings }>
      <GridConfigProvider>
        <GridConfigInner />
      </GridConfigProvider>
    </SettingsProvider>
  )
}
