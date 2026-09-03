/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import {type AbstractDecoratorProps} from '@Pimcore/modules/element/listing/decorators/abstract-decorator'
import {useElementSelectorHelper} from '@Pimcore/modules/element/element-selector/provider/element-selector/use-element-selector-helper'

export const fieldNameFilterType = 'system.fieldName'

export interface FieldNameFilter {
  type: typeof fieldNameFilterType
  key:string
  filterValue: string
}

export const withFieldNameFilterQueryArg = (useBaseHook: AbstractDecoratorProps['useDataQueryHelper']): AbstractDecoratorProps['useDataQueryHelper'] => {
  return () => {
    const {getArgs: baseGetArgs, ...baseMethods} = useBaseHook()
    const {config} = useElementSelectorHelper()
    const fieldName = config.config?.objects?.fieldName

    const getArgs: typeof baseGetArgs = () => {
      const baseArgs = baseGetArgs()

      const currentColumnFilters = baseArgs.body.filters.columnFilters ?? []
      const newColumnFilters = [
        ...currentColumnFilters.filter((currentFilter) => currentFilter.type !== fieldNameFilterType)
      ]

      if (fieldName !== undefined && fieldName !== null && fieldName !== '') {
        const fieldNameFilter: FieldNameFilter = {
          type: fieldNameFilterType,
          key: fieldNameFilterType,
          filterValue: fieldName
        }
        newColumnFilters.push(fieldNameFilter)
      }

      return {
        ...baseArgs,
        body: {
          ...baseArgs.body,
          filters: {
            ...baseArgs.body.filters,
            columnFilters: newColumnFilters
          }
        }
      }
    }

    return {
      ...baseMethods,
      getArgs
    }
  }
}
