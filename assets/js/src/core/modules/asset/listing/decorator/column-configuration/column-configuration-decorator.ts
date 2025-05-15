/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type AbstractDecoratorProps, type AbstractDecorator } from '@Pimcore/modules/element/listing/decorators/abstract-decorator'
import { withColumnConfiguration } from './configuration-layer/with-column-configuration'
import { withConfigurationSidebarEntry } from './view-layer/components/sidebar/hooks/with-configuration-sidebar-entry'
import { WithAvailableColumnsContext } from './context-layer/with-available-columns-context'

export const ColumnConfigurationDecorator: AbstractDecorator = (props) => {
  const { ConfigurationComponent, ContextComponent, useSidebarOptions, ...defaultProps } = props

  const newProps: AbstractDecoratorProps = {
    ...defaultProps,
    ContextComponent: WithAvailableColumnsContext(ContextComponent),
    ConfigurationComponent: withColumnConfiguration(ConfigurationComponent),
    useSidebarOptions: withConfigurationSidebarEntry(useSidebarOptions)
  }

  return newProps
}
