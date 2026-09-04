/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { createContext, useEffect, useMemo, useState } from 'react'

export interface IDynamicFilter {
  id: string
  translationKey: string
  type: string
  data: any
  frontendType?: string
  filterType?: string
  config?: any
  localizable?: boolean
  locale?: string | null
  name?: string
  nameTooltip?: string
}

export interface DynamicFilterData extends IDynamicFilter {
  setData: (data: any) => void
  /**
   * Only defined when the host passed an onCommit handler. Filter components use its
   * presence to decide whether to offer an immediate-apply control (search icon / Enter);
   * hosts that only collect draft values leave it undefined.
   */
  commit?: (data: any) => void
}

export type DynamicFilterContextProps = DynamicFilterData | undefined

export const DynamicFilterContext = createContext<DynamicFilterContextProps>(undefined)

export interface DynamicFilterProviderProps extends Omit<DynamicFilterData, 'setData' | 'commit'> {
  onChange?: (data: any) => void
  onCommit?: (data: any) => void
  children: React.ReactNode
}

export const DynamicFilterProvider = ({ children, id, type, translationKey, data, onChange, onCommit, frontendType, config }: DynamicFilterProviderProps): React.JSX.Element => {
  const [_data, _setData] = useState<DynamicFilterData['data']>(data)

  useEffect(() => {
    _setData(data)
  }, [data])

  const setData = (data: any): void => {
    _setData(data)
    if (onChange !== undefined) {
      onChange(data)
    }
  }

  const commit = onCommit === undefined ? undefined : (data: any): void => {
    _setData(data)

    if (onChange !== undefined) {
      onChange(data)
    }

    onCommit(data)
  }

  const canCommit = commit !== undefined

  return useMemo(() => (
    <DynamicFilterContext.Provider value={ { id, translationKey, type, data: _data, setData, commit, frontendType, config } }>
      {children}
    </DynamicFilterContext.Provider>
  ), [id, type, _data, frontendType, config, children, canCommit])
}
