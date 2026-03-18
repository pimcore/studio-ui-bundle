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
import { Switch } from '@Pimcore/components/switch/switch'
import type { TransformationComponent } from '../../types/transformation-component-types'

export const ContainTransformationComponent: TransformationComponent = () => {
  return (
    <Flex
      gap="small"
      vertical
    >
      <Form.Item
        label="Width"
        name="width"
      >
        <InputNumber placeholder="Enter width value" />
      </Form.Item>
      <Form.Item
        label="Height"
        name="height"
      >
        <InputNumber placeholder="Enter height value" />
      </Form.Item>
      <Form.Item
        initialValue={ false }
        label="Force Resize"
        name="forceResize"
        valuePropName="checked"
      >
        <Switch />
      </Form.Item>
    </Flex>
  )
}

ContainTransformationComponent.displayName = 'ContainTransformationComponent'
