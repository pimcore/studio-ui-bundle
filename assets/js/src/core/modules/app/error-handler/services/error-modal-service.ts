/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import type React from 'react'
import { isEmpty } from 'lodash'

interface IError {
  content: React.JSX.Element | string
  title: string | null
}

interface IErrorModalServiceReturn {
  setModalInstance: (modal: any) => void
  showError: ({ content, title }: IError) => void
}

export const ErrorModalService = ((): IErrorModalServiceReturn => {
  let modalInstance: any = null

  const setModalInstance = (modal: any): void => {
    modalInstance = modal
  }

  const showError = ({ content, title }: IError): void => {
    if (isEmpty(modalInstance)) {
      throw new Error('ErrorModalService: Modal instance is not set. Call setModalInstance first.')
    }

    modalInstance.error({ content, title })
  }

  return {
    setModalInstance,
    showError
  }
})()
