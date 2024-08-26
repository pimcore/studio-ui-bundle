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
import { EditorContainer } from './editor-container'

const config: Meta = {
  title: 'Modules/Asset/Editor',
  component: EditorContainer,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default config

export const Folder = {
  args: {
    id: 1
  }
}

export const Image = {
  args: {
    id: 20
  }
}
