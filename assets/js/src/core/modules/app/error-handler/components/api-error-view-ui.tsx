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
import { useAppDispatch } from '@Pimcore/app/store'
import { addMissingTranslation } from '@Pimcore/app/i18n/store/missingTranslations.slice'
import { getMissingValidationKeys, validationErrorToText } from '@Pimcore/modules/app/error-handler/utils/format-validation-error'
import { SanitizeHtml } from '@Pimcore/components/sanitize-html/sanitize-html'

const MAX_VALIDATION_ROWS = 10

interface IApiErrorViewUIProps {
  errorContent: IErrorGetContent['data']
}

export const ApiErrorViewUI = ({ errorContent }: IApiErrorViewUIProps): React.JSX.Element => {
  const { t } = useTranslation()

  const dispatch = useAppDispatch()
  const validationErrors = isString(errorContent) ? undefined : errorContent?.validationErrors

  // Register unknown message keys (never the messages) so admins can translate them.
  useEffect(() => {
    getMissingValidationKeys(validationErrors ?? []).forEach(key => dispatch(addMissingTranslation(key)))
  }, [validationErrors])

  // Everything below is rendered as React text nodes only, never as markup.
  if (!isString(errorContent) && !isEmpty(errorContent?.validationErrors)) {
    const errors = errorContent.validationErrors!
    const rest = errors.length - MAX_VALIDATION_ROWS

    return (
      <ul>
        { errors.slice(0, MAX_VALIDATION_ROWS).map((error, index) => (
          <li key={ index }>{ validationErrorToText(error) }</li>
        )) }
        { rest > 0 && <li>{ t('validation.and_more', { n: rest }) }</li> }
      </ul>
    )
  }

  // Server-composed messages can contain entered values: render them as text, never as markup.
  if (!isString(errorContent) && isNonEmptyString(errorContent?.message)) {
    return <div>{ errorContent.message }</div>
  }

  const getErrorKeyValue = (): string => {
    if (!isString(errorContent) && !isUndefined(errorContent?.errorKey)) {
      return getErrorMessage(errorContent, t)
    }

    return DEFAULT_ERROR_CONTENT
  }

  const textValue: string = isString(errorContent) ? errorContent : getErrorKeyValue()

  return (
    <SanitizeHtml html={ textValue } />
  )
}
