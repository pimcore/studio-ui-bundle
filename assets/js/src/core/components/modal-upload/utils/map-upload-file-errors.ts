/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isNil, isString } from 'lodash'
import type { RcFile, UploadFile } from 'antd/es/upload/interface'
import type { TFunction } from '@sdk/app'
import { ApiError } from '@Pimcore/modules/app/error-handler'
import { type ApiErrorData } from '@sdk/modules/app'

export interface MapUploadFileErrorsOptions {
  t: TFunction
  hasCheckError: (file: RcFile) => boolean
  getCheckError: (file: RcFile) => unknown
}

const formatErrorMessage = (errorData: unknown, t: TFunction): string => {
  const apiError = new ApiError({ data: errorData } as unknown as ApiErrorData)
  const content = apiError.getContent()

  if (isNil(content)) {
    return t('error.error_something_generic_went_wrong')
  }

  if (isString(content)) {
    return content
  }

  return t(`error.${content.errorKey}`)
}

/**
 * Normalises the raw Ant upload list into one where every failed file carries a
 * human readable `response` message — both files that failed the duplicate-name
 * check before uploading and files the server rejected.
 */
export const mapUploadFileErrors = (
  files: UploadFile[],
  { t, hasCheckError, getCheckError }: MapUploadFileErrorsOptions
): UploadFile[] => {
  return files.map(file => {
    if (hasCheckError(file as RcFile)) {
      const checkError = getCheckError(file as RcFile)

      return {
        ...file,
        status: 'error' as const,
        response: formatErrorMessage(checkError, t),
        error: checkError
      }
    }

    if (file.status === 'error') {
      const responseData = file.response ?? file.error

      if (!isNil(responseData) && typeof responseData === 'object') {
        return {
          ...file,
          status: 'error' as const,
          response: formatErrorMessage(responseData, t),
          error: responseData
        }
      }
    }

    return file
  })
}
