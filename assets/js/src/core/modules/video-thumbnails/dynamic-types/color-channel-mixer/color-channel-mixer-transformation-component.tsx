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
  { value: '.3:.4:.3:0:.3:.4:.3:0:.3:.4:.3', label: 'Grayscale' },
  { value: '.393:.769:.189:0:.349:.686:.168:0:.272:.534:.131', label: 'Sepia' },
  { value: '.9:0:0:0:0:1.1:0:0:0:0:1:0:0:0:0:1', label: 'Cold' }
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
