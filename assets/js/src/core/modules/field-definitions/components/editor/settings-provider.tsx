/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type OptionalModalProps } from '@Pimcore/components/modal/factory/modal-factory'
import React, { type ComponentType, createContext, useContext, useMemo } from 'react'
import { type AnyMutationHook, type AnyQueryHook } from 'types/react-query'

export interface ISettingsContext {
  AddModal: ComponentType<OptionalModalProps>
  useItemsQuery: AnyQueryHook
  useItemsDeleteMutation: AnyMutationHook
  useDetailLayoutQuery: AnyQueryHook
  useDetailGeneralSettingsQuery: AnyQueryHook
  useDetailUpdateMutation: AnyMutationHook
}

export const SettingsContext = createContext<ISettingsContext | undefined>(undefined)

export interface SettingsProviderProps extends ISettingsContext {
  children: React.ReactNode
}

export const SettingsProvider = (props: SettingsProviderProps): React.JSX.Element => {
  const { children, ...rest } = props

  return useMemo(() => (
    <SettingsContext.Provider value={ rest }>
      {children}
    </SettingsContext.Provider>
  ), [children, rest])
}

export const useSettings = (): ISettingsContext => {
  const context = useContext(SettingsContext)

  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider')
  }

  return context
}
