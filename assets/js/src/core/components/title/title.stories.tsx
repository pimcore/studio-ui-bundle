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
import { Title } from './title'
import { Icon } from '@sdk/components'
import React from 'react'

const config: Meta = {
  title: 'Components/General/Typography/Title',
  component: Title,
  tags: ['autodocs']
}

export default config

export const _default = {
  args: {
    children: 'Default Title'
  }
}

export const Secondary = {
  args: {
    children: 'Secondary Title',
    theme: 'secondary'
  }
}

export const WithIcon = {
  args: {
    children: 'Title with Icon',
    theme: 'primary',
    icon: <Icon value={ 'notes-events' }/>
  }
}
