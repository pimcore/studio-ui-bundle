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

export interface FiltersStore {
  values: FilterValues
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

    const setValue = useCallback((key: string, value: unknown): void => {
      setValuesState((previous) => ({ ...previous, [key]: value }))
    }, [])

    const setValues = useCallback((next: FilterValues): void => {
      setValuesState((previous) => ({ ...previous, ...next }))
    }, [])

    const reset = useCallback((): void => {
      setValuesState({ ...defaults })
    }, [defaults])

    const store = useMemo<FiltersStore>(
      () => ({ values, setValue, setValues, reset }),
      [values, setValue, setValues, reset]
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
