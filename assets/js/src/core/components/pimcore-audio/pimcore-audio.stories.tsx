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
import { PimcoreAudio as PimcoreAudioComponent } from './pimcore-audio'

const config: Meta = {
  title: 'Components/Data Display/Media/PimcoreAudio',
  component: PimcoreAudioComponent,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default config

export const _default = {
  args: {
    sources: [{ src: 'http://localhost/Sample Content/test-audio.mp3' }]
  }
}
