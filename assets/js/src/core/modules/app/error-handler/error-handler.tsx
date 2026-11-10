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
import { isString, isUndefined } from 'lodash'
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
const shownErrors = new Set<string>()

// Structured content is a fresh object on every call, so it is compared by value, not by identity.
const getErrorContentId = (errorContent: IErrorGetContent['data']): string => {
  return isString(errorContent) ? errorContent : JSON.stringify(errorContent)
}

const trackError = (data: IErrorContentProvider, handler?: ErrorHandler): never | void => {
  const errorContent = data.getContent()
  const errorContentId = getErrorContentId(errorContent)

  if (shownErrors.has(errorContentId)) {
    return
  } else {
    shownErrors.add(errorContentId)
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
