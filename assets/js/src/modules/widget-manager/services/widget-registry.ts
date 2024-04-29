import { injectable } from 'inversify'
import { type ComponentType, memo } from 'react'

export interface Widget {
  name: string
  component: ComponentType
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
