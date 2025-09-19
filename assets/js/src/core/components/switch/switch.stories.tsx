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
  title: 'Components/Data Entry/Switch',
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
