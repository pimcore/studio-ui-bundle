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
import { serviceIds } from '@Pimcore/app/config/services'
import { type MetadataTypeRegistry } from '@Pimcore/modules/asset/metadata-type-provider/services/metadata-type-registry'
import { Alert } from 'antd'

export const ValueCell = (props: DefaultCellProps): React.JSX.Element => {
  const propertyType = props.row.original.type
  const metadataTypeRegistry = useInjection<MetadataTypeRegistry>(serviceIds['Asset/MetadataTypeProvider/MetadataTypeRegistry'])
  const metadataType = metadataTypeRegistry.getComponentByType(String(propertyType))

  function renderCell (): React.JSX.Element {
    if (metadataType === undefined) {
      return (
        <Alert
          message="cell type not supported"
          type="warning"
        />
      )
    }
    return metadataType.getGridCell(props)
  }

  return (
    <>
      {renderCell()}
    </>
  )
}
