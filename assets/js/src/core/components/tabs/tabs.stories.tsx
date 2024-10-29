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
import { Tabs } from './tabs'
import React, { Fragment } from 'react'

const config: Meta = {
  title: 'Components/Data Display/Tabs',
  component: Tabs,
  tags: ['autodocs']
}

export default config

export const _default = {
  args: {
    items: [
      {
        key: 'tab-1',
        label: 'Tab 1',
        children: <>Tab 1 content</>
      },
      {
        key: 'tab-2',
        label: 'Tab 2',
        children: <>Tab 2 content</>
      },
      {
        key: 'tab-3',
        label: 'Tab 3',
        children: <>Tab 3 content</>
      },
      {
        key: 'tab-4',
        label: 'Tab 4',
        children: <>Tab 4 content</>
      }
    ]
  }
}

export const ActiveKey = {
  args: {
    ..._default.args,
    activeKey: 'tab-3',
    onChange: (key) => { console.log('change tab', key) }
  }
}

export const Closeable = {
  args: {
    ..._default.args,
    onClose: (key) => { console.log('click close button', key) }
  }
}
