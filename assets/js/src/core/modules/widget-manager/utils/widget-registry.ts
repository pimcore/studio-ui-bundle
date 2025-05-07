/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type ComponentType, memo } from 'react'

export interface Widget {
  name: string
  component: ComponentType
}

export const widgets: Widget[] = []

export const registerWidget = (widget: Widget): void => {
  const newWidget = {
    ...widget,
    component: memo(widget.component)
  }

  widgets.push(newWidget)
}

export const getWidget = (name: string): Widget | undefined => {
  return widgets.find((widget) => widget.name === name)
}
