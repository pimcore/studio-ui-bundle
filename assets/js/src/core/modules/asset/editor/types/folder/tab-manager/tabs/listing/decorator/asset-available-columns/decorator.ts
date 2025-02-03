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

import { type AbstractDecoratorProps, type AbstractDecorator } from '@Pimcore/modules/element/listing/decorators/abstract-decorator'
import { withAvailableColumns } from './configuration-component/with-available-columns'
import { withConfigurationSidebarEntry } from './view-layer/components/sidebar/hooks/with-configuration-sidebar-entry'

export const AssetAvailableColumnsDecorator: AbstractDecorator = (props) => {
  console.log('Assset decorator was called')
  const { ConfigurationComponent, useSidebarOptions, ...defaultProps } = props

  const newProps: AbstractDecoratorProps = {
    ...defaultProps,
    ConfigurationComponent: withAvailableColumns(ConfigurationComponent),
    useSidebarOptions: withConfigurationSidebarEntry(useSidebarOptions)
  }

  return newProps
}
