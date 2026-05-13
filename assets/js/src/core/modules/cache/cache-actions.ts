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
import { isUndefined } from 'lodash'

export const clearCache = async (): Promise<void> => {
  const response = await store.dispatch(api.endpoints.cacheClear.initiate({}))

  if (!isUndefined(response.error)) {
    trackError(new ApiError(response.error))
    return
  }

  void message.success(i18n.t('cache.clear-cache-success'))
}

export const clearFullPageCache = async (): Promise<void> => {
  const response = await store.dispatch(api.endpoints.cacheClearOutput.initiate())

  if (!isUndefined(response.error)) {
    trackError(new ApiError(response.error))
    return
  }

  void message.success(i18n.t('cache.clear-full-page-cache-success'))
}

export const clearTemporaryFiles = async (): Promise<void> => {
  const response = await store.dispatch(api.endpoints.cacheClearTemporaryFiles.initiate())

  if (!isUndefined(response.error)) {
    trackError(new ApiError(response.error))
    return
  }

  void message.success(i18n.t('cache.clear-temporary-files-success'))
}
