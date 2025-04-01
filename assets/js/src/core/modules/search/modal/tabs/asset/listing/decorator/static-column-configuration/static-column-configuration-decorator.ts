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

import { WithAvailableColumnsContext } from '@Pimcore/modules/asset/listing/decorator/column-configuration/context-layer/with-available-columns-context'
import { withConfigurationSidebarEntry } from '@Pimcore/modules/asset/listing/decorator/column-configuration/view-layer/components/sidebar/hooks/with-configuration-sidebar-entry'
import { type AbstractDecoratorProps, type AbstractDecorator } from '@Pimcore/modules/element/listing/decorators/abstract-decorator'
import { withColumnConfiguration } from './config-layer/with-column-configuration'

export const StaticColumnConfigurationDecorator: AbstractDecorator = (props) => {
  const { ConfigurationComponent, ContextComponent, useSidebarOptions, ...defaultProps } = props

  const newProps: AbstractDecoratorProps = {
    ...defaultProps,
    ContextComponent: WithAvailableColumnsContext(ContextComponent),
    ConfigurationComponent: withColumnConfiguration(ConfigurationComponent),
    useSidebarOptions: withConfigurationSidebarEntry(useSidebarOptions, { saveEnabled: false })
  }

  return newProps
}
