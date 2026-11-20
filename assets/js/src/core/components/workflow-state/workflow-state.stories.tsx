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
import { type Meta } from '@storybook/react'
import { WorkflowState } from './workflow-state'
import { Flex } from '@Pimcore/components/flex/flex'

const config: Meta = {
  title: 'Components/Data Display/WorkflowState',
  component: WorkflowState,
  tags: ['autodocs'],
  args: {
    label: 'Review License',
    color: '#f5222d'
  }
}

export default config

export const _default = {}

export const Inverted = {
  args: {
    inverted: true
  }
}

const colors = ['#52c41a', '#fadb14', '#faad14', '#d4380d', '#cf1322', '#434362', '#10007a', '#722ed1', '#c41dc4', '#13c2c2']

export const CustomColors = {
  render: () => (
    <Flex
      gap="small"
      vertical
    >
      {[false, true].map((inverted) => (
        <Flex
          gap="extra-small"
          key={ String(inverted) }
          wrap
        >
          {colors.map((color) => (
            <WorkflowState
              color={ color }
              inverted={ inverted }
              key={ color }
              label="Review License"
            />
          ))}
        </Flex>
      ))}
    </Flex>
  )
}
