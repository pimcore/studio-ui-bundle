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
import { DEFAULT_ERROR_CONTENT } from '@Pimcore/modules/app/error-handler/classes/api-error'
import { SanitizeHtml } from '@Pimcore/components/sanitize-html/sanitize-html'
import { ErrorKeyTypes } from '@Pimcore/modules/app/error-handler/constants/errorTypes'
import { formatValidationErrorHtml } from '@Pimcore/modules/app/error-handler/utils/format-validation-error'

interface IApiErrorViewUIProps {
  errorContent: IErrorGetContent['data']
}

export const ApiErrorViewUI = ({ errorContent }: IApiErrorViewUIProps): React.JSX.Element => {
  const { t } = useTranslation()

  // Element validation: errorKey carries the human-readable, server-combined
  // violation text (one per line), NOT an i18n key — render it directly as a
  // list, without the `error.` prefix that t() would add.
  if (
    !isString(errorContent) &&
    !isUndefined(errorContent?.errorKey) &&
    errorContent?.title === ErrorKeyTypes.ELEMENT_VALIDATION_FAILED
  ) {
    return <SanitizeHtml html={ formatValidationErrorHtml(String(errorContent.errorKey)) } />
  }

  const getErrorKeyValue = (): string => {
    if (!isString(errorContent) && !isUndefined(errorContent?.errorKey)) {
      return t(`error.${errorContent.errorKey}`)
    }

    return DEFAULT_ERROR_CONTENT
  }

  const textValue: string = isString(errorContent) ? errorContent : getErrorKeyValue()

  return (
    <SanitizeHtml html={ textValue } />
  )
}
