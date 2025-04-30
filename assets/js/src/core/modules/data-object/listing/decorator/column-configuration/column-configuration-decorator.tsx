/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type AbstractDecorator } from '@Pimcore/modules/element/listing/decorators/abstract-decorator'
import { WithColumnConfiguration } from './configuration-layer/with-column-configuration'
import { WithAvailableColumnsContext } from './context-layer/with-available-columns-context'
import { withAdvancedColumnConfig } from './view-layer/components/grid/hooks/use-grid-options/with-advanced-column-config'
import { withConfigurationSidebarEntry } from './view-layer/components/grid/hooks/use-grid-options/hooks/with-configuration-sidebar-entry'

export const ColumnConfigurationDecorator: AbstractDecorator = (props) => {
  const { ConfigurationComponent, ContextComponent, useGridOptions, useSidebarOptions, ...baseProps } = props

  return {
    ...baseProps,
    ConfigurationComponent: WithColumnConfiguration(ConfigurationComponent),
    ContextComponent: WithAvailableColumnsContext(ContextComponent),
    useGridOptions: withAdvancedColumnConfig(useGridOptions),
    useSidebarOptions: withConfigurationSidebarEntry(useSidebarOptions)
  }
}
