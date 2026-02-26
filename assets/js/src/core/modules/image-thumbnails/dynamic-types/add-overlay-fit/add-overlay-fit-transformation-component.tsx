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

const originOptions = [
  { value: 'center', label: 'Center' },
  { value: 'top-left', label: 'Top Left' },
  { value: 'top-right', label: 'Top Right' },
  { value: 'bottom-left', label: 'Bottom Left' },
  { value: 'bottom-right', label: 'Bottom Right' }
]

export const AddOverlayFitTransformationComponent: TransformationComponent = () => {
  return (
    <Flex vertical gap="small">
      <Form.Item name="asset" label="Overlay Image">
        <ImagePicker
          width={300}
          height={150}
          type="add"
          allowedTypes={['image']}
        />
      </Form.Item>
      <Form.Item name="origin" label="Origin" initialValue="center">
        <Select options={originOptions} />
      </Form.Item>
    </Flex>
  )
}

AddOverlayFitTransformationComponent.displayName = 'AddOverlayFitTransformationComponent'