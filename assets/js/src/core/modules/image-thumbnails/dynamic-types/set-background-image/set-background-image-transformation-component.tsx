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
import { Select } from '@Pimcore/components/select/select'
import { ImagePicker } from '@Pimcore/components/image-picker/image-picker'
import type { TransformationComponent } from '../../types/transformation-component-types'

const modeOptions = [
  { value: '', label: 'fit' },
  { value: 'cropTopLeft', label: 'cropTopLeft' },
  { value: 'asTexture', label: 'asTexture' }
]

export const SetBackgroundImageTransformationComponent: TransformationComponent = () => {
  return (
    <Flex
      gap="small"
      vertical
    >
      <Form.Item
        label="Background Image"
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
        initialValue=""
        label="Mode"
        name="mode"
      >
        <Select options={ modeOptions } />
      </Form.Item>
    </Flex>
  )
}

SetBackgroundImageTransformationComponent.displayName = 'SetBackgroundImageTransformationComponent'
