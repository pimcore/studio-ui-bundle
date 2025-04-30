/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import type { Meta } from '@storybook/react'
import React from 'react'
import { ElementToolbar } from '@Pimcore/components/element-toolbar/element-toolbar'
import { ElementToolbarSkeleton } from '@Pimcore/components/element-toolbar/element-toolbar.skeleton'
import { type ElementType } from '@Pimcore/types/enums/element/element-type'

const config: Meta = {
  title: 'Components/__Refactor__/Element Toolbar',
  component: ElementToolbar,
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    elementId: { control: 'number' },
    elementType: {
      options: ['asset', 'dataobject', 'document'],
      control: { type: 'select' }
    },
    context: { table: { disable: true } }
  },
  tags: ['autodocs'],
  render: ({ elementId, elementType, loading }: { elementId: number, elementType: string, loading: boolean }) => {
    if (loading) {
      return (
        <ElementToolbarSkeleton />
      )
    }

    if (elementId === undefined || elementType === undefined) {
      return (<p>Please fill elementId and elementType argument</p>)
    }

    return (
      <ElementToolbar
        elementType={ elementType as ElementType }
        id={ elementId }
      />
    )
  }
}

export default config

export const _default = {
  args: {
    loading: true,
    id: 1
  }
}
