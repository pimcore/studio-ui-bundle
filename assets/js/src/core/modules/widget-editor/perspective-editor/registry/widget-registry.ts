/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type ItemType } from '@Pimcore/components/dropdown/dropdown'
import trackError, { GeneralError } from '@Pimcore/modules/app/error-handler'
import { injectable } from 'inversify'

export interface WidgetDefinition {
  readonly id: string
  component: ItemType
  group: string
}

export interface WidgetRegistryInterface {
  registerWidget: (widget: WidgetDefinition) => void
  getWidget: (id: string, throwException?: boolean) => WidgetDefinition | undefined
  hasWidget: (id: string) => boolean
  getAllWidgets: () => WidgetDefinition[]
  overrideWidget: (widget: WidgetDefinition) => void
}

@injectable()
export class WidgetRegistry implements WidgetRegistryInterface {
  protected readonly widgets = new Map<string, WidgetDefinition>()

  registerWidget (widget: WidgetDefinition): void {
    if (this.widgets.has(widget.id)) {
      trackError(new GeneralError(`Widget with id "${widget.id}" already registered`))
      return
    }

    this.widgets.set(widget.id, widget)
  }

  getWidget (id: string, throwException: boolean = true): WidgetDefinition | undefined {
    const widget = this.widgets.get(id)

    if (widget === undefined && throwException) {
      trackError(new GeneralError(`Widget with id "${id}" not found`))
    }

    return widget
  }

  hasWidget (id: string): boolean {
    return this.widgets.has(id)
  }

  getAllWidgets (): WidgetDefinition[] {
    return Array.from(this.widgets.values())
  }

  getGroupedWidgets (): Record<string, WidgetDefinition[]> {
    return Array.from(this.widgets.values()).reduce<Record<string, WidgetDefinition[]>>((groups, widget) => {
      groups[widget.group] = groups[widget.group] ?? []
      groups[widget.group].push(widget)
      return groups
    }, {})
  }

  overrideWidget (widget: WidgetDefinition): void {
    if (!this.widgets.has(widget.id)) {
      trackError(new GeneralError(`Widget with id "${widget.id}" not found`))
      return
    }

    this.widgets.set(widget.id, widget)
  }
}
