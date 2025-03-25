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
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { type ComponentRegistry } from './component-registry'
import { container } from '@Pimcore/app/depency-injection'

interface ComponentRendererProps {
  component: string
  props?: Record<string, any>
}

export const ComponentRenderer = ({ component, props }: ComponentRendererProps): React.JSX.Element => {
  const ComponentRegistry = container.get<ComponentRegistry>(serviceIds['App/ComponentRegistry/ComponentRegistry'])
  const Component = ComponentRegistry.get(component)
  return <Component { ...props } />
}
