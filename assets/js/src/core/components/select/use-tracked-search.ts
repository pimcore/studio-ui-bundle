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
  /** Control the search text of the antd Select. Only then the tracked text is guaranteed to match the visible list. */
  enabled: boolean
  mode: SelectProps['mode']
  autoClearSearchValue: SelectProps['autoClearSearchValue']
  onSearch: SelectProps['onSearch']
  onSelect: SelectProps['onSelect']
  onDeselect: SelectProps['onDeselect']
}

/**
 * Owns the search text of a multiple Select (passed back as `searchValue`), so the options that are visible and the
 * options "Select all" adds can never drift apart. antd clears its own text without telling us (after a pick or
 * deselect, on blur), so a controlled value has to repeat those clears. It stays after the dropdown closes. Removing a tag with its x also clears
 * the text (antd keeps it there), which only ever makes the list and "Select all" show more, never less.
 */
export const useTrackedSearch = ({
  enabled,
  mode,
  autoClearSearchValue,
  onSearch,
  onSelect,
  onDeselect
}: TrackedSearchOptions): {
  searchValue: string
  controlledSearchValue: string | undefined
  resetSearch: () => void
  handleSearch: (search: string) => void
  handleSelect: NonNullable<SelectProps['onSelect']>
  handleDeselect: NonNullable<SelectProps['onDeselect']>
} => {
  const [searchValue, setSearchValue] = useState('')
  const clearsAfterPick = mode === 'multiple' && autoClearSearchValue !== false

  return {
    searchValue,
    controlledSearchValue: enabled ? searchValue : undefined,
    resetSearch: () => { setSearchValue('') },
    handleSearch: (search) => {
      setSearchValue(search)
      onSearch?.(search)
    },
    handleSelect: (selectedValue, option) => {
      if (clearsAfterPick) {
        setSearchValue('')
      }
      onSelect?.(selectedValue, option)
    },
    handleDeselect: (deselectedValue, option) => {
      if (clearsAfterPick) {
        setSearchValue('')
      }
      onDeselect?.(deselectedValue, option)
    }
  }
}
