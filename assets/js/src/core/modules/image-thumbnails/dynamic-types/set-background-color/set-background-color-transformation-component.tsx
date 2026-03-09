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
import type { TransformationComponent } from '../../types/transformation-component-types'

export const SetBackgroundColorTransformationComponent: TransformationComponent = () => {
  return (
    <Flex
      gap="small"
      vertical
    >
      <Form.Item
        initialValue="#ffffff"
        label="Background Color"
        name="color"
      >
        <ColorPicker
          format="hex"
          showText
        />
      </Form.Item>
    </Flex>
  )
}

SetBackgroundColorTransformationComponent.displayName = 'SetBackgroundColorTransformationComponent'
