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
import { Slider } from '@Pimcore/components/slider/slider'
import type { TransformationComponent } from '../../types/transformation-component-types'

export const BrightnessSaturationTransformationComponent: TransformationComponent = ({
  formBasePath
}) => {
  return (
    <Flex vertical gap="small">
      <Form.Item name={[...formBasePath, 'brightness']} label="Brightness" initialValue={100}>
        <Slider min={0} max={200} />
      </Form.Item>
      <Form.Item name={[...formBasePath, 'saturation']} label="Saturation" initialValue={100}>
        <Slider min={0} max={200} />
      </Form.Item>
      <Form.Item name={[...formBasePath, 'hue']} label="Hue" initialValue={100}>
        <Slider min={0} max={200} />
      </Form.Item>
    </Flex>
  )
}
