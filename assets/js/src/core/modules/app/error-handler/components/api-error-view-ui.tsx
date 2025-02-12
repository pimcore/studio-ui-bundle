/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import React from 'react'
import { useTranslation } from 'react-i18next'
import { isString, isUndefined } from 'lodash'
import { type IErrorGetContent } from '@Pimcore/modules/app/error-handler/types'
import { DEFAULT_ERROR_CONTENT } from '@Pimcore/modules/app/error-handler/classes/api-error'

interface IApiErrorViewUIProps {
  errorContent: IErrorGetContent['data']
}

export const ApiErrorViewUI = ({ errorContent }: IApiErrorViewUIProps): React.JSX.Element => {
  const { t } = useTranslation()

  const getErrorKeyValue = (): string => {
    if (!isString(errorContent) && !isUndefined(errorContent?.errorKey)) {
      return t(`error.${errorContent.errorKey}`)
    }

    return DEFAULT_ERROR_CONTENT
  }

  const textValue: string = isString(errorContent) ? errorContent : getErrorKeyValue()

  return (
    <>{textValue}</>
  )
}
