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
import { ContentHeaderContainer } from '@Pimcore/components/content-containers/content-header-container'
import React from 'react'
import { Icon } from '@Pimcore/components/icon/icon'

const config: Meta = {
  title: 'Components/Layout/ContentHeaderContainer',
  component: ContentHeaderContainer,
  tags: ['autodocs']
}

export default config

export const _default = {
  args: {
    icon: <Icon name={ 'corner-left-up' } />,
    text: 'Default Title'
  }
}
