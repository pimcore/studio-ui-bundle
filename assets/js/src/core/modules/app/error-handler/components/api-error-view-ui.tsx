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
