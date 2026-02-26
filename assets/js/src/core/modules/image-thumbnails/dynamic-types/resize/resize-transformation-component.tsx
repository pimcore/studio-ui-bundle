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
import { Select } from '@Pimcore/components/select/select'
import { Switch } from '@Pimcore/components/switch/switch'
import type { TransformationComponent } from '../../types/transformation-component-types'

const positioningOptions = [
  { value: 'center', label: 'Center' },
  { value: 'topleft', label: 'Top Left' },
  { value: 'topright', label: 'Top Right' },
  { value: 'bottomleft', label: 'Bottom Left' },
  { value: 'bottomright', label: 'Bottom Right' }
]

export const ResizeTransformationComponent: TransformationComponent = () => {
  return (
    <Flex vertical gap="small">
      <Form.Item name="width" label="Width">
        <InputNumber placeholder="Enter width" />
      </Form.Item>
      <Form.Item name="height" label="Height">
        <InputNumber placeholder="Enter height" />
      </Form.Item>
      <Form.Item name="positioning" label="Position" initialValue="center">
        <Select options={positioningOptions} />
      </Form.Item>
      <Form.Item name="forceResize" label="Force Resize" valuePropName="checked" initialValue={false}>
        <Switch />
      </Form.Item>
    </Flex>
  )
}

ResizeTransformationComponent.displayName = 'ResizeTransformationComponent'
