/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { createContext, useContext, useMemo, useState } from 'react'

export interface ConfigurationPartial {
  id: string
  name: string
  group?: string
  icon?: {
    value: string
    color?: string
  }
}

export type DetailView = 'layout' | 'general'

export interface IItemsContext {
  configurations: ConfigurationPartial[]
  activeConfiguration: ConfigurationPartial | undefined
  closeConfiguration: (config: ConfigurationPartial) => void
  openConfiguration: (config: ConfigurationPartial) => void
  setActiveConfiguration: (config: ConfigurationPartial) => void
  closeActiveConfiguration: () => void
  detailView: DetailView
  setDetailView: (view: DetailView) => void
}

export const ItemsContext = createContext<IItemsContext | undefined>(undefined)

export interface ItemsProviderProps {
  children: React.ReactNode
}

export const ItemsProvider = (props: ItemsProviderProps): React.JSX.Element => {
  const [configurations, setConfigurations] = useState<ConfigurationPartial[]>([])
  const [activeConfiguration, setActiveConfigurationInternal] = useState<ConfigurationPartial | undefined>(undefined)
  const [detailView, setDetailView] = useState<DetailView>('general')

  const closeActiveConfiguration = (): void => {
    if (activeConfiguration === undefined) {
      return
    }

    setConfigurations((prevConfigs) => {
      return prevConfigs.filter((cd) => cd.id !== activeConfiguration.id)
    })

    if (configurations.length > 1) {
      const currentIndex = configurations.findIndex((cd) => cd.id === activeConfiguration.id)
      const nextIndex = currentIndex === configurations.length - 1 ? currentIndex - 1 : currentIndex + 1
      setActiveConfigurationInternal(configurations[nextIndex])
      return
    }

    setActiveConfigurationInternal(undefined)
  }

  const setActiveConfiguration = (config: ConfigurationPartial): void => {
    if (configurations.find((cd) => cd.id === config.id) === undefined) {
      openConfiguration(config)
      return
    }

    setActiveConfigurationInternal(config)
  }

  const openConfiguration = (config: ConfigurationPartial): void => {
    setConfigurations((prevConfigs) => {
      if (prevConfigs.find((cd) => cd.id === config.id) !== undefined) {
        return prevConfigs
      }

      return [...prevConfigs, config]
    })

    setActiveConfigurationInternal(config)
    setDetailView('general')
  }

  const closeConfiguration = (config: ConfigurationPartial): void => {
    if (activeConfiguration?.id === config.id) {
      closeActiveConfiguration()
    }

    setConfigurations((prevConfigs) => {
      return prevConfigs.filter((cd) => cd.id !== config.id)
    })
  }

  return useMemo(() => {
    return (
      <ItemsContext.Provider value={ {
        configurations,
        closeConfiguration,
        openConfiguration,
        activeConfiguration,
        setActiveConfiguration,
        closeActiveConfiguration,
        detailView,
        setDetailView
      } }
      >
        {props.children}
      </ItemsContext.Provider>
    )
  }, [props.children, configurations, activeConfiguration, detailView])
}

export const useItems = (): IItemsContext => {
  const context = useContext(ItemsContext)

  if (context === undefined) {
    throw new Error('useItems must be used within a ItemsProvider')
  }

  return context
}
