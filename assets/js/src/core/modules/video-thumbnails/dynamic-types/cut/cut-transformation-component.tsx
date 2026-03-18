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
import { Input } from '@Pimcore/components/input/input'
import type { TransformationComponent } from '@Pimcore/modules/image-thumbnails/types/transformation-component-types'

export const CutVideoTransformationComponent: TransformationComponent = () => {
  return (
    <Flex
      gap="small"
      vertical
    >
      <Form.Item
        label="Start"
        name="start"
      >
        <Input placeholder="HH:MM:SS.MS" />
      </Form.Item>
      <Form.Item
        label="Duration"
        name="duration"
      >
        <Input placeholder="HH:MM:SS.MS" />
      </Form.Item>
    </Flex>
  )
}

CutVideoTransformationComponent.displayName = 'CutVideoTransformationComponent'
