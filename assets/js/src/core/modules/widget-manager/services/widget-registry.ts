/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { injectable } from 'inversify'
import { type ComponentType, memo } from 'react'
import type React from 'react'
import { type TabTitleOuterContainerProps } from '../title/tab-title-outer-container'
import { type WidgetContentTitleContainerProps } from '../widget/widget-content-title-container'
import { type TabNode } from 'flexlayout-react'
import { type GlobalContext } from '@Pimcore/modules/app/global-context/global-context-slice'
import { type WidgetManagerTabConfig } from '../widget-manager-slice'
import { type WidgetConfig } from '@Pimcore/modules/perspectives/perspectives-slice.enhanced'
import trackError, { GeneralError } from '@Pimcore/modules/app/error-handler'

export interface Widget {
  name: string
  component: ComponentType
  titleComponent?: ComponentType<TabTitleOuterContainerProps>
  contentTitleComponent?: ComponentType<WidgetContentTitleContainerProps>
  isModified?: (tabNode: TabNode) => boolean
  getContextProvider?: (context: GlobalContext, children: React.ReactNode) => React.JSX.Element
  defaultGlobalContext?: boolean
  transformConfig?: (config: WidgetManagerTabConfig['config']) => WidgetManagerTabConfig['config']
  isVisible?: (widget: WidgetConfig) => boolean
}

@injectable()
export class WidgetRegistry {
  private readonly widgets: Widget[] = []

  registerWidget (widget: Widget): void {
    const newWidget = {
      ...widget,
      component: memo(widget.component),
      defaultGlobalContext: widget.defaultGlobalContext ?? true
    }

    this.widgets.push(newWidget)
  }

  /**
   * Replaces an already registered widget, e.g. to let a bundle take over
   * a core view. When no widget with the given name is registered, the
   * registry stays untouched (the core widget keeps working), the problem
   * is reported via the central error handler and `false` is returned —
   * a stale override must never break the app boot.
   *
   * @returns whether the widget was overridden
   */
  overrideWidget (widget: Widget): boolean {
    const index = this.widgets.findIndex((registeredWidget) => registeredWidget.name === widget.name)

    if (index === -1) {
      try {
        trackError(new GeneralError(`Widget with name "${widget.name}" not found`))
      } catch {
        // trackError re-throws GeneralError by design; swallow it here so a
        // stale override registered during module init cannot kill the boot.
      }

      return false
    }

    this.widgets[index] = {
      ...widget,
      component: memo(widget.component),
      defaultGlobalContext: widget.defaultGlobalContext ?? true
    }

    return true
  }

  getWidget (name: string): Widget | undefined {
    return this.widgets.find((widget) => widget.name === name)
  }
}
