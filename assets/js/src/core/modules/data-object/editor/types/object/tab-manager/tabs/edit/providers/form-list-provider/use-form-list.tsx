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
