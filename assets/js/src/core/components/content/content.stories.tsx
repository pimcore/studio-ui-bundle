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
import { Content } from './content'

/* eslint-disable react/jsx-key */
const config: Meta = {
  title: 'Components/General/Content',
  component: Content,
  parameters: {
    layout: 'fullscreen'
  },
  tags: ['autodocs']
}

export default config

const demoData = {
  children: 'Content goes here'
}

export const _default = {
  args: {
    ...demoData
  }
}

export const WithPadded = {
  args: {
    ...demoData,
    padded: true
  }
}

export const WithCentered = {
  args: {
    ...demoData,
    centered: true
  }
}

export const WithLoading = {
  args: {
    ...demoData,
    loading: true
  }
}

export const WithNone = {
  args: {
    ...demoData,
    none: true
  }
}
