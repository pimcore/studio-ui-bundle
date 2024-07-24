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
import React from 'react'
import { ButtonGroup } from './button-group'
import { LanguageSelection } from '@Pimcore/language-selection/language-selection'
import { Button } from 'antd'

/* eslint-disable react/jsx-key */
const config: Meta = {
  title: 'Pimcore studio/UI/ButtonGroup',
  component: ButtonGroup,
  parameters: {
    layout: 'fullscreen'

  },
  tags: ['autodocs']
}

export default config

export const _default = {
  args: {
    items: [
      <LanguageSelection
        languages={ ['EN', 'FR'] }
        onSelectLanguage={ () => {} }
        selectedLanguage={ 'EN' }
      />,
      <Button type='primary'>Standard Button</Button>
    ]
  }
}
