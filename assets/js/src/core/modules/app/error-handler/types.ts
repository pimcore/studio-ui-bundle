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

export interface IValidationErrorPathSegment {
  field: string
  title?: string | null
  language?: string | null
  index?: number | null
  type?: string | null
}

export interface IValidationError {
  field?: string | null
  fieldTitle?: string | null
  /** Ordered innermost first. */
  path?: IValidationErrorPathSegment[]
  message: string
  messageKey?: string | null
  parameters?: Record<string, unknown>
}

export interface IErrorGetContent {
  data: string | { errorKey: string, title?: string, message?: string, validationErrors?: IValidationError[] }
}

export type ApiErrorData = FetchBaseQueryError | SerializedError | { data: IApiErrorDetails }

export interface IApiErrorDetails {
  detail?: string
  errorKey?: string
  message?: string
  validationErrors?: IValidationError[]
  error?: string
  position?: number
  token?: string
}
