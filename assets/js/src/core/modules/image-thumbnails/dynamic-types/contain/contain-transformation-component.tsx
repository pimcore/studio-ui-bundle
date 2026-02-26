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
import { type TransformationComponentProps } from '../../types/transformation-component-types'

export const ContainTransformationComponent: React.FC<TransformationComponentProps> = ({
  formBasePath
}) => {
  return (
    <Flex vertical gap="small">
      <Form.Item name={[...formBasePath, 'width']} label="Width">
        <InputNumber placeholder="Enter width value" />
      </Form.Item>
      <Form.Item name={[...formBasePath, 'height']} label="Height">
        <InputNumber placeholder="Enter height value" />
      </Form.Item>
      <Form.Item name={[...formBasePath, 'forceResize']} label="Force Resize" valuePropName="checked" initialValue={false}>
        <Switch />
      </Form.Item>
    </Flex>
  )
}

ContainTransformationComponent.displayName = 'ContainTransformationComponent'