/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import type { DefaultCellProps } from '@Pimcore/components/grid/columns/default-cell'
import React from 'react'
import { IconView } from '@Pimcore/components/grid/columns/views/icon/icon-view'
import { useInjection } from '@Pimcore/app/depency-injection'
import { type DynamicTypeMetadataAbstract, type DynamicTypeMetaDataRegistry } from 'src/sdk/modules/element'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { isUndefined } from 'lodash'

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
