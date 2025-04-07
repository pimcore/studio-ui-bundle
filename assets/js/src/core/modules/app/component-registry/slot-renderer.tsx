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

import React, { useEffect } from 'react'
import { type ComponentRegistryEntry, useComponentRegistry } from './component-registry'
import { isUndefined } from 'lodash'

interface SlotRendererProps {
  slot: {
    name: string
    defaultEntries?: Array<ComponentRegistryEntry<any>>
  }
  props?: Record<string, any>
}

export const SlotRenderer = ({ slot, props }: SlotRendererProps): React.JSX.Element => {
  const { name, defaultEntries } = slot
  const ComponentRegistry = useComponentRegistry()

  useEffect(() => {
    if (!isUndefined(defaultEntries)) {
      const existingEntries = ComponentRegistry.getSlotComponents(name).map(({ name }) => name)
      Object.entries(defaultEntries).forEach(([key, entry]) => {
        if (!existingEntries.includes(entry.name)) {
          ComponentRegistry.registerToSlot(name, entry)
        }
      })
    }
  }, [name, defaultEntries, ComponentRegistry])

  const components = ComponentRegistry.getSlotComponents(name)

  return (
    <>
      {components.map(({ component: Component }, index) => (
        <Component
          key={ index }
          { ...props }
        />
      ))}
    </>
  )
}
