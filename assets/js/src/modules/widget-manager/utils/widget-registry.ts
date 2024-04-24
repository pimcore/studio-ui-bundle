import { container } from '@Pimcore/app/depency-injection'
import { injectable } from 'inversify'
import { type ComponentType, memo } from 'react'

export interface Widget {
  name: string
  component: ComponentType
}

export const serviceName = Symbol.for('widget-manager/services/widget-registry')

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

container.bind(serviceName).to(WidgetRegistry).inSingletonScope()
