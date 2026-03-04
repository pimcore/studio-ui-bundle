/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { type TransformationDynamicTypeRegistry } from '../dynamic-types/transformation-dynamic-type-registry'

export interface TransformationFieldCollectionItemProps {
  transformationType: string
}

export const TransformationFieldCollectionItem = ({
  transformationType
}: TransformationFieldCollectionItemProps): React.JSX.Element => {
  const transformationDynamicTypeRegistry = container.get<TransformationDynamicTypeRegistry>(serviceIds['DynamicTypes/TransformationDynamicTypeRegistry'])
  const registryItem = transformationDynamicTypeRegistry.getDynamicType(transformationType, false)

  if (registryItem == null) {
    return <div>Unknown transformation type: {transformationType}</div>
  }

  const Component = registryItem.getReactComponent()

  return <Component />
}
