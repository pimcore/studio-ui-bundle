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
import { Input } from '@Pimcore/components/input/input'
import type { TransformationComponent } from '../../types/transformation-component-types'

const positioningOptions = [
  { value: 'center', label: 'Center' },
  { value: 'topleft', label: 'Top Left' },
  { value: 'topright', label: 'Top Right' },
  { value: 'bottomleft', label: 'Bottom Left' },
  { value: 'bottomright', label: 'Bottom Right' }
]

export const CoverTransformationComponent: TransformationComponent = () => {
  return (
    <Flex
      gap="small"
      vertical
    >
      <Form.Item
        initialValue={ 800 }
        label="Width"
        name="width"
      >
        <InputNumber placeholder="800" />
      </Form.Item>
      <Form.Item
        initialValue={ 600 }
        label="Height"
        name="height"
      >
        <InputNumber placeholder="600" />
      </Form.Item>
      <Form.Item
        initialValue="center"
        label="Position"
        name="positioning"
      >
        <Select options={ positioningOptions } />
      </Form.Item>
      <Form.Item
        initialValue={ false }
        label="Force Resize"
        name="forceResize"
        valuePropName="checked"
      >
        <Switch />
      </Form.Item>
      <Form.Item
        initialValue="The positioning determines which part of the image remains visible when cropping."
        label="Focal Point"
        name="description"
      >
        <Input
          disabled
          readOnly
        />
      </Form.Item>
    </Flex>
  )
}

CoverTransformationComponent.displayName = 'CoverTransformationComponent'
