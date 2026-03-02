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
        initialValue="00:00:00.000"
        label="Start"
        name="start"
      >
        <Input placeholder="00:00:00.000" />
      </Form.Item>
      <Form.Item
        initialValue="00:00:10.000"
        label="Duration"
        name="duration"
      >
        <Input placeholder="00:00:10.000" />
      </Form.Item>
    </Flex>
  )
}

CutVideoTransformationComponent.displayName = 'CutVideoTransformationComponent'
