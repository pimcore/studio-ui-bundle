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
import { PimcoreDocument as PimcoreDocumentComponent } from './pimcore-document'

const config: Meta = {
  title: 'Components/Data Display/Media/PimcoreDocument',
  component: PimcoreDocumentComponent,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default config

export const _default = {
  args: {
    src: 'http://localhost/Sample Content/Documents/classic-car-2016-3857.pdf'
  }
}
