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
import { useComponentRegistry } from './component-registry'

interface ComponentRendererProps {
  component: string
  props?: Record<string, any>
}

export const ComponentRenderer = ({ component, props }: ComponentRendererProps): React.JSX.Element => {
  const ComponentRegistry = useComponentRegistry()
  const Component = ComponentRegistry.get(component)

  return <Component { ...props } />
}
