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
import { AssetTarget } from './asset-target'

const config: Meta = {
  title: 'Components/Data Display/AssetTarget',
  component: AssetTarget,
  tags: ['autodocs']
}

export default config

export const _default = {
  args: {
    width: 300,
    height: 300,
    title: 'Place an image here',
    dndIcon: true,
    uploadIcon: true
  }
}
