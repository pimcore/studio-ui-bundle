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

// Create a set to keep shown error content and avoid duplicates
const shownErrors = new Set<IErrorGetContent['data']>()

const trackError = (data: IErrorContentProvider, handler?: ErrorHandler): never | void => {
  const errorContent = data.getContent()

  if (shownErrors.has(errorContent)) {
    return
  } else {
    shownErrors.add(errorContent)
  }

  // Set a timeout to clear the shownErrors after the current execution cycle
  setTimeout(() => {
    // Clear the shownErrors after handling the error to allow future errors to be shown
    shownErrors.clear()
  }, 0)

  const getErrorContentValue = (): React.JSX.Element | string => {
    return isApiError(data) ? <ApiErrorViewUI errorContent={ errorContent } /> : (errorContent as string)
  }

  if (!isUndefined(handler)) {
    handler(getErrorContentValue())
  } else {
    // default handler
    ErrorModalService.showError({ content: getErrorContentValue(), title: typeof errorContent === 'object' ? errorContent.title! : null })
  }

  if (isGeneralError(data)) {
    throw new Error(errorContent as string)
  }
}

export default trackError
