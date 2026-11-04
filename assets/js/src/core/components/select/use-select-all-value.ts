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
import { getOptionsForValues, getSelectableOptions, getSelectAllValues } from './select-all-values'

interface UseSelectAllValueProps {
  allowSelectAll: boolean
  mode?: SelectProps['mode']
  value?: unknown
  onChange?: SelectProps['onChange']
  loading: boolean
  searchValue?: string
  antdSelectProps: SelectProps
}

/**
 * Select all needs the current selection. An uncontrolled multiselect keeps it here, as Antd's own copy is not readable.
 */
export const useSelectAllValue = ({ allowSelectAll, mode, value, onChange, loading, searchValue, antdSelectProps }: UseSelectAllValueProps): {
  currentValue: unknown
  handleChange: NonNullable<SelectProps['onChange']>
  shouldShowSelectAll: boolean
  handleSelectAll: () => void
} => {
  const isSelectAllEnabled = allowSelectAll && mode === 'multiple' && antdSelectProps.labelInValue !== true
  const isTrackingValue = isSelectAllEnabled && value === undefined
  const [innerValue, setInnerValue] = useState<unknown>(antdSelectProps.defaultValue)

  const handleChange: NonNullable<SelectProps['onChange']> = (nextValue, option) => {
    if (isTrackingValue) {
      setInnerValue(nextValue)
    }
    onChange?.(nextValue, option)
  }

  const currentValue = isTrackingValue ? innerValue : value
  const { options, optionFilterProp, filterOption, maxCount, searchValue: customSearchValue } = antdSelectProps
  const selectAllContext = { options, value: currentValue, searchValue: customSearchValue ?? searchValue, optionFilterProp, filterOption }
  const shouldShowSelectAll = isSelectAllEnabled && !loading && maxCount === undefined && getSelectableOptions(selectAllContext).length > 0

  const handleSelectAll = (): void => {
    const values = getSelectAllValues(selectAllContext)
    handleChange(values, getOptionsForValues(options, values))
  }

  return { currentValue, handleChange, shouldShowSelectAll, handleSelectAll }
}
