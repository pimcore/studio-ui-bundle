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
import { type VideoTransformationDynamicTypeRegistry } from '../dynamic-types/video-transformation-dynamic-type-registry'
import { Form } from '@Pimcore/components/form/form'

export interface VideoTransformationFieldCollectionItemProps {
  transformationType: string
}

export const VideoTransformationFieldCollectionItem = ({
  transformationType
}: VideoTransformationFieldCollectionItemProps): React.JSX.Element => {
  const transformationDynamicTypeRegistry = container.get<VideoTransformationDynamicTypeRegistry>(serviceIds['DynamicTypes/VideoTransformationDynamicTypeRegistry'])
  const registryItem = transformationDynamicTypeRegistry.getDynamicType(transformationType, false)

  if (registryItem == null) {
    return <div>Unknown transformation type: {transformationType}</div>
  }

  const Component = registryItem.getReactComponent()

  return (
    <Form.Group name="config">
      <Component />
    </Form.Group>
  )
}
