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
import { ImageZoom } from '@Pimcore/components/image-zoom/image-zoom'
import React, { useState } from 'react'

const config: Meta = {
  title: 'Components/Others/Image Zoom',
  component: () => {
    const [zoom, setZoom] = useState<number>(100)

    return (
      <ImageZoom
        setZoom={ setZoom }
        zoom={ zoom }
      />
    )
  },
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default config

export const _default = {
  args: {}
}
