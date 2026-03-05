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
import type { TransformationComponent } from '../../types/transformation-component-types'

export const MirrorTransformationComponent: TransformationComponent = () => {
  const modeOptions = [
    { value: 'horizontal', label: 'Horizontal' },
    { value: 'vertical', label: 'Vertical' }
  ]

  return (
    <Flex
      gap="small"
      vertical
    >
      <Form.Item
        initialValue="horizontal"
        label="Mode"
        name="mode"
      >
        <Select options={ modeOptions } />
      </Form.Item>
    </Flex>
  )
}
