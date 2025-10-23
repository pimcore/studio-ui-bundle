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

export interface AssetPostUpdateEventPayload {
  id: number
  updatedData: Record<string, any>
}

export interface AssetPostUpdateEvent extends AbstractEvent {
  identifier: {
    type: typeof eventTypes['asset:editor:post-update']
    id?: string
  }
  payload: AssetPostUpdateEventPayload
}
