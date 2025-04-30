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
