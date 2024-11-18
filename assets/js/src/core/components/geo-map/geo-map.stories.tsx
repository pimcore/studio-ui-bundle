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
import { GeoMap } from './geo-map'

const config: Meta = {
  title: 'Components/Data Entry/Geo Map/GeoMap',
  component: GeoMap,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default config

export const _default = {
  args: {
    onChange: (value: any): void => { console.log('Value:', value) },
    width: '500px',
    height: '250px'
  }
}
