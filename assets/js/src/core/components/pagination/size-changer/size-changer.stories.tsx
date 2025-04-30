/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type Meta } from '@storybook/react'
import { SizeChanger as SizeChangerComponent } from './size-changer'

// @todo Check if only applicable to Pagination
const config: Meta = {
  title: 'Components/__refactor__/Pagination/Size Changer',
  component: SizeChangerComponent,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default config

export const _default = {
  args: {
    sizeOptions: [10, 20, 40, 80],
    defaultSize: 20,
    handleChange: (size: number) => { console.log(`Page size: ${size}`) },
    label: 'page size'
  }
}
