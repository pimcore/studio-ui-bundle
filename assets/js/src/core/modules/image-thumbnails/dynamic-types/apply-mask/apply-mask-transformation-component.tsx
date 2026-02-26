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
import { Flex } from '@Pimcore/components/flex/flex'
import { Form } from '@Pimcore/components/form/form'
import { ImagePicker } from '@Pimcore/components/image-picker/image-picker'
import type { TransformationComponent } from '../../types/transformation-component-types'

export const ApplyMaskTransformationComponent: TransformationComponent = () => {
  return (
    <Flex vertical gap="small">
      <Form.Item name="asset" label="Mask Image">
        <ImagePicker
          width={300}
          height={150}
          type="add"
          allowedTypes={['image']}
        />
      </Form.Item>
    </Flex>
  )
}

ApplyMaskTransformationComponent.displayName = 'ApplyMaskTransformationComponent'