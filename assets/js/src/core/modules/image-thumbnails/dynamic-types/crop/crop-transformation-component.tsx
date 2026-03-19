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
import type { TransformationComponent } from '../../types/transformation-component-types'

export const CropTransformationComponent: TransformationComponent = () => {
  return (
    <Flex
      gap="small"
      vertical
    >
      <Form.Item
        label="Width"
        name="width"
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        label="Height"
        name="height"
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        initialValue={ 0 }
        label="X"
        name="x"
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        initialValue={ 0 }
        label="Y"
        name="y"
      >
        <InputNumber />
      </Form.Item>
    </Flex>
  )
}
