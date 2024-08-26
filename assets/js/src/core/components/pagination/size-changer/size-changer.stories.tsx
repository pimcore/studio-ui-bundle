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
