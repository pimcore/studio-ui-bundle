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

export const openHotspotMarkersModalHandler: ApiGatewayHandler<ApiGatewayEventType.openHotspotMarkersModal> = (payload, context) => {
  const { hotspotMarkersModalContext } = context

  hotspotMarkersModalContext.openModal(payload.imageId, payload.hotspots, payload.crop, payload.options)
}