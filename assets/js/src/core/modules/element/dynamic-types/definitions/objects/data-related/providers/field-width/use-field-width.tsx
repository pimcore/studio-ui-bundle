/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useContext } from 'react'
import { FieldWidthContext, type IFieldWidthContext, defaultFieldWidthValues } from './field-width-provider'
import { isNil } from 'lodash'

export const useFieldWidth = (): IFieldWidthContext => {
  const context = useContext(FieldWidthContext)

  if (isNil(context)) {
    return defaultFieldWidthValues
  }

  return context
}

export const useFieldWidthOptional = (): IFieldWidthContext | undefined => {
  const context = useContext(FieldWidthContext)

  if (isNil(context)) {
    return undefined
  }

  return context
}
