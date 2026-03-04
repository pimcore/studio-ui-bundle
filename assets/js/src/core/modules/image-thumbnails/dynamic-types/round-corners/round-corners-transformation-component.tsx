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

export const RoundCornersTransformationComponent: TransformationComponent = () => {
  return (
    <Flex
      gap="small"
      vertical
    >
      <Form.Item
        initialValue={ 10 }
        label="Width"
        name="width"
      >
        <InputNumber placeholder="Enter corner width radius" />
      </Form.Item>
      <Form.Item
        initialValue={ 10 }
        label="Height"
        name="height"
      >
        <InputNumber placeholder="Enter corner height radius" />
      </Form.Item>
    </Flex>
  )
}

RoundCornersTransformationComponent.displayName = 'RoundCornersTransformationComponent'
