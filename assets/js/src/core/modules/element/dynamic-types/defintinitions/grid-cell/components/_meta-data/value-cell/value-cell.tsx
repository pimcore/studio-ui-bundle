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

import { type DefaultCellProps } from '@Pimcore/components/grid/columns/default-cell'
import React from 'react'
import { useInjection } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { Alert } from 'antd'
import { type DynamicTypeMetaDataRegistry } from '../../../../meta-data/dynamic-type-metadata-registry'
import { type DynamicTypeMetadataAbstract } from '../../../../meta-data/dynamic-type-metadata-abstract'

export const ValueCell = (props: DefaultCellProps): React.JSX.Element => {
  const propertyType = props.row.original.type as unknown as string
  const metadataTypeRegistry = useInjection<DynamicTypeMetaDataRegistry>(serviceIds['DynamicTypes/MetadataRegistry'])

  let metadataType: undefined | DynamicTypeMetadataAbstract

  try {
    metadataType = metadataTypeRegistry.getDynamicType(propertyType)
  } catch (error) {
    console.warn(error)
  }

  function renderCell (): React.JSX.Element {
    if (metadataType === undefined) {
      return (
        <Alert
          message="cell type not supported"
          type="warning"
        />
      )
    }
    return metadataType.getGridCellComponent(props)
  }

  return (
    <>
      {renderCell()}
    </>
  )
}
