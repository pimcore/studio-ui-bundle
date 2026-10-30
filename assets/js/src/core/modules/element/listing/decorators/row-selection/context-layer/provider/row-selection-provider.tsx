/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type GridProps } from '@Pimcore/modules/element/listing/abstract/view-layer/components/grid/hooks/use-grid-options'
import { omit } from 'lodash'
import React, { createContext, useCallback, useMemo, useState } from 'react'

export interface SelectedRowData {
  row: any
}

export interface RowSelectionData {
  selectedRows: GridProps['selectedRows']
  setSelectedRows: (rows: GridProps['selectedRows']) => void
  deselectRows: (ids: Array<number | string>) => void
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

  // Functional update, so a deferred caller (e.g. a finished batch job) keeps rows selected in the meantime
  const deselectRows = useCallback((ids: Array<number | string>): void => {
    setSelectedRows((currentRows) => omit(currentRows, ids.map(String)))
  }, [])

  return useMemo(() => (
    <RowSelectionContext.Provider value={ { selectedRows, setSelectedRows, deselectRows, selectedRowsData, setSelectedRowsData } }>
      {children}
    </RowSelectionContext.Provider>
  ), [selectedRows, selectedRowsData])
}
