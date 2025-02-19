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

export interface GlobalRowSelectionData {
  assets: GridProps['selectedRows']
  setAssets: (rows: GridProps['selectedRows']) => void
  assetsData: Record<number, any>
  setAssetsData: (rows: Record<number, any>) => void
  documents: GridProps['selectedRows']
  documentsData: Record<number, any>
  setDocumentsData: (rows: Record<number, any>) => void
  setDocuments: (rows: GridProps['selectedRows']) => void
  objects: GridProps['selectedRows']
  setObjects: (rows: GridProps['selectedRows']) => void
  objectsData: Record<number, any>
  setObjectsData: (rows: Record<number, any>) => void
}

export const GlobalRowSelectionContext = createContext<GlobalRowSelectionData | undefined>(undefined)

export interface GlobalRowSelectionProviderProps {
  children: React.ReactNode
}

export const GlobalRowSelectionProvider = ({ children }: GlobalRowSelectionProviderProps): React.JSX.Element => {
  const [assets, setAssets] = useState<GridProps['selectedRows']>({})
  const [documents, setDocuments] = useState<GridProps['selectedRows']>({})
  const [objects, setObjects] = useState<GridProps['selectedRows']>({})

  const [assetsData, setAssetsData] = useState<GlobalRowSelectionData['assetsData']>({})
  const [documentsData, setDocumentsData] = useState<GlobalRowSelectionData['documentsData']>({})
  const [objectsData, setObjectsData] = useState<GlobalRowSelectionData['objectsData']>({})

  return useMemo(() => (
    <GlobalRowSelectionContext.Provider value={ {
      assets,
      setAssets,
      assetsData,
      setAssetsData,
      documents,
      setDocuments,
      documentsData,
      setDocumentsData,
      objects,
      setObjects,
      objectsData,
      setObjectsData
    } }
    >
      {children}
    </GlobalRowSelectionContext.Provider>
  ), [assets, assetsData, documents, documentsData, objects, objectsData])
}
