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
