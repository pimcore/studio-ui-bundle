/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type TFunction } from 'i18next'
import { isString } from 'lodash'
import { type IErrorGetContent } from '@Pimcore/modules/app/error-handler/types'
import { isNonEmptyString } from '@Pimcore/utils/type-utils'

export const getErrorMessage = (content: IErrorGetContent['data'], t: TFunction): string => {
  if (isString(content)) {
    return content
  }

  // Validation messages are composed on the server from field names and entered values. Show them
  // verbatim: a translation lookup would register every distinct message as a new translation key.
  if (isNonEmptyString(content.message)) {
    return content.message
  }

  return t(`error.${content.errorKey}`)
}
