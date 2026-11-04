/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useState } from 'react'
import type { SelectProps } from 'antd'

interface TrackedSearchOptions {
  mode: SelectProps['mode']
  autoClearSearchValue: SelectProps['autoClearSearchValue']
  onSearch: SelectProps['onSearch']
  onSelect: SelectProps['onSelect']
}

/**
 * Mirrors the search text of the antd Select, which does not expose it. Needed to know which options are visible.
 */
export const useTrackedSearch = ({ mode, autoClearSearchValue, onSearch, onSelect }: TrackedSearchOptions): {
  searchValue: string
  resetSearch: () => void
  handleSearch: (search: string) => void
  handleSelect: NonNullable<SelectProps['onSelect']>
} => {
  const [searchValue, setSearchValue] = useState('')

  return {
    searchValue,
    resetSearch: () => { setSearchValue('') },
    handleSearch: (search) => {
      setSearchValue(search)
      onSearch?.(search)
    },
    // rc-select clears its own search text after a pick in multiple mode, without calling onSearch.
    handleSelect: (selectedValue, option) => {
      if (mode === 'multiple' && autoClearSearchValue !== false) {
        setSearchValue('')
      }
      onSelect?.(selectedValue, option)
    }
  }
}
