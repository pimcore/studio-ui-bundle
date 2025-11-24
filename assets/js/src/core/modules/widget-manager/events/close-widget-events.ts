/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type eventTypes, type AbstractEvent } from '@Pimcore/lib/event-bus'
import { type TabNode } from 'flexlayout-react'

export interface CloseMainWidgetEventPayload {
  widgetId: string
  node: TabNode
}

export interface CloseMainWidgetEvent extends AbstractEvent {
  identifier: {
    type: typeof eventTypes['widget-manager:inner:widget-closed']
    id?: string
  }
  payload: CloseMainWidgetEventPayload
}

export interface CloseOuterWidgetEventPayload {
  widgetId: string
  node: TabNode
}

export interface CloseOuterWidgetEvent extends AbstractEvent {
  identifier: {
    type: typeof eventTypes['widget-manager:outer:widget-closed']
    id?: string
  }
  payload: CloseOuterWidgetEventPayload
}
