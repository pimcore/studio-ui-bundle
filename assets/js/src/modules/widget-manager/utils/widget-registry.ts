import { type ComponentType } from 'react'

export interface Widget {
  name: string
  component: ComponentType
}

export const widgets: Widget[] = []

export const registerWidget = (widget: Widget): void => {
  widgets.push(widget)
}

export const getWidget = (name: string): Widget | undefined => {
  return widgets.find((widget) => widget.name === name)
}
