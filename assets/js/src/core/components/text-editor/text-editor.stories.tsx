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
import { TextEditor as TextEditorComponent } from './text-editor'

const config: Meta = {
  title: 'Components/Data Entry/TextEditor',
  component: TextEditorComponent,
  parameters: {
    layout: 'fullscreen'

  },
  tags: ['autodocs']
}

export default config

export const _default = {
  args: {
    defaultText: 'I am a default text',
    lineNumbers: false
  }
}
