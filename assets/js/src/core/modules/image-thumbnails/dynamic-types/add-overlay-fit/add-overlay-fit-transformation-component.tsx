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

const compositeOptions = [
  { value: 'COMPOSITE_DEFAULT', label: 'COMPOSITE_DEFAULT' },
  { value: 'COMPOSITE_EXCLUSION', label: 'COMPOSITE_EXCLUSION' },
  { value: 'COMPOSITE_HARDLIGHT', label: 'COMPOSITE_HARDLIGHT' }
]

export const AddOverlayFitTransformationComponent: TransformationComponent = () => {
  return (
    <Flex
      gap="small"
      vertical
    >
      <Form.Item
        label="Overlay Image"
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
        initialValue="COMPOSITE_DEFAULT"
        label="Composite"
        name="composite"
      >
        <Select options={ compositeOptions } />
      </Form.Item>
    </Flex>
  )
}

AddOverlayFitTransformationComponent.displayName = 'AddOverlayFitTransformationComponent'
