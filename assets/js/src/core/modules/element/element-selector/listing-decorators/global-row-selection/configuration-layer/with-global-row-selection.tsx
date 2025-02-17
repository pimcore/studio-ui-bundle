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

export const withGlobalRowSelection = (Component: IGlobalRowSelectionDecoratorProps['ConfigurationComponent'], config: IGlobalRowSelectionConfig): IGlobalRowSelectionDecoratorProps['ConfigurationComponent'] => {
  const GlobalRowSelectionComponent = (): React.JSX.Element => {
    const { selectedRows, selectedRowsData } = useRowSelection()
    const { setAssets, setAssetsData, setDocuments, setDocumentsData, setObjects, setObjectsData } = useGlobalRowSelection()

    useEffect(() => {
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
    }, [selectedRows, selectedRowsData])

    return useMemo(() => <Component />, [])
  }

  return GlobalRowSelectionComponent
}
