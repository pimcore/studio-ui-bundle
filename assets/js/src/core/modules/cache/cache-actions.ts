/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { store } from '@Pimcore/app/store'
import { ApiError, trackError } from '@sdk/modules/app'
import { api } from './cache-api-slice.gen'
import i18n from 'i18next'
import { message } from 'antd'
import { type ApiErrorData } from '@Pimcore/modules/app/error-handler/types'

const showSuccess = (key: string): void => {
  void message.success(i18n.t(key))
}

export const clearCache = async (): Promise<void> => {
  try {
    await store.dispatch(api.endpoints.cacheClear.initiate({})).unwrap()
    showSuccess('cache.clear-cache-success')
  } catch (error) {
    trackError(new ApiError(error as ApiErrorData))
  }
}

export const clearFullPageCache = async (): Promise<void> => {
  try {
    await store.dispatch(api.endpoints.cacheClearOutput.initiate()).unwrap()
    showSuccess('cache.clear-full-page-cache-success')
  } catch (error) {
    trackError(new ApiError(error as ApiErrorData))
  }
}

export const clearTemporaryFiles = async (): Promise<void> => {
  try {
    await store.dispatch(api.endpoints.cacheClearTemporaryFiles.initiate()).unwrap()
    showSuccess('cache.clear-temporary-files-success')
  } catch (error) {
    trackError(new ApiError(error as ApiErrorData))
  }
}
