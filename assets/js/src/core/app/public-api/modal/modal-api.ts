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

type ModalStaticFunctions = ReturnType<typeof App.useApp>['modal']
let modalInstance: ModalStaticFunctions | null = null

export interface ModalApi {
  setModalInstance: (modal: ModalStaticFunctions) => void
  info: ModalStaticFunctions['info']
  success: ModalStaticFunctions['success']
  error: ModalStaticFunctions['error']
  warning: ModalStaticFunctions['warning']
  confirm: ModalStaticFunctions['confirm']
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
}

export const modalApi = new ModalApiImpl()
