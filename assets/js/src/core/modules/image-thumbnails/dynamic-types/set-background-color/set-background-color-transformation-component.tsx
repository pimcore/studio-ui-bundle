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
import { ColorPicker } from '@Pimcore/components/color-picker/color-picker'
import { type TransformationComponentProps } from '../../../types/transformation-component-types'

export const SetBackgroundColorTransformationComponent: React.FC<TransformationComponentProps> = ({
  formBasePath
}) => {
  return (
    <Flex vertical gap="small">
      <Form.Item name={[...formBasePath, 'color']} label="Background Color" initialValue="#ffffff">
        <ColorPicker format="hex" showText />
      </Form.Item>
    </Flex>
  )
}

SetBackgroundColorTransformationComponent.displayName = 'SetBackgroundColorTransformationComponent'