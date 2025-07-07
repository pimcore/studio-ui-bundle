/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type ApiGatewayEventType, type ApiGatewayEventPayload } from './types/event-types'

/**
 * Event name for API gateway requests
 */
export const API_GATEWAY_EVENT = 'pimcore:gateway:request'

export interface ApiGatewayEventDetail<T extends ApiGatewayEventType = ApiGatewayEventType> {
  type: T
  payload: ApiGatewayEventPayload<T>
}

/**
 * Custom event class for API Gateway events
 * Provides type safety and structured handling of API gateway requests
 */
export class ApiGatewayEvent<T extends ApiGatewayEventType> extends CustomEvent<ApiGatewayEventDetail<T>> {
  constructor (type: T, payload: ApiGatewayEventPayload<T>) {
    super(API_GATEWAY_EVENT, {
      detail: {
        type,
        payload
      }
    })
  }

  get eventType (): T {
    return this.detail.type
  }

  get payload (): ApiGatewayEventPayload<T> {
    return this.detail.payload
  }
}
