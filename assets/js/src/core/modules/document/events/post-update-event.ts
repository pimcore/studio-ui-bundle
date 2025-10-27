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
import { type SaveTaskType } from '../services/document-save-task-manager'

export interface DocumentPostUpdateEventPayload {
  id: number
  task?: SaveTaskType
  updatedData: Record<string, any>
  responseData: Record<string, any>
}

export interface DocumentPostUpdateEvent extends AbstractEvent {
  identifier: {
    type: typeof eventTypes['document:editor:post-update']
    id?: string
  }
  payload: DocumentPostUpdateEventPayload
}
