/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import type { Meta } from '@storybook/react'
import { FocalPoint } from '@Pimcore/components/focal-point/focal-point'
import React from 'react'

// @todo Component needs refactoring because it contains business logic
const config: Meta = {
  title: 'Components/__Refactor__/Focal Point',
  component: () => {
    return (
      <FocalPoint
        imageSrc="https://picsum.photos/800/600.jpg"
        zoom={ 100 }
      />
    )
  },
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default config

export const _default = {}
