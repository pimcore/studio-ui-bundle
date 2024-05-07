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
