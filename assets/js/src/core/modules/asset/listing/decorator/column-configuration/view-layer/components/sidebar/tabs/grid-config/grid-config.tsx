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
