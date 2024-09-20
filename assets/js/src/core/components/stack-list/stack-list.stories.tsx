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
import { StackList } from './stack-list'
import React from 'react'
import { Tag } from '@Pimcore/components/tag/tag'
import { ButtonGroup } from '../button-group/button-group'
import { LanguageSelection } from '@Pimcore/components/language-selection/language-selection'
import { IconButton } from '../icon-button/icon-button'

/* eslint-disable react/jsx-key */
const config: Meta = {
  title: 'Components/Data Display/Listings/StackList',
  component: StackList,
  parameters: {
    layout: 'fullscreen'

  },
  tags: ['autodocs']
}

export default config

export const _default = {
  args: {
    items: [
      {
        id: '1',
        sortable: true,
        children: <Tag text={"Item 1"}/>,
        renderRightToolbar: <ButtonGroup items={ [
          <LanguageSelection
            languages={ ['EN', 'FR'] }
            onSelectLanguage={ () => {} }
            selectedLanguage={ 'EN' }
          />,
          <IconButton icon='trash' />
        ] }
                            />
      },

      {
        id: '2',
        sortable: true,
        children: <Tag text={"Item 2"}/>,
        renderRightToolbar: <ButtonGroup items={ [
          <LanguageSelection
            languages={ ['EN', 'FR'] }
            onSelectLanguage={ () => {} }
            selectedLanguage={ 'EN' }
          />,
          <IconButton icon='trash' />
        ] }
                            />
      },

      {
        id: '3',
        sortable: true,
        children: <Tag text={"Item 3"}/>,
        renderRightToolbar: <ButtonGroup items={ [
          <LanguageSelection
            languages={ ['EN', 'FR'] }
            onSelectLanguage={ () => {} }
            selectedLanguage={ 'EN' }
          />,
          <IconButton icon='trash' />
        ] }
                            />
      }
    ]
  }
}
