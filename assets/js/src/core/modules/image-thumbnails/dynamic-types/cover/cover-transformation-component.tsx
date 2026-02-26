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
import type { TransformationComponentProps } from '../../types/transformation-component-types'

const positioningOptions = [
  { value: 'center', label: 'Center' },
  { value: 'topleft', label: 'Top Left' },
  { value: 'topright', label: 'Top Right' },
  { value: 'bottomleft', label: 'Bottom Left' },
  { value: 'bottomright', label: 'Bottom Right' }
]

export const CoverTransformationComponent: React.FC<TransformationComponentProps> = ({
  formBasePath
}) => {
  return (
    <Flex vertical gap="small">
      <Form.Item name={[...formBasePath, 'width']} label="Width" initialValue={800}>
        <InputNumber placeholder="800" />
      </Form.Item>
      <Form.Item name={[...formBasePath, 'height']} label="Height" initialValue={600}>
        <InputNumber placeholder="600" />
      </Form.Item>
      <Form.Item name={[...formBasePath, 'positioning']} label="Position" initialValue="center">
        <Select options={positioningOptions} />
      </Form.Item>
      <Form.Item name={[...formBasePath, 'forceResize']} label="Force Resize" valuePropName="checked" initialValue={false}>
        <Switch />
      </Form.Item>
      <Form.Item name={[...formBasePath, 'description']} label="Focal Point" initialValue="The positioning determines which part of the image remains visible when cropping.">
        <Input readOnly disabled />
      </Form.Item>
    </Flex>
  )
}

CoverTransformationComponent.displayName = 'CoverTransformationComponent'