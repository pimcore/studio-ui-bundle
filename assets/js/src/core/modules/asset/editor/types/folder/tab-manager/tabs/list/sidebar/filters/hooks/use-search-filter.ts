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

interface IUseSearchFilterHookReturn {
  searchValue: string
  setSearchValue: (value: string) => void
  handleChangeSearchValue: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSaveSearchValue: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const useSearchFilter = (): IUseSearchFilterHookReturn => {
  const [searchValue, setSearchValue] = useState<string>('')

  const { addOrUpdateSearchFilter } = useFilters()

  const handleChangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(e.target.value)
  }

  const handleSaveSearchValue = (e: React.ChangeEvent<HTMLInputElement>): void => {
    addOrUpdateSearchFilter(e.target.value)
  }

  return {
    searchValue,
    setSearchValue,
    handleChangeSearchValue,
    handleSaveSearchValue
  }
}
