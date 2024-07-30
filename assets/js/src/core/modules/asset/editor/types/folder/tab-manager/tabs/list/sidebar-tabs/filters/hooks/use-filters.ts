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
import { defaultFilterOptions, FilterContext, type IFilterContext } from '../filter-provider'
import { type GridColumnConfiguration } from 'src/sdk/main'
import { useGridConfig, type useGridConfigHookReturn } from '../../grid-config/hooks/use-grid-config'

interface UseFiltersHookReturn extends IFilterContext, useGridConfigHookReturn {
  addOrUpdateFieldFilter: (column: GridColumnConfiguration, value: string) => void
  removeFieldFilter: (column: GridColumnConfiguration) => void
  getFieldFilter: (column: GridColumnConfiguration) => FieldFilter | undefined
  resetFilters: () => void
}

export interface FieldFilter {
  key: string
  type: string
  filterValue: string
}

export const useFilters = (): UseFiltersHookReturn => {
  const { resetColumns, ...gridConfigProps } = useGridConfig()
  const { filterOptions, setFilterOptions } = useContext(FilterContext)

  return {
    filterOptions,
    setFilterOptions,
    addOrUpdateFieldFilter,
    removeFieldFilter,
    getFieldFilter,
    resetFilters,
    resetColumns,
    ...gridConfigProps
  }

  function resetFilters (): void {
    resetColumns()
    setFilterOptions(defaultFilterOptions)
  }

  function getFieldFilter (column: GridColumnConfiguration): FieldFilter | undefined {
    const fieldFilters = filterOptions.columnFilters

    if (fieldFilters === undefined) {
      return undefined
    }

    const fieldFiltersArray = fieldFilters as FieldFilter[]
    return fieldFiltersArray.find((filter) => filter.key === column.key)
  }

  function removeFieldFilter (column: GridColumnConfiguration): void {
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

  function addOrUpdateFieldFilter (column: GridColumnConfiguration, value: string): void {
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
}
