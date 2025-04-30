/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type dynamicTypeRegistriesServiceIds } from '@Pimcore/app/config/services/service-ids'
import React, { createContext, useContext, useMemo } from 'react'
import { type NonEmptyArray } from 'types/non-empty-array'

interface IDynamicTypeRegistryContext {
  serviceIds: NonEmptyArray<keyof typeof dynamicTypeRegistriesServiceIds>
}

export const DynamicTypeRegistryContext = createContext<IDynamicTypeRegistryContext | null>(null)

interface DynamicTypeRegistryProviderProps extends IDynamicTypeRegistryContext {
  children: React.ReactNode
}

export const DynamicTypeRegistryProvider = ({ children, serviceIds }: DynamicTypeRegistryProviderProps): React.JSX.Element => {
  const context = useContext(DynamicTypeRegistryContext)
  const cachedServiceIds: IDynamicTypeRegistryContext['serviceIds'] = useMemo(() => {
    const _serviceIds: IDynamicTypeRegistryContext['serviceIds'] = [...serviceIds]
    _serviceIds.unshift(...context?.serviceIds ?? [])
    return _serviceIds
  }, [serviceIds, context?.serviceIds])

  return useMemo(() => {
    return (
      <DynamicTypeRegistryContext.Provider value={ { serviceIds: cachedServiceIds } }>
        {children}
      </DynamicTypeRegistryContext.Provider>
    )
  }, [serviceIds])
}
