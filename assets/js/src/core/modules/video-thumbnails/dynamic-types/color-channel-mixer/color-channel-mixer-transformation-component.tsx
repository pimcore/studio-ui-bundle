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
import type { TransformationComponent } from '@Pimcore/modules/image-thumbnails/types/transformation-component-types'

const effectOptions = [
  { value: 'grayscale', label: 'Grayscale' },
  { value: 'sepia', label: 'Sepia' },
  { value: 'cold', label: 'Cold' }
]

export const ColorChannelMixerVideoTransformationComponent: TransformationComponent = () => {
  return (
    <Flex
      gap="small"
      vertical
    >
      <Form.Item
        label="Effect"
        name="effect"
      >
        <Select options={ effectOptions } />
      </Form.Item>
    </Flex>
  )
}

ColorChannelMixerVideoTransformationComponent.displayName = 'ColorChannelMixerVideoTransformationComponent'
