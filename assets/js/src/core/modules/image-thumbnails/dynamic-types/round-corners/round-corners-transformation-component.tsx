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
    <Flex vertical gap="small">
      <Form.Item name="width" label="Width" initialValue={10}>
        <InputNumber placeholder="Enter corner width radius" />
      </Form.Item>
      <Form.Item name="height" label="Height" initialValue={10}>
        <InputNumber placeholder="Enter corner height radius" />
      </Form.Item>
    </Flex>
  )
}

RoundCornersTransformationComponent.displayName = 'RoundCornersTransformationComponent'