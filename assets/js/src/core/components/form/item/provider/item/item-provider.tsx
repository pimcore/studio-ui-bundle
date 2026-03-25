/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type FormItemProps } from 'antd'
import React, { createContext, useMemo } from 'react'
import { type VirtualValidationState } from '../../hooks/use-virtual-validation'

export interface ItemData extends FormItemProps {
  validationState?: VirtualValidationState
  onValidate?: (value: unknown) => Promise<VirtualValidationState>
  /** Called by child controls so VirtualItem can keep track of the current value for submit-time validation. */
  onUpdateCurrentValue?: (value: unknown) => void
}

export type ItemContextProps = ItemData | undefined

export const ItemContext = createContext<ItemContextProps>(undefined)

export interface ItemProviderProps {
  item: ItemData
  children: React.ReactNode
}

export const ItemProvider = ({ item, children }: ItemProviderProps): React.JSX.Element => {
  return useMemo(() => (
    <ItemContext.Provider value={ item }>
      {children}
    </ItemContext.Provider>
  ), [item, children])
}
