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
import { type TransformationComponentProps } from '../../types/transformation-component-types'

const originOptions = [
  { value: 'top-left', label: 'Top Left' },
  { value: 'top-right', label: 'Top Right' },
  { value: 'center', label: 'Center' },
  { value: 'bottom-left', label: 'Bottom Left' },
  { value: 'bottom-right', label: 'Bottom Right' }
]

export const AddOverlayTransformationComponent: React.FC<TransformationComponentProps> = ({
  formBasePath
}) => {
  return (
    <Flex vertical gap="small">
      <Form.Item name={[...formBasePath, 'asset']} label="Overlay Image">
        <ImagePicker
          width={300}
          height={150}
          type="add"
          allowedTypes={['image']}
        />
      </Form.Item>
      <Form.Item name={[...formBasePath, 'x']} label="X Position" initialValue={0}>
        <InputNumber placeholder="Horizontal position in pixels" />
      </Form.Item>
      <Form.Item name={[...formBasePath, 'y']} label="Y Position" initialValue={0}>
        <InputNumber placeholder="Vertical position in pixels" />
      </Form.Item>
      <Form.Item name={[...formBasePath, 'origin']} label="Origin" initialValue="top-left">
        <Select options={originOptions} />
      </Form.Item>
      <Form.Item name={[...formBasePath, 'alpha']} label="Opacity" initialValue={100}>
        <Slider min={0} max={100} />
      </Form.Item>
    </Flex>
  )
}

AddOverlayTransformationComponent.displayName = 'AddOverlayTransformationComponent'