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
