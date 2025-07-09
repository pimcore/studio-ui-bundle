import { FilterProviderProps } from "@Pimcore/modules/element/listing/decorators/general-filters/view-layer/components/sidebar/tabs/filters/provider/filter-provider/filter-provider";
import { isNil } from "lodash";
import React, { createContext, useMemo } from "react";

export interface FilterProviderData {
  dateFrom: string | null;
  setDateFrom: (date: string | null) => void;
  dateTo: string | null;
  setDateTo: (date: string | null) => void;
  columnFilters: ColumnFilters;
  updateFilters: () => void;
  resetFilters: () => void;
}
export type FilterContextProps = FilterProviderData | undefined

export const FilterProviderContext = createContext<FilterContextProps>(undefined)

export interface DateFromFilter {
  key: string;
  type: string;
  filterValue: {
    operator: string;
    value: string | null;
  }
}

export interface ColumnFilters extends Array<DateFromFilter> { }

export const FilterProvider = (props: FilterProviderProps): React.JSX.Element => {
  const [dateFrom, setDateFrom] = React.useState<string | null>(null)
  const [dateTo, setDateTo] = React.useState<string | null>(null)
  const [columnFilters, setColumnFilters] = React.useState<ColumnFilters>([])

  const updateFilters = (): void => {
    setColumnFilters(getColumnFilters())
  }

  const resetFilters = (): void => {
    setDateFrom(() => null)
    setDateTo(() => null)
    setColumnFilters([])
  }

  const getColumnFilters = (): ColumnFilters => {
    const filters: ColumnFilters = []

    if (!isNil(dateFrom)) {
      filters.push({
        key: 'dateFrom',
        type: 'date',
        filterValue: {
          operator: 'from',
          value: dateFrom
        }
      })
    }

    if (!isNil(dateTo)) {
      filters.push({
        key: 'dateTo',
        type: 'date',
        filterValue: {
          operator: 'to',
          value: dateTo
        }
      })
    }

    console.log('filters -inside', filters)

    return filters
  }

  return useMemo(() => (
    <FilterProviderContext.Provider value={{
      dateFrom,
      setDateFrom,
      dateTo,
      setDateTo,
      columnFilters,
      updateFilters,
      resetFilters
    }}
    >
      {props.children}
    </FilterProviderContext.Provider>
  ), [dateFrom, dateTo, columnFilters])
}