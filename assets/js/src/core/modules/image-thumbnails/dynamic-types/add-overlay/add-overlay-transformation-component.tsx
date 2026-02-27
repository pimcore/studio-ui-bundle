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
import { Slider } from '@Pimcore/components/slider/slider'
import { ImagePicker } from '@Pimcore/components/image-picker/image-picker'
import type { TransformationComponent } from '../../types/transformation-component-types'

const originOptions = [
  { value: 'top-left', label: 'Top Left' },
  { value: 'top-right', label: 'Top Right' },
  { value: 'center', label: 'Center' },
  { value: 'bottom-left', label: 'Bottom Left' },
  { value: 'bottom-right', label: 'Bottom Right' }
]

export const AddOverlayTransformationComponent: TransformationComponent = () => {
  return (
    <Flex
      gap="small"
      vertical
    >
      <Form.Item
        label="Overlay Image"
        name="asset"
      >
        <ImagePicker
          allowedTypes={ ['image'] }
          height={ 150 }
          type="add"
          width={ 300 }
        />
      </Form.Item>
      <Form.Item
        initialValue={ 0 }
        label="X Position"
        name="x"
      >
        <InputNumber placeholder="Horizontal position in pixels" />
      </Form.Item>
      <Form.Item
        initialValue={ 0 }
        label="Y Position"
        name="y"
      >
        <InputNumber placeholder="Vertical position in pixels" />
      </Form.Item>
      <Form.Item
        initialValue="top-left"
        label="Origin"
        name="origin"
      >
        <Select options={ originOptions } />
      </Form.Item>
      <Form.Item
        initialValue={ 100 }
        label="Opacity"
        name="alpha"
      >
        <Slider
          max={ 100 }
          min={ 0 }
        />
      </Form.Item>
    </Flex>
  )
}

AddOverlayTransformationComponent.displayName = 'AddOverlayTransformationComponent'
