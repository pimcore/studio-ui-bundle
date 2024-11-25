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
import { FILTER_TYPE } from '../../../constants/systemTypes'

interface IUsePQLQueryFilterHookReturn {
  pqlQueryValue: string
  setPQLQueryValue: (value: string) => void
  isShowPQLQueryError: boolean
  setIsShowPQLQueryError: (value: boolean) => void
  handleChangePQLQueryValue: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  handleSavePQLQueryValue: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export const usePQLQueryFilter = (): IUsePQLQueryFilterHookReturn => {
  const [isShowPQLQueryError, setIsShowPQLQueryError] = useState(false)
  const [pqlQueryValue, setPQLQueryValue] = useState<string>('')

  const { addOrUpdateFilterValue } = useFilters()

  const handleChangePQLQueryValue = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setPQLQueryValue(e.target.value)

    setIsShowPQLQueryError(false)
  }

  const handleSavePQLQueryValue = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    addOrUpdateFilterValue({ type: FILTER_TYPE.PQL_QUERY_TYPE, value: e.target.value })
  }

  return {
    pqlQueryValue,
    setPQLQueryValue,
    handleChangePQLQueryValue,
    handleSavePQLQueryValue,
    isShowPQLQueryError,
    setIsShowPQLQueryError
  }
}
