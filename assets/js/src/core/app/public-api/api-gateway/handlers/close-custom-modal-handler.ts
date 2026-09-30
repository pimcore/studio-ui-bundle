/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type ApiGatewayHandler } from '../registry/handler-registry'
import { type ApiGatewayEventType } from '../types/event-types'

/**
 * Removes a modal the {@link ApiGatewayEventType.openCustomModal} handler added, without invoking
 * its own `onClose` result callback - this is the caller side closing the modal (e.g. the
 * component that opened it unmounting), not the modal's own cancel/confirm action.
 */
export const closeCustomModalHandler: ApiGatewayHandler<ApiGatewayEventType.closeCustomModal> = (
  payload,
  context
) => {
  context.modalHolderContext.removeModal(payload.instanceId ?? payload.id)
}
