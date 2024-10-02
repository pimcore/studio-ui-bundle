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
import { Switch } from '@Pimcore/components/switch/switch'
import React from 'react'

const config: Meta = {
  title: 'Components/Controls/Switch',
  component: Switch,
  parameters: {
    layout: 'fullscreen'
  },
  tags: ['autodocs']
}
export default config

export const TagStart = {
  args: {
    labelLeft: 'Switch',
  }
}

export const TagEnd = {
  args: {
    labelRight: 'Switch',
  }
}

export const TagBoth = {
  args: {
    labelLeft: 'Switch',
  },
  render: (args) => {
    const [checked, setChecked] = React.useState(false)

    return (
      <Switch { ...args } labelRight={ checked === true ? 'toggle checked' : 'toggle unchecked' } checked={checked} onChange={setChecked} />
    )
  }
}
