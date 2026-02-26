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
import { type TransformationComponentProps } from '../../../types/transformation-component-types'

export const GaussianBlurTransformationComponent: React.FC<TransformationComponentProps> = ({
  formBasePath
}) => {
  return (
    <Flex vertical gap="small">
      <Form.Item name={[...formBasePath, 'radius']} label="Radius" initialValue={0}>
        <InputNumber placeholder="Enter radius value (0+)" />
      </Form.Item>
      <Form.Item name={[...formBasePath, 'sigma']} label="Sigma" initialValue={1}>
        <InputNumber placeholder="Enter sigma value (1+)" />
      </Form.Item>
    </Flex>
  )
}

GaussianBlurTransformationComponent.displayName = 'GaussianBlurTransformationComponent'