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
import { PimcoreImage as PimcoreImageComponent } from './pimcore-image'

const config: Meta = {
  title: 'Components/Data Display/Media/PimcoreImage',
  component: PimcoreImageComponent,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default config

export const _default = {
  args: {
    src: 'https://pimcore.com/brand/Website-Banners/image-thumb__23862__header-sujet-img__2019--slider/2024-Pimcore-Home-Main.webp',
    alt: 'Pimconaut',
    className: ''
  }
}
