/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type FilterProviderProps } from '@Pimcore/modules/element/listing/decorators/general-filters/view-layer/components/sidebar/tabs/filters/provider/filter-provider/filter-provider'
import { isNil } from 'lodash'
import React, { createContext, useMemo } from 'react'

export interface FilterProviderData {
  dateFrom: string | null
  setDateFrom: (date: string | null) => void
  dateTo: string | null
  setDateTo: (date: string | null) => void
  logLevel: string | null
  setLogLevel: (logLevel: string | null) => void
  component: string | null
  setComponent: (component: string | null) => void
  relatedObjectId: number | null
  setRelatedObjectId: (relatedObjectId: number | null) => void
  message: string | null
  setMessage: (message: string | null) => void
  pid: number | null
  setPid: (pid: number | null) => void
  columnFilters: ColumnFilters
  updateFilters: () => void
  resetFilters: () => void
}
export type FilterContextProps = FilterProviderData | undefined

export const FilterProviderContext = createContext<FilterContextProps>(undefined)

export interface DateFromFilter {
  key: string
  type: string
  filterValue: {
    operator: string
    value: string | null
  } | string | number
}

export interface ColumnFilters extends Array<DateFromFilter> { }

export const FilterProvider = (props: FilterProviderProps): React.JSX.Element => {
  const [dateFrom, setDateFrom] = React.useState<string | null>(null)
  const [dateTo, setDateTo] = React.useState<string | null>(null)
  const [columnFilters, setColumnFilters] = React.useState<ColumnFilters>([])
  const [logLevel, setLogLevel] = React.useState<string | null>(null)
  const [component, setComponent] = React.useState<string | null>(null)
  const [relatedObjectId, setRelatedObjectId] = React.useState<number | null>(null)
  const [message, setMessage] = React.useState<string | null>(null)
  const [pid, setPid] = React.useState<number | null>(null)

  const updateFilters = (): void => {
    setColumnFilters(getColumnFilters())
  }

  const resetFilters = (): void => {
    setDateFrom(() => null)
    setDateTo(() => null)
    setLogLevel(() => null)
    setComponent(() => null)
    setRelatedObjectId(() => null)
    setMessage(() => null)
    setPid(() => null)

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

    if (!isNil(logLevel)) {
      filters.push({
        key: 'priority',
        type: 'equals',
        filterValue: parseInt(logLevel)
      })
    }

    if (!isNil(component)) {
      filters.push({
        key: 'component',
        type: 'equals',
        filterValue: component
      })
    }

    if (!isNil(relatedObjectId)) {
      filters.push({
        key: 'relatedobject',
        type: 'equals',
        filterValue: relatedObjectId
      })
    }

    if (!isNil(message)) {
      filters.push({
        key: 'message',
        type: 'like',
        filterValue: message
      })
    }

    if (!isNil(pid)) {
      filters.push({
        key: 'pid',
        type: 'equals',
        filterValue: pid
      })
    }

    console.log('filters -inside', filters)

    return filters
  }

  return useMemo(() => (
    <FilterProviderContext.Provider value={ {
      dateFrom,
      setDateFrom,
      dateTo,
      setDateTo,
      logLevel,
      setLogLevel,
      component,
      setComponent,
      relatedObjectId,
      setRelatedObjectId,
      message,
      setMessage,
      pid,
      setPid,
      columnFilters,
      updateFilters,
      resetFilters
    } }
    >
      {props.children}
    </FilterProviderContext.Provider>
  ), [dateFrom, dateTo, columnFilters, logLevel, component, relatedObjectId, message, pid])
}
