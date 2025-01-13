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

const SwitchComponent = (args: any): React.JSX.Element => {
  const [checked, setChecked] = React.useState(false)

  return (
    <Switch
      { ...args }
      checked={ checked }
      labelRight={ checked ? 'toggle checked' : 'toggle unchecked' }
      onChange={ setChecked }
    />
  )
}

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
    labelLeft: 'Switch'
  }
}

export const TagEnd = {
  args: {
    labelRight: 'Switch'
  }
}

export const TagBoth = {
  args: {
    labelLeft: 'Switch'
  },
  render: SwitchComponent
}
