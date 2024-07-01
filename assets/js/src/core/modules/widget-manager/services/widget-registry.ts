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

import { injectable } from 'inversify'
import { type ComponentType, memo } from 'react'
import { type TabTitleOuterContainerProps } from '../title/tab-title-outer-container'

export interface Widget {
  name: string
  component: ComponentType
  titleComponent?: ComponentType<TabTitleOuterContainerProps>
}

@injectable()
export class WidgetRegistry {
  private readonly widgets: Widget[] = []

  registerWidget (widget: Widget): void {
    const newWidget = {
      ...widget,
      component: memo(widget.component)
    }

    this.widgets.push(newWidget)
  }

  getWidget (name: string): Widget | undefined {
    return this.widgets.find((widget) => widget.name === name)
  }
}
