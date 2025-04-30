/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { type Meta } from '@storybook/react'
import { VerticalTimeline as VerticalTimelineComponent } from './vertical-timeline'

const config: Meta = {
  title: 'Components/Data Display/VerticalTimeline',
  component: VerticalTimelineComponent,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default config

export const _default = {
  args: {
    timeStamps: [
      <div key={ 1 }>Stamp 1</div>,
      <div key={ 2 }>Stamp 2</div>,
      <div key={ 3 }>Stamp 3</div>
    ]
  }
}
