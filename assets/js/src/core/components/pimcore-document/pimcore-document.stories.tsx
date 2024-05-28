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
import { PimcoreDocument as PimcoreDocumentComponent } from './pimcore-document'

const config: Meta = {
  title: 'Pimcore studio/UI/PimcoreDocument',
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
