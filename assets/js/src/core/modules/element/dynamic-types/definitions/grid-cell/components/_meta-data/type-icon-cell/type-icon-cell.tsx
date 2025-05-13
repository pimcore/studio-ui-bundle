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

import type { DefaultCellProps } from '@Pimcore/components/grid/columns/default-cell'
import React from 'react'
import { IconView } from '@Pimcore/components/grid/columns/views/icon/icon-view'
import { useInjection } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { isUndefined } from 'lodash'
import { type DynamicTypeMetaDataRegistry } from '../../../../meta-data/dynamic-type-metadata-registry'
import { type DynamicTypeMetadataAbstract } from '../../../../meta-data/dynamic-type-metadata-abstract'

export const TypeIconCell = (props: DefaultCellProps): React.JSX.Element => {
  const propertyType: string = props.row.original.type

  const metadataTypeRegistry = useInjection<DynamicTypeMetaDataRegistry>(serviceIds['DynamicTypes/MetadataRegistry'])

  let metadataType: undefined | DynamicTypeMetadataAbstract
  try {
    metadataType = metadataTypeRegistry.getDynamicType(propertyType)
  } catch (error) {
  }

  const iconName = metadataType?.iconName
  if (isUndefined(iconName)) {
    return <></>
  }

  return (
    <IconView value={ iconName } />
  )
}
