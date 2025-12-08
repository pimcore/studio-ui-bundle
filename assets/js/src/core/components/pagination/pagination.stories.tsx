/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import type { Meta, StoryObj } from '@storybook/react'
import { Pagination } from './pagination'
import { fn } from '@storybook/test'

const meta = {
  title: 'Components/Navigation/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['default', 'small']
    },
    simple: {
      control: 'boolean'
    }
  },
  args: {
    onChange: fn()
  }
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    total: 50,
    current: 1
  }
}

export const WithTotalAndSizeChanger: Story = {
  args: {
    total: 85,
    showTotal: (total) => `Total ${total} items`,
    showSizeChanger: true,
    defaultPageSize: 20,
    pageSizeOptions: ['10', '20', '50', '100']
  }
}

export const Disabled: Story = {
  args: {
    disabled: true,
    total: 50,
    showSizeChanger: true
  }
}

export const WithSizeChanger: Story = {
  args: {
    total: 500,
    showSizeChanger: true,
    defaultPageSize: 20
  }
}

export const WithTotal: Story = {
  args: {
    total: 85,
    showTotal: (total) => `Total ${total} items`,
    defaultPageSize: 20
  }
}

export const CustomPageSizeOptions: Story = {
  args: {
    total: 200,
    showSizeChanger: true,
    pageSizeOptions: ['10', '20', '30', '40']
  }
}
