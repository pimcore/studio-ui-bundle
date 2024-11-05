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

import type React from 'react'
import { useState } from 'react'
import { useFilters } from './use-filters'

interface IUsePQLQueryFilterHookReturn {
  pqlQueryValue: string
  setPQLQueryValue: (value: string) => void
  handleChangePQLQueryValue: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  handleSavePQLQueryValue: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export const usePQLQueryFilter = (): IUsePQLQueryFilterHookReturn => {
  const [pqlQueryValue, setPQLQueryValue] = useState<string>('')

  const { addOrUpdatePQLQuery } = useFilters()

  const handleChangePQLQueryValue = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setPQLQueryValue(e.target.value)
  }

  const handleSavePQLQueryValue = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    addOrUpdatePQLQuery(e.target.value)
  }

  return {
    pqlQueryValue,
    setPQLQueryValue,
    handleChangePQLQueryValue,
    handleSavePQLQueryValue
  }
}
