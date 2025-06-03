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
import { isUndefined } from 'lodash'

interface SlotRendererProps {
  slot: string
  props?: Record<string, any>
  onRenderComponent?: (Component: React.JSX.Element, context: { name?: string, index?: number, props?: Record<string, any> }) => React.JSX.Element
}

export const SlotRenderer = ({ slot, props, onRenderComponent }: SlotRendererProps): React.JSX.Element => {
  const name = slot
  const ComponentRegistry = useComponentRegistry()

  const components = ComponentRegistry.getSlotComponents(name)

  return (
    <>
      {components.map(({ component: Component, name }, index) => {
        const renderedComponent = (
          <Component
            key={ `component-${name}` }
            { ...props }
          />
        )
        const context = { name, index, props }
        return !isUndefined(onRenderComponent) ? onRenderComponent(renderedComponent, context) : renderedComponent
      })}
    </>
  )
}
