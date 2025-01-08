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

import React from 'react'
import { type Meta } from '@storybook/react'
import { Empty } from './empty'
import { Icon } from '../icon/icon'
import { Text } from '../text/text'

const config: Meta = {
  title: 'Components/Data Display/Empty',
  component: Empty
}

export default config

export const _default = {}

export const WithCustomImage = {
  args: {
    image: (
      <Icon
        options={ {
          width: 110,
          height: 110
        } }
        value={ 'no-content' }
      />
    )
  }
}

export const WithCustomDescription = {
  args: {
    description: <Text>Customize Description</Text>
  }
}
