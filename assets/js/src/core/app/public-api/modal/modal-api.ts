/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type App } from 'antd'
import { isNull } from 'lodash'
import { getPimcoreStudioApi } from '@Pimcore/app/public-api/helpers/api-helper'
import { isInIframe } from '@Pimcore/utils/iframe'
import { ApiGatewayEvent } from '@Pimcore/app/public-api/api-gateway/api-gateway-event'
import { ApiGatewayEventType } from '@Pimcore/app/public-api/api-gateway/types/event-types'

type ModalStaticFunctions = ReturnType<typeof App.useApp>['modal']
let modalInstance: ModalStaticFunctions | null = null

export interface CustomModalOptions<TResult = unknown> {
  /**
   * Called once the modal registered under the given id closes, in whichever realm called
   * `openCustom` - the iframe, if that is where the caller lives. `result` is whatever the
   * registered component's own `onClose` was called with (`undefined` for a plain cancel/close).
   */
  onClose?: (result?: TResult) => void
}

export interface ModalApi {
  setModalInstance: (modal: ModalStaticFunctions) => void
  info: ModalStaticFunctions['info']
  success: ModalStaticFunctions['success']
  error: ModalStaticFunctions['error']
  warning: ModalStaticFunctions['warning']
  confirm: ModalStaticFunctions['confirm']
  openCustom: <TPayload = unknown, TResult = unknown>(
    id: string,
    payload: TPayload,
    options?: CustomModalOptions<TResult>
  ) => void
}

class ModalApiImpl implements ModalApi {
  setModalInstance (modal: ModalStaticFunctions): void {
    modalInstance = modal
  }

  private getModalInstance (): ModalStaticFunctions {
    if (isNull(modalInstance)) {
      throw new Error('Modal instance not initialized. Make sure App.useApp() is called in the parent window.')
    }
    return modalInstance
  }

  info = (props: Parameters<ModalStaticFunctions['info']>[0]): ReturnType<ModalStaticFunctions['info']> => {
    return this.getModalInstance().info(props)
  }

  success = (props: Parameters<ModalStaticFunctions['success']>[0]): ReturnType<ModalStaticFunctions['success']> => {
    return this.getModalInstance().success(props)
  }

  error = (props: Parameters<ModalStaticFunctions['error']>[0]): ReturnType<ModalStaticFunctions['error']> => {
    return this.getModalInstance().error(props)
  }

  warning = (props: Parameters<ModalStaticFunctions['warning']>[0]): ReturnType<ModalStaticFunctions['warning']> => {
    return this.getModalInstance().warning(props)
  }

  confirm = (props: Parameters<ModalStaticFunctions['confirm']>[0]): ReturnType<ModalStaticFunctions['confirm']> => {
    return this.getModalInstance().confirm(props)
  }

  /**
   * Opens a component registered via `registerIframeModal(id, …)` in the main-window (parent)
   * realm - callable from an iframe (e.g. a document editor editable) or directly from the main
   * window. See {@link registerIframeModal} for the registration side.
   */
  openCustom = <TPayload = unknown, TResult = unknown> (
    id: string,
    payload: TPayload,
    options?: CustomModalOptions<TResult>
  ): void => {
    try {
      if (isInIframe()) {
        const { modal } = getPimcoreStudioApi()
        modal.openCustom(id, payload, options)
      } else {
        this.openCustomDirectly(id, payload, options)
      }
    } catch (error) {
      console.error('Failed to open custom modal:', error)
    }
  }

  private openCustomDirectly<TPayload, TResult> (
    id: string,
    payload: TPayload,
    options?: CustomModalOptions<TResult>
  ): void {
    const event = new ApiGatewayEvent(ApiGatewayEventType.openCustomModal, {
      id,
      payload,
      onClose: options?.onClose as ((result?: unknown) => void) | undefined
    })
    window.dispatchEvent(event)
  }
}

export const modalApi = new ModalApiImpl()
