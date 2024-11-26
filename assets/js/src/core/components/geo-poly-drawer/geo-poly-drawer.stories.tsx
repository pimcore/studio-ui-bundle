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
import { GeoPolyDrawer } from './geo-poly-drawer'

const config: Meta = {
  title: 'Components/Data Entry/Geo Map/GeoPolyDrawer',
  component: GeoPolyDrawer,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default config

export const _default = {
  args: {
    onChange: (value) => { console.log('Value:', value) },
    mode: 'geoPolyLine',
    width: '500px'
  }
}
