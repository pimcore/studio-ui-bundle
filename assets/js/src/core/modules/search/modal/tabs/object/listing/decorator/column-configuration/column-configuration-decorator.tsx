/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { WithAvailableColumnsContext } from '@Pimcore/modules/asset/listing/decorator/column-configuration/context-layer/with-available-columns-context'
import { withAdvancedColumnConfig } from '@Pimcore/modules/data-object/listing/decorator/column-configuration/view-layer/components/grid/hooks/use-grid-options/with-advanced-column-config'
import { type AbstractDecorator } from '@Pimcore/modules/element/listing/decorators/abstract-decorator'
import { WithColumnConfiguration } from './configuration-layer/with-column-configuration'
import { withConfigurationSidebarEntry } from '@Pimcore/modules/data-object/listing/decorator/column-configuration/view-layer/components/grid/hooks/use-grid-options/hooks/with-configuration-sidebar-entry'
import { SearchGridConfig } from './view-layer/search-grid-config'

export interface ColumnConfigurationDecoratorConfig {
  readOnly?: boolean
  /**
   * Offer saving, sharing and loading grid templates while a class is selected. The columns
   * then come from the class's grid configuration (selected template or favorite) instead of
   * the search defaults.
   */
  saveEnabled?: boolean
}

export const ColumnConfigurationDecorator: AbstractDecorator<ColumnConfigurationDecoratorConfig> = (props, config) => {
  const { ConfigurationComponent, ContextComponent, useGridOptions, useSidebarOptions, ...baseProps } = props
  const saveEnabled = config?.saveEnabled === true && config?.readOnly !== true

  return {
    ...baseProps,
    ConfigurationComponent: WithColumnConfiguration(ConfigurationComponent, { saveEnabled }),
    ContextComponent: WithAvailableColumnsContext(ContextComponent),
    useGridOptions: withAdvancedColumnConfig(useGridOptions),
    useSidebarOptions: withConfigurationSidebarEntry(useSidebarOptions, { saveEnabled, readOnly: config?.readOnly }, SearchGridConfig)
  }
}
