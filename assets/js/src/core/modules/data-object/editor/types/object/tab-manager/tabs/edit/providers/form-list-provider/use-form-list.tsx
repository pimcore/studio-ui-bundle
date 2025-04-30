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
import { FormListContext, type IFormListContext } from './form-list-provider'

interface UseFormListReturn extends IFormListContext {
  getComputedFieldName: () => Array<string | number>
}

export const useFormList = (): UseFormListReturn | undefined => {
  const formListContext = useContext(FormListContext)

  if (formListContext === undefined) {
    return undefined
  }

  const getComputedFieldName = (): Array<string | number> => {
    const { field, fieldSuffix } = formListContext
    const computedFieldName: Array<string | number> = [field.name]

    if (fieldSuffix !== undefined) {
      computedFieldName.push(fieldSuffix)
    }

    return computedFieldName
  }

  return {
    ...formListContext,
    getComputedFieldName
  }
}
