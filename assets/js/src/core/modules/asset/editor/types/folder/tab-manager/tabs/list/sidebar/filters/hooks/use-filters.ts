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
import { FilterContext } from '../filter-provider'
import { type FilterOptions, type IFilterContext } from '../../../types/filterTypes'
import { defaultFilterOptions } from '../../../constants/filters'
import { type GridColumnConfiguration } from 'src/sdk/main'
import { useGridConfig, type useGridConfigHookReturn } from '../../grid-config/hooks/use-grid-config'
import { isEmptyValue } from '@Pimcore/utils/type-utils'
import { type FILTER_TYPE } from '../../../constants/systemTypes'

interface UseFiltersHookReturn extends IFilterContext, useGridConfigHookReturn {
  addOrUpdateFieldFilter: (column: GridColumnConfiguration, value: string | number | null) => void
  removeFieldFilter: (column: GridColumnConfiguration) => void
  getFieldFilter: (column: GridColumnConfiguration) => FieldFilter | undefined
  resetFilters: () => void
  updateIsIncludeDescendants: (value: boolean) => void
  addOrUpdateFilterValue: ({ type, value }: { type: FILTER_TYPE, value: string }) => void
}

export interface FieldFilter {
  key: string
  type: string
  filterValue: string
}

type ColumnFiltersList = Array<FilterOptions['columnFilters']> | []

export const useFilters = (): UseFiltersHookReturn => {
  const { resetColumns, ...gridConfigProps } = useGridConfig()
  const { filterOptions, setFilterOptions, filterError } = useContext(FilterContext)

  const resetFilters = (): void => {
    resetColumns()
    setFilterOptions(defaultFilterOptions)
  }

  const getFieldFilter = (column: GridColumnConfiguration): FieldFilter | undefined => {
    const fieldFilters = filterOptions.columnFilters

    if (fieldFilters === undefined) {
      return undefined
    }

    const fieldFiltersArray = fieldFilters as FieldFilter[]
    return fieldFiltersArray.find((filter) => filter.key === column.key)
  }

  const removeFieldFilter = (column: GridColumnConfiguration): void => {
    const fieldFilters = filterOptions.columnFilters

    if (fieldFilters === undefined) {
      return
    }

    const fieldFiltersArray = fieldFilters as FieldFilter[]
    const filterIndex = fieldFiltersArray.findIndex((filter) => filter.key === column.key)

    if (filterIndex === -1) {
      return
    }

    fieldFiltersArray.splice(filterIndex, 1)

    setFilterOptions((filterOptions) => {
      return {
        ...filterOptions,
        columnFilters: fieldFiltersArray
      }
    })
  }

  const addOrUpdateFieldFilter = (column: GridColumnConfiguration, value: string): void => {
    const fieldFilters = filterOptions.columnFilters
    let newFilters: FieldFilter[] = []

    if (fieldFilters === undefined) {
      newFilters = [{
        key: column.key,
        type: column.type,
        filterValue: value
      }]

      setFilterOptions((filterOptions) => {
        return {
          ...filterOptions,
          columnFilters: newFilters
        }
      })

      return
    }

    const fieldFiltersArray = fieldFilters as FieldFilter[]
    const filterIndex = fieldFiltersArray.findIndex((filter) => filter.key === column.key)

    if (filterIndex === -1) {
      newFilters = [
        ...fieldFiltersArray,
        {
          key: column.key,
          type: column.type,
          filterValue: value
        }
      ]
    } else {
      fieldFiltersArray[filterIndex] = {
        key: column.key,
        type: column.type,
        filterValue: value
      }

      newFilters = fieldFiltersArray
    }

    setFilterOptions((filterOptions) => {
      return {
        ...filterOptions,
        columnFilters: newFilters
      }
    })
  }

  const updateIsIncludeDescendants = (value: boolean): void => {
    setFilterOptions((filterOptions) => {
      return {
        ...filterOptions,
        includeDescendants: value
      }
    })
  }

  const addOrUpdateFilterValue = ({ type, value }: { type: FILTER_TYPE, value: string }): void => {
    setFilterOptions((filterOptions) => {
      const prevColumnFilters = filterOptions.columnFilters

      const filterColumnFiltersList = (): ColumnFiltersList => {
        return (prevColumnFilters as ColumnFiltersList).filter(
          (item: any) => item.type !== type
        )
      }

      const newColumnFilters = !isEmptyValue(value)
        ? [
            ...(filterColumnFiltersList()),
            {
              type,
              filterValue: value
            }
          ]
        : filterColumnFiltersList()

      return {
        ...filterOptions,
        columnFilters: newColumnFilters
      }
    })
  }

  return {
    filterOptions,
    setFilterOptions,
    filterError,
    addOrUpdateFieldFilter,
    removeFieldFilter,
    getFieldFilter,
    resetFilters,
    resetColumns,
    updateIsIncludeDescendants,
    addOrUpdateFilterValue,
    ...gridConfigProps
  }
}
