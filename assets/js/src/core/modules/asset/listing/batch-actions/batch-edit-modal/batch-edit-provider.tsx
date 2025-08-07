/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type AvailableColumn } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/available-columns-provider'
import React, { useState, createContext, useMemo } from 'react'

export type BatchEdit = AvailableColumn & {
  locale?: string | null
}

export interface BatchContext {
  batchEdits: BatchEdit[]
  setBatchEdits: React.Dispatch<React.SetStateAction<BatchEdit[]>>
}

export const BatchEditContext = createContext<BatchContext>({
  batchEdits: [],
  setBatchEdits: () => {}
})

export interface BatchEditProviderProps {
  children: React.ReactNode
}

export const BatchEditProvider = ({ children }: BatchEditProviderProps): React.JSX.Element => {
  const [batchEdits, setBatchEdits] = useState<BatchEdit[]>([])

  return useMemo(() => (
    <BatchEditContext.Provider value={ { batchEdits, setBatchEdits } }>
      {children}
    </BatchEditContext.Provider>
  ), [batchEdits, children])
}
