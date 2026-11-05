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
import { useTranslation } from 'react-i18next'
import { isString, isUndefined } from 'lodash'
import { type IErrorGetContent } from '@Pimcore/modules/app/error-handler/types'
import { getErrorMessage } from '@Pimcore/modules/app/error-handler/utils/get-error-message'
import { isNonEmptyString } from '@Pimcore/utils/type-utils'
import { DEFAULT_ERROR_CONTENT } from '@Pimcore/modules/app/error-handler/classes/api-error'
import { SanitizeHtml } from '@Pimcore/components/sanitize-html/sanitize-html'

interface IApiErrorViewUIProps {
  errorContent: IErrorGetContent['data']
}

export const ApiErrorViewUI = ({ errorContent }: IApiErrorViewUIProps): React.JSX.Element => {
  const { t } = useTranslation()

  // Server-composed messages can contain entered values: render them as text, never as markup.
  // That covers both shapes the server message arrives in — a bare string, which is what
  // ApiError returns for a body carrying only `message`, and the object form below. Only a
  // translated error key goes on through SanitizeHtml, because a translation may carry markup.
  if (isString(errorContent)) {
    return <div>{ errorContent }</div>
  }

  if (isNonEmptyString(errorContent?.message)) {
    return <div>{ errorContent.message }</div>
  }

  const errorKeyValue = isUndefined(errorContent?.errorKey)
    ? DEFAULT_ERROR_CONTENT
    : getErrorMessage(errorContent, t)

  return (
    <SanitizeHtml html={ errorKeyValue } />
  )
}
