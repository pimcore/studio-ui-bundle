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

export const BrightnessSaturationTransformationComponent: TransformationComponent = () => {
  return (
    <Flex
      gap="small"
      vertical
    >
      <Form.Item
        initialValue={ 100 }
        label="Brightness"
        name="brightness"
      >
        <Slider
          max={ 200 }
          min={ 0 }
        />
      </Form.Item>
      <Form.Item
        initialValue={ 100 }
        label="Saturation"
        name="saturation"
      >
        <Slider
          max={ 200 }
          min={ 0 }
        />
      </Form.Item>
      <Form.Item
        initialValue={ 100 }
        label="Hue"
        name="hue"
      >
        <Slider
          max={ 200 }
          min={ 0 }
        />
      </Form.Item>
    </Flex>
  )
}
