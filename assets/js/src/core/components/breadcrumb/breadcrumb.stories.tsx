/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import type { Meta } from '@storybook/react'
import { Breadcrumb } from '@Pimcore/components/breadcrumb/breadcrumb'
import { BreadcrumbSkeleton } from '@Pimcore/components/breadcrumb/breadcrumb.skeleton'
import React from 'react'

const config: Meta = {
  title: 'Pimcore studio/UI/Breadcrumbs',
  component: Breadcrumb,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  render: ({ path, loading }: { path: string, loading: boolean }) => {
    if (loading) {
      return <BreadcrumbSkeleton />
    }

    return (
      <Breadcrumb path={ path } />
    )
  }
}

export default config

export const _default = {
  args: {
    path: '/Sample Content/Dev Examples/Properties/properties.jpg',
    loading: false
  }
}
