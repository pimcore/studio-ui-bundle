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
import { LanguageSelection } from './language-selection'

const config: Meta = {
  title: 'Components/Data Entry/LanguageSelection',
  component: LanguageSelection,
  parameters: {
    layout: 'fullscreen'

  },
  tags: ['autodocs']
}

export default config

export const _default = {
  args: {
    languages: [
      'EN',
      'DE',
      'FR'
    ],
    selectedLanguage: 'EN',
    onSelectLanguage: (language: string) => {
      console.log('Selected language:', language)
    }
  }
}
