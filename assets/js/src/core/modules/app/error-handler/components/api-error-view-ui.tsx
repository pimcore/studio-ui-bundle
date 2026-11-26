/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { isEmpty, isString, isUndefined } from 'lodash'
import { type IErrorGetContent } from '@Pimcore/modules/app/error-handler/types'
import { getErrorMessage } from '@Pimcore/modules/app/error-handler/utils/get-error-message'
import { isNonEmptyString } from '@Pimcore/utils/type-utils'
import { DEFAULT_ERROR_CONTENT } from '@Pimcore/modules/app/error-handler/classes/api-error'
import { reportMissingValidationKeys, validationErrorToText } from '@Pimcore/modules/app/error-handler/utils/format-validation-error'
import { SanitizeHtml } from '@Pimcore/components/sanitize-html/sanitize-html'

const MAX_VALIDATION_ROWS = 10

interface IApiErrorViewUIProps {
  errorContent: IErrorGetContent['data']
}

export const ApiErrorViewUI = ({ errorContent }: IApiErrorViewUIProps): React.JSX.Element => {
  const { t } = useTranslation()

  const validationErrors = isString(errorContent) ? undefined : errorContent?.validationErrors

  // Register unknown message keys (never the messages) so admins can translate them.
  useEffect(() => {
    reportMissingValidationKeys(validationErrors ?? [])
  }, [validationErrors])

  // The aggregated `message` is intentionally not shown here: it is the joined form of these rows.
  // Everything below is rendered as React text nodes only, never as markup.
  if (!isString(errorContent) && !isEmpty(errorContent?.validationErrors)) {
    // identical rows carry no extra information, and the text doubles as a stable key
    const rows = [...new Set(errorContent.validationErrors!.map(validationErrorToText))]
    const rest = rows.length - MAX_VALIDATION_ROWS

    return (
      <ul>
        { rows.slice(0, MAX_VALIDATION_ROWS).map(row => (
          <li key={ row }>{ row }</li>
        )) }
        { rest > 0 && <li>{ t('validation.and_more', { n: rest }) }</li> }
      </ul>
    )
  }

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
