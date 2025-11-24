/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { injectable, inject } from 'inversify'
import { AbstractProcessorRegistry, type Processor } from '@Pimcore/modules/app/processor-registry/abstract-processor-registry'
import { type WidgetConfig, type PerspectiveConfigDetail } from '@Pimcore/modules/perspectives/perspectives-slice.enhanced'
import { type IJsonTabNode } from 'flexlayout-react'
import { uuid } from '@Pimcore/utils/uuid'
import { isUndefined, isNil } from 'lodash'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { type WidgetRegistry } from '../widget-registry'

export type PerspectiveWidgetPosition = 'left' | 'right' | 'bottom'

export interface PerspectiveWidgetItem {
  widget: WidgetConfig
  position: PerspectiveWidgetPosition
  tabNode: IJsonTabNode
}

export type PerspectiveWidgetContextData = Record<PerspectiveWidgetPosition, PerspectiveWidgetItem[]>

/**
 * Context object passed to perspective widget processors
 * Provides methods to manipulate the widget configuration before rendering
 */
export class PerspectiveProcessorContext {
  constructor (
    private readonly widgets: PerspectiveWidgetContextData,
    public readonly usedIds: Set<string>,
    private readonly widgetRegistry: WidgetRegistry,
    public readonly activePerspective: PerspectiveConfigDetail | null,
    private expandedLeft: string | null,
    private expandedRight: string | null
  ) {}

  /**
   * Get all widgets for a specific position
   */
  getWidgets (position: PerspectiveWidgetPosition): PerspectiveWidgetItem[] {
    return this.widgets[position] ?? []
  }

  /**
   * Get all widget positions with their widgets
   */
  getAllWidgets (): PerspectiveWidgetContextData {
    return { ...this.widgets }
  }

  /**
   * Add a widget at a specific position
   */
  addWidget (
    widget: WidgetConfig,
    position: PerspectiveWidgetPosition,
    insertIndex?: number
  ): string | null {
    const registeredWidget = this.widgetRegistry.getWidget(widget.widgetType)
    if (!isUndefined(registeredWidget?.isVisible) && !registeredWidget.isVisible(widget)) {
      return null
    }

    let widgetId = widget.id
    while (this.usedIds.has(widgetId)) {
      widgetId = `${uuid()}_${widget.id}`
    }
    this.usedIds.add(widgetId)

    const config = { ...widget, id: widgetId }

    const tabNode: IJsonTabNode = {
      id: widgetId,
      type: 'tab',
      name: widget.name,
      component: widget.widgetType,
      enableClose: Boolean(widget.additionalAttributes?.enableClose) || false,
      config
    }

    const widgetItem: PerspectiveWidgetItem = {
      widget: config,
      position,
      tabNode
    }
    
    if (isUndefined(this.widgets[position])) {
      this.widgets[position] = []
    }

    if (insertIndex !== undefined && insertIndex >= 0) {
      this.widgets[position].splice(insertIndex, 0, widgetItem)
    } else {
      this.widgets[position].push(widgetItem)
    }

    return widgetId
  }

  /**
   * Remove a widget by ID from any position
   */
  removeWidget (widgetId: string): boolean {
    for (const { widgets } of this.iterateWidgets()) {
      const index = widgets.findIndex(item => item.widget.id === widgetId)
      if (index !== -1) {
        widgets.splice(index, 1)
        return true
      }
    }
    return false
  }

  /**
   * Move a widget to a different position
   */
  moveWidget (
    widgetId: string,
    newPosition: PerspectiveWidgetPosition,
    insertIndex?: number
  ): boolean {
    for (const { widgets } of this.iterateWidgets()) {
      const index = widgets.findIndex(item => item.widget.id === widgetId)
      if (index !== -1) {
        const [widgetItem] = widgets.splice(index, 1)
        widgetItem.position = newPosition

        if (isUndefined(this.widgets[newPosition])) {
          this.widgets[newPosition] = []
        }

        if (insertIndex !== undefined && insertIndex >= 0) {
          this.widgets[newPosition].splice(insertIndex, 0, widgetItem)
        } else {
          this.widgets[newPosition].push(widgetItem)
        }
        return true
      }
    }
    return false
  }

  /**
   * Update widget configuration
   */
  updateWidgetConfig (
    widgetId: string,
    configUpdates: Partial<WidgetConfig>
  ): boolean {
    for (const { widgets } of this.iterateWidgets()) {
      const widgetItem = widgets.find(item => item.widget.id === widgetId)
      if (!isNil(widgetItem)) {
        widgetItem.widget = { ...widgetItem.widget, ...configUpdates }
        widgetItem.tabNode.config = { ...widgetItem.tabNode.config, ...configUpdates }
        if (!isNil(configUpdates.name)) {
          widgetItem.tabNode.name = configUpdates.name
        }
        return true
      }
    }
    return false
  }

  /**
   * Get the index of a widget within its position array
   */
  getWidgetPosition (widgetId: string): { position: PerspectiveWidgetPosition, index: number } | null {
    for (const { position, widgets } of this.iterateWidgets()) {
      const index = widgets.findIndex(item => item.widget.id === widgetId)
      if (index !== -1) {
        return { position, index }
      }
    }
    return null
  }

  /**
   * Set which widget should be expanded in the left sidebar
   */
  setExpandedLeft (widgetId: string | null): void {
    this.expandedLeft = widgetId
  }

  /**
   * Set which widget should be expanded in the right sidebar
   */
  setExpandedRight (widgetId: string | null): void {
    this.expandedRight = widgetId
  }

  /**
   * Get currently expanded left widget ID
   */
  getExpandedLeft (): string | null {
    return this.expandedLeft ?? null
  }

  /**
   * Get currently expanded right widget ID
   */
  getExpandedRight (): string | null {
    return this.expandedRight ?? null
  }

  /**
   * Iterate over all widget positions and their arrays
   */
  private iterateWidgets (): Array<{ position: PerspectiveWidgetPosition, widgets: PerspectiveWidgetItem[] }> {
    return Object.entries(this.widgets).map(([position, widgets]) => ({
      position: position as PerspectiveWidgetPosition,
      widgets
    }))
  }
}

/**
 * Processor for modifying perspective widget configuration before rendering.
 * Allows adding, removing, moving, or transforming widgets based on custom logic.
 */
export interface PerspectiveProcessor extends Processor<PerspectiveProcessorContext> {}

@injectable()
export class PerspectiveProcessorRegistry extends AbstractProcessorRegistry<PerspectiveProcessorContext> {
  constructor (
    @inject(serviceIds.widgetManager) private readonly widgetRegistry: WidgetRegistry
  ) {
    super()
  }

  /**
   * Create a new context with the injected widget registry
   */
  createContext (
    widgetsByPosition: PerspectiveWidgetContextData,
    usedIds: Set<string>,
    activePerspective: PerspectiveConfigDetail | null,
    expandedLeft: string | null = null,
    expandedRight: string | null = null
  ): PerspectiveProcessorContext {
    return new PerspectiveProcessorContext(
      widgetsByPosition,
      usedIds,
      this.widgetRegistry,
      activePerspective,
      expandedLeft,
      expandedRight
    )
  }
}
