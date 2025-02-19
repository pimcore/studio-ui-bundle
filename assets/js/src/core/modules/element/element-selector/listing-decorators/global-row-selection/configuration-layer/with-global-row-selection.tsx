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

import React, { useEffect, useMemo } from 'react'
import { type IGlobalRowSelectionConfig, type IGlobalRowSelectionDecoratorProps } from '../global-row-selection-decorator'
import { useRowSelection } from '@Pimcore/modules/element/listing/decorators/row-selection/context-layer/provider/use-row-selection'
import { useGlobalRowSelection } from '../../../provider/global-row-selection/use-global-row-selection'
import { useAreaControl } from '../../../provider/area-control/use-area-control'

export const withGlobalRowSelection = (Component: IGlobalRowSelectionDecoratorProps['ConfigurationComponent'], config: IGlobalRowSelectionConfig): IGlobalRowSelectionDecoratorProps['ConfigurationComponent'] => {
  const GlobalRowSelectionComponent = (): React.JSX.Element => {
    const { selectedRows, setSelectedRows, selectedRowsData } = useRowSelection()
    const { activeArea } = useAreaControl()
    const { assets, documents, objects, setAssets, setAssetsData, setDocuments, setDocumentsData, setObjects, setObjectsData } = useGlobalRowSelection()

    useEffect(() => {
      if (config.rowSelectionMode === 'single') {
        if (activeArea === config.elementType) {
          return
        }

        if (config.elementType === 'asset') {
          setSelectedRows(assets)
        }

        if (config.elementType === 'document') {
          setSelectedRows(documents)
        }

        if (config.elementType === 'data-object') {
          setSelectedRows(objects)
        }
      }
    }, [assets, documents, objects])

    useEffect(() => {
      if (activeArea !== config.elementType) {
        return
      }

      if (config.rowSelectionMode === 'single') {
        if (config.elementType === 'asset') {
          setAssets(selectedRows)
          setAssetsData(selectedRowsData)

          setObjects({})
          setObjectsData({})

          setDocuments({})
          setDocumentsData({})
        }

        if (config.elementType === 'document') {
          setDocuments(selectedRows)
          setDocumentsData(selectedRowsData)

          setObjects({})
          setObjectsData({})

          setAssets({})
          setAssetsData({})
        }

        if (config.elementType === 'data-object') {
          setObjects(selectedRows)
          setObjectsData(selectedRowsData)

          setAssets({})
          setAssetsData({})

          setDocuments({})
          setDocumentsData({})
        }
      }

      if (config.rowSelectionMode === 'multiple') {
        if (config.elementType === 'asset') {
          setAssets(selectedRows)
          setAssetsData(selectedRowsData)
        }

        if (config.elementType === 'document') {
          setDocuments(selectedRows)
          setDocumentsData(selectedRowsData)
        }

        if (config.elementType === 'data-object') {
          setObjects(selectedRows)
          setObjectsData(selectedRowsData)
        }
      }
    }, [selectedRows, selectedRowsData])

    return useMemo(() => <Component />, [])
  }

  return GlobalRowSelectionComponent
}
