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

import { type StoryObj, type Meta } from '@storybook/react'
import { ElementTag } from './element-tag'
import { elementTypes } from '@Pimcore/types/enums/element/element-type'

const config: Meta = {
  title: 'Components/Data Display/ElementTag',
  component: ElementTag,
  tags: ['autodocs']
}

export default config

export const _default: StoryObj = {
  args: {
    path: '/path/to/element',
    elementType: elementTypes.dataObject,
    id: 123
  }
}

export const Unpublished = {
  args: {
    path: '/another/path/to/element',
    elementType: elementTypes.asset,
    id: 456,
    published: false
  }
}

export const VeryLongPath = {
  args: {
    path: '/another/path/to/element/another/path/to/element/another/path/to/element/another/path/to/element/another/path/to/element/another/path/to/element/another/path/to/element/another/path/to/element/another/path/to/element',
    elementType: elementTypes.asset,
    id: 456,
    published: false
  }
}
