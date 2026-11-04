/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import type { DefaultOptionType } from 'antd/es/select'

type SelectValue = string | number
type FilterOption = boolean | ((input: string, option?: DefaultOptionType) => boolean)

interface SelectAllContext {
  options?: DefaultOptionType[]
  value?: unknown
  searchValue?: string
  optionFilterProp?: string
  filterOption?: FilterOption
}

const flattenOptions = (options: DefaultOptionType[] = []): DefaultOptionType[] => {
  return options.flatMap(option => Array.isArray(option.options) ? flattenOptions(option.options as DefaultOptionType[]) : [option])
}

const matchesSearch = (option: DefaultOptionType, { searchValue, optionFilterProp = 'value', filterOption }: SelectAllContext): boolean => {
  if (searchValue === undefined || searchValue === '' || filterOption === false) {
    return true
  }

  if (typeof filterOption === 'function') {
    return filterOption(searchValue, option)
  }

  const candidate = option[optionFilterProp]
  return String(candidate ?? '').toUpperCase().includes(searchValue.toUpperCase())
}

const isSelectValue = (value: unknown): value is SelectValue => typeof value === 'string' || typeof value === 'number'

const toArray = (value: unknown): SelectValue[] => Array.isArray(value) ? value.filter(isSelectValue) : []

/**
 * Options "Select all" would add: enabled options that match the active search and are not selected yet.
 */
export const getSelectableOptions = (context: SelectAllContext): DefaultOptionType[] => {
  const selected = new Set(toArray(context.value))

  return flattenOptions(context.options).filter(option => {
    return option.disabled !== true && isSelectValue(option.value) && !selected.has(option.value) && matchesSearch(option, context)
  })
}

/**
 * The value after "Select all": the current selection first, then the selectable options.
 */
export const getSelectAllValues = (context: SelectAllContext): SelectValue[] => {
  return [
    ...toArray(context.value),
    ...getSelectableOptions(context).map(option => option.value!)
  ]
}
