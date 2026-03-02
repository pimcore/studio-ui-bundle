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
import { InputNumber } from '@Pimcore/components/input-number/input-number'
import type { TransformationComponent } from '@Pimcore/modules/image-thumbnails/types/transformation-component-types'

export const ResizeVideoTransformationComponent: TransformationComponent = () => {
  return (
    <Flex
      gap="small"
      vertical
    >
      <Form.Item
        initialValue={ 640 }
        label="Width"
        name="width"
      >
        <InputNumber placeholder="640" />
      </Form.Item>
      <Form.Item
        initialValue={ 480 }
        label="Height"
        name="height"
      >
        <InputNumber placeholder="480" />
      </Form.Item>
    </Flex>
  )
}

ResizeVideoTransformationComponent.displayName = 'ResizeVideoTransformationComponent'
