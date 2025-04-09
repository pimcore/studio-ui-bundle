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

import { type DefaultOptionType } from 'antd/es/select'
import { isUndefined } from 'lodash'

export type SelectOptionType = DefaultOptionType & {
  displayValue?: string
}

export interface SelectOptionsConfig {
  options?: string[] | SelectOptionType[]
  optionsUseHook?: (fieldName: string) => { isLoading: boolean, options: SelectOptionType[] } | undefined
}

export const resolveOptions = (
  config: SelectOptionsConfig,
  fieldName: string
): { isLoading: boolean, options: SelectOptionType[] } => {
  const emptyResult = { isLoading: false, options: [] }

  if (!isUndefined(config.optionsUseHook)) {
    const useHookResult = config.optionsUseHook(fieldName)
    if (isUndefined(useHookResult)) {
      return emptyResult
    }
    return useHookResult
  }

  if (isUndefined(config.options)) {
    return emptyResult
  }

  return {
    isLoading: false,
    options: config.options.map((value: string | object) => (
      typeof value === 'object' ? value : { label: value, value }
    ))
  }
}
