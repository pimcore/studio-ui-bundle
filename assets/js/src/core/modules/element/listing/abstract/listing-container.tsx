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
import { type SettingsContextProps, SettingsProvider } from './settings/settings-provider'
import { ListingInnerContainer } from './listing-inner-container'
import { ContextLayerComponent } from './context-layer/context-layer-container'
import { ConfigurationLayerContainer } from './configuration-layer/configuration-layer-container'
import { DataLayerContainer } from './data-layer/data-layer-container'
import { ViewLayerComponent } from './view-layer/view-layer-component'
import { useGridOptions } from './view-layer/components/grid/hooks/use-grid-options'
import { useSidebarOptions } from './view-layer/components/sidebar/hooks/use-sidebar-options'

export interface ListingContainerProps extends Partial<SettingsContextProps> {
  useDataQuery: SettingsContextProps['useDataQuery']
  useDataQueryHelper: SettingsContextProps['useDataQueryHelper']
  useElementId: SettingsContextProps['useElementId']
}

export interface DefaultProps extends Pick<SettingsContextProps, 'ContextComponent' | 'ConfigurationComponent' | 'DataComponent' | 'ViewComponent' | 'useGridOptions' | 'useSidebarOptions'> {}

export const defaultProps: DefaultProps = {
  ContextComponent: ContextLayerComponent,
  ConfigurationComponent: ConfigurationLayerContainer,
  DataComponent: DataLayerContainer,
  ViewComponent: ViewLayerComponent,
  useGridOptions,
  useSidebarOptions
}

export const ListingContainer = ({
  ContextComponent = defaultProps.ContextComponent,
  ConfigurationComponent = defaultProps.ConfigurationComponent,
  DataComponent = defaultProps.DataComponent,
  ViewComponent = defaultProps.ViewComponent,
  useGridOptions = defaultProps.useGridOptions,
  useSidebarOptions = defaultProps.useSidebarOptions,
  useDataQueryHelper,
  useDataQuery,
  useElementId
}: ListingContainerProps): React.JSX.Element => {
  const settings = {
    ContextComponent,
    ConfigurationComponent,
    DataComponent,
    ViewComponent,
    useGridOptions,
    useSidebarOptions,
    useDataQueryHelper,
    useDataQuery,
    useElementId
  }

  return (
    <SettingsProvider { ...settings }>
      <ListingInnerContainer />
    </SettingsProvider>
  )
}
