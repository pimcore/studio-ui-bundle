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
  const Component = getCustomModal(id)

  if (isUndefined(Component)) {
    console.warn(`No custom modal is registered for id "${id}"`)
    return
  }

  const handleClose = (result?: unknown): void => {
    modalHolderContext.removeModal(id)
    onClose?.(result)
  }

  const element = (
    <Component
      onClose={ handleClose }
      payload={ payload.payload }
    />
  )

  modalHolderContext.addModal(id, element)
}
