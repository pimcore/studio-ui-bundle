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
import { HotspotImageContainer } from './hotspot-image-container'

const config: Meta = {
  title: 'Components/Data Display/Hotspot Image',
  component: HotspotImageContainer,
  tags: ['autodocs']
}

export default config

export const _default = {
  args: {
    src: 'https://144170849.fs1.hubspotusercontent-eu1.net/hub/144170849/hubfs/01-English/01-Website/06-Resources/01-Blog/2024/24-10-Platform-Version-Release-24-3/24-10-Platform-Version-Release-2403-Blog-Header-1.png?width=1440&height=810&name=24-10-Platform-Version-Release-2403-Blog-Header-1.png',
    items: [
      {
        id: 1,
        x: 190,
        y: 350,
        width: 24,
        height: 24,
        type: 'marker'
      },
      {
        id: 2,
        x: 647,
        y: 106,
        width: 150,
        height: 150,
        type: 'hotspot'
      }
    ]
  }
}
