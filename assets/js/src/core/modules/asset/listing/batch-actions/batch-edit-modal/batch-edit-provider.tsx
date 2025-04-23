/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import { type AvailableColumn } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/available-columns-provider'
import React, { useState, createContext, useMemo } from 'react'

export interface BatchEdit extends AvailableColumn {
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
