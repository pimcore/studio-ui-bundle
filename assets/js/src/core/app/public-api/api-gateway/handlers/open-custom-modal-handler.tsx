/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { isUndefined } from 'lodash'
import { getCustomModal } from '@Pimcore/app/public-api/modal/custom-modal-registry'
import { type ApiGatewayHandler } from '../registry/handler-registry'
import { type ApiGatewayEventType } from '../types/event-types'

export const openCustomModalHandler: ApiGatewayHandler<ApiGatewayEventType.openCustomModal> = (payload, context) => {
  const { modalHolderContext } = context
  const { id, onClose } = payload
  const holderKey = payload.instanceId ?? id
  const Component = getCustomModal(id)

  if (isUndefined(Component)) {
    console.warn(`No custom modal is registered for id "${id}"`)
    return
  }

  let isClosed = false

  // `onClose` is promised to fire once: a double click or a component closing twice is ignored.
  const handleClose = (result?: unknown): void => {
    if (isClosed) {
      return
    }

    isClosed = true
    modalHolderContext.removeModal(holderKey)
    onClose?.(result)
  }

  const element = (
    <Component
      onClose={ handleClose }
      payload={ payload.payload }
    />
  )

  modalHolderContext.addModal(holderKey, element)
}
