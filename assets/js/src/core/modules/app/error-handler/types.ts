/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import type { SerializedError } from '@reduxjs/toolkit'

export interface IErrorGetContent {
  data: string | { errorKey: string, title?: string }
}

export type ApiErrorData = FetchBaseQueryError | SerializedError | { data: IApiErrorDetails }

export interface IApiErrorDetails {
  detail?: string
  errorKey?: string
  message?: string
  error?: string
  position?: number
  token?: string
}
