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
import { LayoutProvider as DefaultLayoutProvider, useLayout as useDefaultLayout } from '@Pimcore/modules/field-definitions/components/editor/items/detail/layout-provider'
import { type Layout } from '@Pimcore/modules/field-definitions/utils/layout-provider-factory'
import React, { type ComponentType, createContext, useContext, useMemo } from 'react'
import { type AnyMutationHook, type AnyQueryHook } from 'types/react-query'

export interface UseDetailLayoutAccessorReturn {
  accessor: (detailData: Record<string, unknown>) => Layout | undefined
}

export interface ISettingsContext {
  AddModal: ComponentType<OptionalModalProps>
  useItemsQuery: AnyQueryHook
  useItemsDeleteMutation: AnyMutationHook
  useDetailLayoutQuery?: AnyQueryHook
  useDetailLayoutAccessor?: () => UseDetailLayoutAccessorReturn
  useDetailGeneralSettingsQuery: AnyQueryHook
  useDetailUpdateMutation: AnyMutationHook
  LayoutProvider: typeof DefaultLayoutProvider
  useLayout: typeof useDefaultLayout
  customLayouts?: {
    ModalContent?: React.JSX.Element

    parent?: {
      useLayout: typeof useDefaultLayout
    }
  }
}

export const SettingsContext = createContext<ISettingsContext | undefined>(undefined)

export interface SettingsProviderProps extends Omit<ISettingsContext, 'LayoutProvider' | 'useLayout'> {
  children: React.ReactNode
  LayoutProvider?: typeof DefaultLayoutProvider
  useLayout?: typeof useDefaultLayout
}

export const SettingsProvider = (props: SettingsProviderProps): React.JSX.Element => {
  const {
    children,
    LayoutProvider = DefaultLayoutProvider,
    useLayout = useDefaultLayout,
    ...rest
  } = props

  const providerProps = {
    LayoutProvider,
    useLayout,
    ...rest
  }

  return useMemo(() => (
    <SettingsContext.Provider value={ providerProps }>
      {children}
    </SettingsContext.Provider>
  ), [children, providerProps])
}

export const useSettings = (): ISettingsContext => {
  const context = useContext(SettingsContext)

  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider')
  }

  return context
}
