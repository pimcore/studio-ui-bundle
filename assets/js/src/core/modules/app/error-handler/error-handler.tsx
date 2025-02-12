/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import React from 'react'
import { isUndefined } from 'lodash'
import { ErrorModalService } from '@Pimcore/modules/app/error-handler/services/error-modal-service'
import { GeneralError, ApiError } from '@Pimcore/modules/app/error-handler/index'
import { ApiErrorViewUI } from '@Pimcore/modules/app/error-handler/components/api-error-view-ui'
import { type IErrorGetContent } from '@Pimcore/modules/app/error-handler/types'

interface IErrorContentProvider {
  getContent: () => IErrorGetContent['data']
}
type ErrorHandler = (data: React.JSX.Element | string) => void

const isGeneralError = (error: any): boolean => error instanceof GeneralError
const isApiError = (error: any): boolean => error instanceof ApiError

const trackError = (data: IErrorContentProvider, handler?: ErrorHandler): never | void => {
  const errorContent = data.getContent()

  const getErrorContentValue = (): React.JSX.Element | string => {
    return isApiError(data) ? <ApiErrorViewUI errorContent={ errorContent } /> : (errorContent as string)
  }

  if (!isUndefined(handler)) {
    handler(getErrorContentValue())
  } else {
    // default handler
    ErrorModalService.showError(getErrorContentValue())
  }

  if (isGeneralError(data)) {
    throw new Error(errorContent as string)
  }
}

export default trackError
