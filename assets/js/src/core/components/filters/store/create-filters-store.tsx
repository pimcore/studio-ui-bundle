/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { createContext, useCallback, useContext, useMemo, useState, type FC, type ReactNode } from 'react'
import { type FilterValues } from '../types'

export interface FilterValueSeed {
  key: string
  defaultValue: unknown
}

/** How often each key was written. Lets a consumer tell a write that kept the value from no write at all. */
export type FilterWriteCounts = Record<string, number>

export interface FiltersStore {
  values: FilterValues
  /** Always filled by `createFiltersStore`; optional so a custom store implementing this interface stays valid. */
  writeCounts?: FilterWriteCounts
  setValue: (key: string, value: unknown) => void
  setValues: (values: FilterValues) => void
  reset: () => void
}

export interface FiltersStoreProviderProps {
  children: ReactNode
  descriptors: readonly FilterValueSeed[]
  initialValues?: FilterValues
}

export interface FiltersStoreInstance {
  FiltersStoreProvider: FC<FiltersStoreProviderProps>
  useFiltersStore: () => FiltersStore
  useFiltersStoreOptional: () => FiltersStore | undefined
}

const buildDefaults = (descriptors: readonly FilterValueSeed[]): FilterValues => {
  const defaults: FilterValues = {}

  for (const descriptor of descriptors) {
    defaults[descriptor.key] = descriptor.defaultValue
  }

  return defaults
}

export const createFiltersStore = (): FiltersStoreInstance => {
  const FiltersStoreContext = createContext<FiltersStore | undefined>(undefined)

  const FiltersStoreProvider: FC<FiltersStoreProviderProps> = ({ children, descriptors, initialValues }) => {
    const defaults = useMemo(() => buildDefaults(descriptors), [descriptors])
    const [values, setValuesState] = useState<FilterValues>(() => ({ ...defaults, ...initialValues }))
    const [writeCounts, setWriteCounts] = useState<FilterWriteCounts>({})

    const countWrites = useCallback((keys: string[]): void => {
      setWriteCounts((previous) => {
        const next = { ...previous }

        for (const key of keys) {
          next[key] = (next[key] ?? 0) + 1
        }

        return next
      })
    }, [])

    const setValue = useCallback((key: string, value: unknown): void => {
      setValuesState((previous) => ({ ...previous, [key]: value }))
      countWrites([key])
    }, [countWrites])

    const setValues = useCallback((next: FilterValues): void => {
      setValuesState((previous) => ({ ...previous, ...next }))
      countWrites(Object.keys(next))
    }, [countWrites])

    const reset = useCallback((): void => {
      setValuesState({ ...defaults })
      countWrites(Object.keys(defaults))
    }, [defaults, countWrites])

    const store = useMemo<FiltersStore>(
      () => ({ values, writeCounts, setValue, setValues, reset }),
      [values, writeCounts, setValue, setValues, reset]
    )

    return (
      <FiltersStoreContext.Provider value={ store }>
        {children}
      </FiltersStoreContext.Provider>
    )
  }

  const useFiltersStore = (): FiltersStore => {
    const context = useContext(FiltersStoreContext)

    if (context === undefined) {
      throw new Error('useFiltersStore must be used within its FiltersStoreProvider')
    }

    return context
  }

  const useFiltersStoreOptional = (): FiltersStore | undefined => useContext(FiltersStoreContext)

  return { FiltersStoreProvider, useFiltersStore, useFiltersStoreOptional }
}
