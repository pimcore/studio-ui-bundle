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
