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
import type { Meta, StoryObj } from '@storybook/react'
import { FieldCollectionToolStrip } from './field-collection-tool-strip'
import { NumberedListProvider } from '@Pimcore/components/form/numbered-list/provider/numbered-list/numbered-list-provider'
import { Box } from '@Pimcore/components/box/box'

const meta: Meta<typeof FieldCollectionToolStrip> = {
  title: 'Components/FieldCollection/FieldCollectionToolStrip',
  component: FieldCollectionToolStrip,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  decorators: [
    (Story, context) => (
      <NumberedListProvider
        onChange={ () => {} }
        operations={ {
          add: () => {},
          remove: () => {},
          update: () => {},
          move: () => {},
          getValue: () => 'SampleType'
        } }
        values={ [{ type: 'SampleType', data: {} }] }
      >
        <Box
          padding="small"
          style={ {
            backgroundColor: 'transparent',
            minWidth: '400px'
          } }
        >
          <Story />
        </Box>
      </NumberedListProvider>
    )
  ]
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    field: 0,
    allowedTypes: ['Type1', 'Type2', 'Type3'],
    disallowAdd: false,
    disallowDelete: false,
    disallowReorder: false,
    theme: 'default'
  }
}

export const Inverse: Story = {
  args: {
    field: 0,
    allowedTypes: ['Type1', 'Type2', 'Type3'],
    disallowAdd: false,
    disallowDelete: false,
    disallowReorder: false,
    theme: 'inverse'
  }
}

export const DefaultWithDisabledActions: Story = {
  args: {
    field: 0,
    allowedTypes: ['Type1', 'Type2', 'Type3'],
    disallowAdd: true,
    disallowDelete: true,
    disallowReorder: true,
    theme: 'default'
  }
}

export const InverseWithDisabledActions: Story = {
  args: {
    field: 0,
    allowedTypes: ['Type1', 'Type2', 'Type3'],
    disallowAdd: true,
    disallowDelete: true,
    disallowReorder: true,
    theme: 'inverse'
  }
}
