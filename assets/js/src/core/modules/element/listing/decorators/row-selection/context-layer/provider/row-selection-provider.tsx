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

import { type GridProps } from '@Pimcore/modules/element/listing/abstract/view-layer/components/grid/hooks/use-grid-options'
import React, { createContext, useMemo, useState } from 'react'

export interface SelectedRowData {
  row: any
}

export interface RowSelectionData {
  selectedRows: GridProps['selectedRows']
  setSelectedRows: (rows: GridProps['selectedRows']) => void
  selectedRowsData: Record<number, any>
  setSelectedRowsData: (rows: Record<number, any>) => void
}

export type RowSelectionContextProps = RowSelectionData | undefined

export const RowSelectionContext = createContext<RowSelectionContextProps>(undefined)

export interface RowSelectionProviderProps {
  children: React.ReactNode
}

export const RowSelectionProvider = ({ children }: RowSelectionProviderProps): React.JSX.Element => {
  const [selectedRows, setSelectedRows] = useState<GridProps['selectedRows']>({})
  const [selectedRowsData, setSelectedRowsData] = useState<RowSelectionData['selectedRowsData']>({})

  return useMemo(() => (
    <RowSelectionContext.Provider value={ { selectedRows, setSelectedRows, selectedRowsData, setSelectedRowsData } }>
      {children}
    </RowSelectionContext.Provider>
  ), [selectedRows, selectedRowsData])
}
